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

The contact composer prepares a draft in the visitor’s email app. Credential verification URLs and a working CleanComm demo URL can be added when available.

## Interactive exhibits

- `City.tsx` draws an original isometric city. `Atlas.tsx` handles camera controls, location selection and the symbolic tour. Keyboard users can select stations, use the explicit zoom and overview buttons, or focus the map and pan with arrow keys.
- `Arrival.tsx` opens the atlas with a field pass that starts the two-stop tour. The sticky header includes a continuous reading indicator, chapter chooser and adjacent-stop controls.
- `Work.tsx` and `ExhibitStage.tsx` present five public projects and the Withcenter commission. `StudyRoom.tsx` renders the matching technical notebooks from `src/data/exhibition.ts`. Notebook links preserve the selected project on reload and can be shared.
- `FieldGuide.tsx` contains the commission brief and the development workflow.
- `StickerTray.tsx` loads Matter.js on approach. Simulations suspend outside the viewport, and reduced-motion visitors begin with gravity paused. The full technology list also works as a reading view.
- `Lab.tsx` contains a generated line engraving and a fixed-command console. `Passport.tsx` stores optional stamps locally and provides a reset in the footer.

## Content review

Mandaluyong City and Circuit Makati are the two confirmed stops. The city and route are illustrations. Infosys and EARIST are archived separately. The Withcenter brief uses the supplied contract description. The Withcenter exhibit describes team scope. Client assets, architecture, test procedures and project outcomes require owner-approved material.

| Exhibit                   | Evidence and owner-review notes                                                                                                                                                                                                                                                                                             |
| ------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Synthetic Voice Detection | The résumé reports 90% on the training and test datasets. Dataset size, split methodology and per-class results would add context. The gallery waveform is generated locally.                                                                                                                                               |
| CleanComm / Clean.com     | Project scope comes from the résumé and repository. The listed public demo returned 404. A replacement URL and actual test results would support a fuller release account.                                                                                                                                                  |
| GoParent                  | The account-creation and login images in `public/exhibits/` are captures of the [public Flutter app](https://goparent-e474c.web.app). The app mark comes from [the original repository](https://github.com/Hirooo17/app-go-parent/tree/main/assets/images). Proposed checks are labeled separately from historical results. |
| Dental Management System  | The booking, patient and history graphics come from [the desktop project's resources](https://github.com/Hirooo17/DentalManageMentSystemPLSPLSPLS/tree/HEAD/Resources). The appointment walkthrough follows its public source. Exact personal ownership, executed tests and clinic deployment outcomes need confirmation.   |
| Personal Portfolio        | The two JPEG previews are genuine 1440px and 375px browser captures of this edition. The browser suite exercises its UI and résumé download.                                                                                                                                                                                |
| Withcenter                | Public material covers a one-month hybrid contract, Flutter collaboration, QA and backend security contributions. Any additional technical account requires approved wording.                                                                                                                                               |

Engineering takeaways are observations grounded in the implementation. First-person retrospective lessons and measured outcomes can be added when confirmed.
