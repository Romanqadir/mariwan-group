# Mariwan Group — Website

Modern website for **Mariwan Group** (wedding photography, cinematic films, decor & DJ).

Built with **React + Vite + Tailwind CSS + Motion**. Hosted free on **GitHub Pages**.

## Edit content
Almost everything (phone numbers, social links, packages, services text) is in
[`src/data/site.js`](src/data/site.js).

Media lives in `public/media/` (already compressed for the web).

## Run on your computer
```bash
npm install
npm run dev
```

## Publish
Every push to the `main` branch automatically rebuilds and publishes the site
(see `.github/workflows/deploy.yml`).
