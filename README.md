# Emryz Digital

Portfolio website for Emryz Digital, covering three services: web design and
redesign on Wix and Squarespace, POS solutions on Toast and Square, and
author growth and book promotion.

Built with Next.js (App Router), TypeScript, and Tailwind CSS. The logo
files in `public/brand` are the agency's own artwork and are referenced
directly across the site; the color palette in `src/app/globals.css` was
sampled from those files.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Project structure

- `src/app` : pages, one folder per route (`about`, `contact`, `services/*`)
- `src/components` : shared UI, including the header, footer, and service
  page building blocks
- `public/brand` : the Emryz Digital logo lockup and icon mark

## Build

```bash
npm run build
npm run lint
```
