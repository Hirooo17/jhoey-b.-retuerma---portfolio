# HJBR — An Interactive Career Universe

Hero Jhoey B. Retuerma’s React, TypeScript and Vite portfolio. Explore a stylized Metro Manila career map, an illustrated project exhibition and a hands-on developer laboratory. The original miniature computer lives in the Lab. Press **?** to open the section picker.

## Local development

With Node.js 22.12+ or a supported newer release, run `npm ci` and `npm run dev`. Vite prints the local URL. The portfolio runs entirely in the browser and uses locally bundled fonts.

## Production and checks

- `npm run lint` runs the TypeScript checker.
- `npm run build` generates the static Vercel-compatible site in `dist/`.
- `npm run preview` serves the production build locally.
- After building, run `npx playwright install chromium` once and then `npm test`. To use an installed Chrome instead, set `PLAYWRIGHT_CHANNEL=chrome`. The suite includes automated accessibility checks using axe-core. Tests capture responsive screenshots in `review/`.

## Editing

Professional experience, projects, repository links, social links and technologies live in `src/data/portfolio.ts`. The credential index is in `src/components/Profile.tsx`. Update the published résumé by replacing `public/Retuerma-Resume.pdf`.

The contact composer prepares a draft in the visitor’s email app. Project covers are illustrations. Credential verification URLs and a working CleanComm demo URL can be added when available.

## Interactive exhibits

- `City.tsx` draws an original isometric city. `Atlas.tsx` handles camera controls, location selection and the symbolic tour. Keyboard users can select stations, use the explicit zoom and overview buttons, or focus the map and pan with arrow keys.
- `FieldGuide.tsx` holds the Withcenter project brief, capstone diagram and development workflow. `Work.tsx` presents five public projects with adjustable illustrated covers.
- `StickerTray.tsx` loads Matter.js on approach. Simulations suspend outside the viewport, and reduced-motion visitors begin with gravity paused. The full technology list also works as a reading view.
- `Lab.tsx` contains a generated line engraving and a fixed-command console. `Passport.tsx` stores optional stamps locally and provides a reset in the footer.

## Content review

Mandaluyong City and Circuit Makati are the two confirmed stops. The city and route are illustrations. Infosys and EARIST are archived separately. The Withcenter brief uses the supplied contract description. Public screenshots, a shareable client project URL, employer-specific metrics and credential verification links can be added if supplied. Current covers are original art. Project repository links are maintained in `src/data/portfolio.ts`.
