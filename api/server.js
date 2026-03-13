require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fs = require('fs/promises');
const fsSync = require('fs');
const path = require('path');
const crypto = require('crypto');
const admin = require('firebase-admin');

const PORT = Number(process.env.PORT || 4000);
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || process.env.ALLOWED_ORIGIN || '')
  .split(',')
  .map((value) => value.trim())
  .filter(Boolean);
const DATA_FILE = path.join(__dirname, 'data', 'posts.json');

const app = express();

app.use(express.json({ limit: '1mb' }));
app.use(
  cors({
    origin(origin, callback) {
      if (!origin) return callback(null, true);
      if (ALLOWED_ORIGINS.length === 0) return callback(null, true);
      if (ALLOWED_ORIGINS.includes(origin)) return callback(null, true);
      return callback(new Error('CORS blocked'));
    },
    credentials: false,
  })
);

async function readPosts() {
  const raw = await fs.readFile(DATA_FILE, 'utf8');
  const parsed = JSON.parse(raw);
  return Array.isArray(parsed) ? parsed : [];
}

async function writePosts(posts) {
  await fs.writeFile(DATA_FILE, JSON.stringify(posts, null, 2) + '\n', 'utf8');
}

function validatePost(payload) {
  const required = ['title', 'excerpt', 'content', 'author', 'date'];
  const fieldErrors = {};

  for (const field of required) {
    if (!String(payload?.[field] || '').trim()) {
      fieldErrors[field] = `${field} is required`;
    }
  }

  if (payload?.status && !['draft', 'published'].includes(payload.status)) {
    fieldErrors.status = 'status must be "draft" or "published"';
  }

  return fieldErrors;
}

let firebaseReady = false;

function initFirebase() {
  if (firebaseReady) return;

  const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
  const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH;

  if (serviceAccountJson) {
    admin.initializeApp({
      credential: admin.credential.cert(JSON.parse(serviceAccountJson)),
    });
  } else if (serviceAccountPath) {
    const raw = fsSync.readFileSync(serviceAccountPath, 'utf8');
    admin.initializeApp({
      credential: admin.credential.cert(JSON.parse(raw)),
    });
  } else {
    admin.initializeApp();
  }

  firebaseReady = true;
}

async function verifyAuthHeader(authHeader) {
  if (!authHeader) return null;
  const match = authHeader.match(/^Bearer\s+(.+)$/);
  if (!match) return null;

  initFirebase();
  return admin.auth().verifyIdToken(match[1]);
}

async function requireAuth(req, res, next) {
  try {
    const decoded = await verifyAuthHeader(req.headers.authorization || '');
    if (!decoded) {
      return res.status(401).json({ message: 'Missing auth token', code: 'AUTH_REQUIRED' });
    }
    req.user = decoded;
    return next();
  } catch (error) {
    console.error('Auth verification failed', error);
    return res.status(401).json({
      message: 'Invalid auth token',
      code: 'AUTH_INVALID',
      detail: error?.message || 'Token verification failed',
    });
  }
}

app.get('/health', (_req, res) => {
  res.json({ ok: true });
});

app.get('/posts', async (_req, res, next) => {
  try {
    const posts = await readPosts();
    let visiblePosts = posts;

    const authHeader = _req.headers.authorization || '';
    if (authHeader) {
      try {
        await verifyAuthHeader(authHeader);
      } catch (error) {
        console.error('Auth verification failed', error);
        return res.status(401).json({
          message: 'Invalid auth token',
          code: 'AUTH_INVALID',
          detail: error?.message || 'Token verification failed',
        });
      }
    } else {
      visiblePosts = posts.filter((post) => (post.status || 'published') === 'published');
    }

    res.json(visiblePosts);
  } catch (error) {
    next(error);
  }
});

app.get('/posts/:id', async (req, res, next) => {
  try {
    const posts = await readPosts();
    const id = Number(req.params.id);
    const post = posts.find((item) => Number(item.id) === id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found', code: 'NOT_FOUND' });
    }

    const authHeader = req.headers.authorization || '';
    if (!authHeader && (post.status || 'published') !== 'published') {
      return res.status(404).json({ message: 'Post not found', code: 'NOT_FOUND' });
    }
    if (authHeader) {
      try {
        await verifyAuthHeader(authHeader);
      } catch (error) {
        console.error('Auth verification failed', error);
        return res.status(401).json({
          message: 'Invalid auth token',
          code: 'AUTH_INVALID',
          detail: error?.message || 'Token verification failed',
        });
      }
    }

    return res.json(post);
  } catch (error) {
    return next(error);
  }
});

app.post('/posts', requireAuth, async (req, res, next) => {
  try {
    const fieldErrors = validatePost(req.body);
    if (Object.keys(fieldErrors).length > 0) {
      return res.status(422).json({
        message: 'Validation failed',
        code: 'VALIDATION_ERROR',
        fieldErrors,
      });
    }

    const posts = await readPosts();
    const id = Date.now();
    const now = new Date().toISOString();

    const newPost = {
      id,
      title: req.body.title,
      excerpt: req.body.excerpt,
      content: req.body.content,
      author: req.body.author,
      date: req.body.date,
      status: req.body.status || 'published',
      updatedAt: now,
    };

    posts.unshift(newPost);
    await writePosts(posts);
    return res.status(201).json(newPost);
  } catch (error) {
    return next(error);
  }
});

app.put('/posts/:id', requireAuth, async (req, res, next) => {
  try {
    const fieldErrors = validatePost(req.body);
    if (Object.keys(fieldErrors).length > 0) {
      return res.status(422).json({
        message: 'Validation failed',
        code: 'VALIDATION_ERROR',
        fieldErrors,
      });
    }

    const posts = await readPosts();
    const id = Number(req.params.id);
    const index = posts.findIndex((item) => Number(item.id) === id);

    if (index === -1) {
      return res.status(404).json({ message: 'Post not found', code: 'NOT_FOUND' });
    }

    const updated = {
      ...posts[index],
      ...req.body,
      id,
      status: req.body.status || posts[index].status || 'published',
      updatedAt: new Date().toISOString(),
    };

    posts[index] = updated;
    await writePosts(posts);
    return res.json(updated);
  } catch (error) {
    return next(error);
  }
});

app.delete('/posts/:id', requireAuth, async (req, res, next) => {
  try {
    const posts = await readPosts();
    const id = Number(req.params.id);
    const nextPosts = posts.filter((item) => Number(item.id) !== id);

    if (nextPosts.length === posts.length) {
      return res.status(404).json({ message: 'Post not found', code: 'NOT_FOUND' });
    }

    await writePosts(nextPosts);
    return res.status(204).send();
  } catch (error) {
    return next(error);
  }
});

app.use((error, _req, res, _next) => {
  console.error(error);
  res.status(500).json({ message: 'Internal server error', code: 'INTERNAL_ERROR' });
});

app.listen(PORT, () => {
  console.log(`Local API running on http://localhost:${PORT}`);
});
