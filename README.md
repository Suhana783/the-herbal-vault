# the-herbal-vault

The Herbal Vault

A small single-page React app for browsing, viewing, and adding short herbal posts. The app uses local JSON seed data so you can run it without
a backend — useful for demos and quick prototypes.

Features
- Browse herb posts with images and short descriptions
- View detailed information for each herb
- Add new herb posts using a modal form
- Seed data stored in `public/herbPosts.json` (no external database required)

Getting started
Prerequisites: Node.js (18+) and npm installed.

Install dependencies and run the dev server:

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
npm run preview
```

How it works
- The UI is built with React and Vite for fast hot-reload during development.
- Sample posts are loaded from `public/herbPosts.json`; adding a post updates in-memory state only.
- Components live under `src/components/` and the simple local API helper is in `src/api/Post.js`.

Project structure
- public/: static assets and `herbPosts.json` seed data
- src/: application source
	- src/components/: UI components like the post card, detail view, and add modal
	- src/api/Post.js: simple helper for reading seed data

Notes
- This project is intended as a lightweight demo. If you want persistent storage, connect the app to a backend or use browser storage.

Built with Vite and React.

