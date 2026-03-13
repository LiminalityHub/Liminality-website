# Local API (Minimal)

Minimal Express API for local development.

## Endpoints

- `GET /posts`
- `GET /posts/:id`
- `POST /posts` (auth required)
- `PUT /posts/:id` (auth required)
- `DELETE /posts/:id` (auth required)
- `GET /health`

## Setup

```bash
cd api
npm install
cp .env.example .env
npm start
```

## Auth

Write endpoints require a Firebase ID token in the `Authorization` header:

```
Authorization: Bearer <idToken>
```

Configure Firebase Admin SDK via `.env` using one of:

- `FIREBASE_SERVICE_ACCOUNT_JSON`
- `FIREBASE_SERVICE_ACCOUNT_PATH`
