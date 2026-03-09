
# Liminality — React Blog

**[View the Live Website](https://lucalangella.github.io/react-blog/)**


## Quick Start

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:3000)
npm start

# Build for production
npm run build

# Serve the production build locally
npx serve -s build
A modern, responsive static blog built with **React 18**, **React Router v6**, and **Tailwind CSS**.

Admin has been split into a separate repository/app and is no longer exposed in this public site.

## Quick Start

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:3000)
npm start

# Build for production
npm run build

# Serve the production build locally
npx serve -s build
```

## Project Structure

```
src/
├── components/
│   ├── Header.js          # Sticky nav with scroll blur effect
│   ├── Footer.js          # Site footer with branding
│   ├── PostPreview.js     # Blog post card for the grid
│   └── ErrorBoundary.js   # Catches render errors gracefully
├── data/
│   └── posts.js           # Mock blog post data (6 articles)
├── pages/
│   ├── Home.js            # Landing page with post grid
│   ├── PostDetail.js      # Full article view with nav
│   └── NotFound.js        # 404 page
├── App.js                 # Root component with routing
├── index.js               # Entry point
└── index.css              # Tailwind directives + custom styles
```

## Features

- Responsive 2-column post grid (stacks on mobile)
- Reading time estimates on every post
- Sticky header with backdrop blur on scroll
- Smooth hover animations on cards
- Previous/Next post navigation
- Error boundary for graceful failure handling
- SEO-friendly dynamic page titles
- Monochrome black/white visual theme

## Tech Stack

| Tool              | Purpose             |
|-------------------|---------------------|
| React 18          | UI framework        |
| React Router v6   | Client-side routing |
| Tailwind CSS 3    | Utility-first CSS   |
| Create React App  | Build tooling       |
