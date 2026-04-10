# Mohammed Amin — Portfolio Starter

A lightweight React + Vite starter tailored for a portfolio with three tabs: About, Projects, and Films. It features smooth page transitions (Framer Motion), a theme toggle, animated background spotlight, and simple content data files you can edit.

## Quick start

1. Install deps

```bash
npm install
```

2. Run dev server

```bash
npm run dev
```

3. Build for production

```bash
npm run build && npm run preview
```

## Where to edit content

- About page: `src/pages/About.tsx` (prefilled with your bio)
- Projects: `src/data/projects.ts` — add/edit items; drop images in `public/media/`
- Films: `src/data/films.ts` — put `videoUrl` (YouTube or Vimeo). Thumbnails in `public/media/`

## Customize visuals

- Global styles + theme tokens: `src/styles/global.css`
- Navigation: `src/components/Nav.tsx`
- Page transitions: `src/App.tsx` (`motion.main` and `AnimatePresence`)

## Notes

- This uses CSS (no Tailwind) for simplicity; you can add Tailwind later if desired.
- The theme toggle stores preference in `localStorage`.
- The animated spotlight follows the cursor via CSS variables.
