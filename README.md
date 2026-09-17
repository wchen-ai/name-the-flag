# Name the Flag

A multilingual flag cheatsheet with 195 flags, color and name sorting, and controls to hide familiar countries while learning.

Website: https://wchen-ai.github.io/name-the-flag/

## Features

- English, Simplified Chinese, Traditional Chinese, Spanish, French, German, Portuguese, Japanese, Korean, and Arabic.
- Localized country names and sorting, including a right-to-left Arabic layout.
- Hide individual flags or a preset of 16 countries; undo the last hide or restore all flags.
- Responsive layouts and bundled flag images.
- Choose 2, 3, or 4 columns, including on mobile.
- Filter by left/right bands, up/down bands, central symbols, diagonals, or crosses. Multiple selections show flags matching any chosen pattern.
- A floating Browse panel with color jumps, column controls, and pattern filters available anywhere on the page.
- Remembers your language and column count when browser storage is available. Hidden flags, patterns, and sorting reset on reload.
- Spectrum-inspired neutral surfaces, blue selection states, native radio groups, labeled toggle buttons, and visible keyboard focus.

## Run locally

Open `index.html` in a modern browser. No installation or build step is required.

The app, system fonts, and flag images work from the downloaded files without an internet connection. Country names use the browser's `Intl.DisplayNames` support.

## Publish with GitHub Pages

In the repository's **Settings → Pages**, choose **Deploy from a branch**, select **main** and **/(root)**, then save. The empty `.nojekyll` file tells GitHub Pages to serve the static files directly.

Keep `index.html`, `styles.css`, `spectrum.css`, `app.js`, `data.js`, `patterns.js`, `locales.js`, and the `flags/` directory together at the repository root. Updates pushed to `main` are then published automatically.

## Development checks

The website needs no build step or runtime packages. For the optional interaction regression tests, use a current Node.js 22 release or newer, run `npm ci`, then `npm test`.

Tests cover column persistence, filter combinations, hiding/undo, empty states, translations, and the floating menu's click, blur, dismissal, and scroll-target behavior. They use a simulated DOM; rendered layout and physical scrolling still need a real browser check.

## Credits and scope

Flag images are sourced from [Flagpedia](https://flagpedia.net). The dataset includes 193 UN member states and two observer states. The major-country preset is a learning aid, not an official classification.

Colors are estimated from image area. Ties within 2.5 percentage points follow red, orange, yellow, green, blue, purple, black, and white. Japanese sorting uses character collation rather than phonetic readings.

Pattern tags are curated against the bundled images and may overlap. Crosses and diagonals include prominent cantons, but exclude tiny details in coats of arms. Symbols around the middle of the main field count as central symbols. These tags are visual learning aids, not an official taxonomy; some flags appear only under All patterns.

The visual and interaction guidance comes from [Adobe React Spectrum](https://react-spectrum.adobe.com/ToggleButtonGroup). This static website uses native HTML controls and custom CSS, not the React Spectrum component package.
