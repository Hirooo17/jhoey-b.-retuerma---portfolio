# The Playful Engineer

Hero Jhoey B. Retuerma’s React, TypeScript and Vite portfolio. The illustrated desktop computer switches between Build, Test and Support. Press **?** to open the section picker.

## Local development

With Node.js 22.12+ or a supported newer release, run `npm ci` and `npm run dev`. Vite prints the local URL. The portfolio runs entirely in the browser and uses locally bundled fonts.

## Production and checks

- `npm run lint` runs the TypeScript checker.
- `npm run build` generates the static Vercel-compatible site in `dist/`.
- `npm run preview` serves the production build locally.
- After building, run `npx playwright install chromium` once and then `npm test`. To use an installed Chrome instead, set `PLAYWRIGHT_CHANNEL=chrome`. Tests capture responsive screenshots in `review/`.

## Editing

Professional experience, projects, repository links, social links and technologies live in `src/data/portfolio.ts`. The credential index is in `src/components/Profile.tsx`. Update the published résumé by replacing `public/Retuerma-Resume.pdf`.

The contact composer prepares a draft in the visitor’s email app. Project covers are illustrations. Credential verification URLs and a working CleanComm demo URL can be added when available.
