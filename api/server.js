require('dotenv').config();
const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
const functions = require('firebase-functions');

const PORT = Number(process.env.PORT || 4000);
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || process.env.ALLOWED_ORIGIN || '')
  .split(',')
  .map((value) => value.trim())
  .filter(Boolean);

const app = express();

// Initialize Firebase Admin
if (admin.apps.length === 0) {
  const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
  if (serviceAccountJson) {
    admin.initializeApp({
      credential: admin.credential.cert(JSON.parse(serviceAccountJson)),
    });
  } else {
    // This works automatically when deployed to Firebase Functions
    admin.initializeApp();
  }
}

const db = admin.firestore();

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

async function verifyAuthHeader(authHeader) {
  if (!authHeader) return null;
  const match = authHeader.match(/^Bearer\s+(.+)$/);
  if (!match) return null;

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

app.get('/posts', async (req, res, next) => {
  try {
    let query = db.collection('posts').orderBy('date', 'desc');

    const authHeader = req.headers.authorization || '';
    let isAuthenticated = false;
    if (authHeader) {
      try {
        await verifyAuthHeader(authHeader);
        isAuthenticated = true;
      } catch (error) {
        console.error('Auth verification failed (silent)', error);
      }
    }

    if (!isAuthenticated) {
      query = query.where('status', '==', 'published');
    }

    const snapshot = await query.get();
    const posts = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    res.json(posts);
  } catch (error) {
    next(error);
  }
});

app.get('/posts/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const doc = await db.collection('posts').doc(id).get();

    if (!doc.exists) {
      return res.status(404).json({ message: 'Post not found', code: 'NOT_FOUND' });
    }

    const post = { id: doc.id, ...doc.data() };

    const authHeader = req.headers.authorization || '';
    if (!authHeader && (post.status || 'published') !== 'published') {
      return res.status(404).json({ message: 'Post not found', code: 'NOT_FOUND' });
    }

    if (authHeader) {
      try {
        await verifyAuthHeader(authHeader);
      } catch (error) {
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

    const now = new Date().toISOString();
    const newPost = {
      title: req.body.title,
      excerpt: req.body.excerpt,
      content: req.body.content,
      author: req.body.author,
      date: req.body.date,
      status: req.body.status || 'published',
      createdAt: now,
      updatedAt: now,
    };

    const docRef = await db.collection('posts').add(newPost);
    return res.status(201).json({ id: docRef.id, ...newPost });
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

    const id = req.params.id;
    const docRef = db.collection('posts').doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      return res.status(404).json({ message: 'Post not found', code: 'NOT_FOUND' });
    }

    const updated = {
      ...req.body,
      updatedAt: new Date().toISOString(),
    };

    await docRef.update(updated);
    return res.json({ id, ...doc.data(), ...updated });
  } catch (error) {
    return next(error);
  }
});

app.delete('/posts/:id', requireAuth, async (req, res, next) => {
  try {
    const id = req.params.id;
    const docRef = db.collection('posts').doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      return res.status(404).json({ message: 'Post not found', code: 'NOT_FOUND' });
    }

    await docRef.delete();
    return res.status(204).send();
  } catch (error) {
    return next(error);
  }
});

app.use((error, _req, res, _next) => {
  console.error(error);
  res.status(500).json({ message: 'Internal server error', code: 'INTERNAL_ERROR' });
});

// For local development
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Local API running on http://localhost:${PORT}`);
  });
}

// Export for Firebase Functions
exports.api = functions.https.onRequest(app);
