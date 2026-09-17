# Name the Flag

A multilingual flag cheatsheet with 195 flags, color and name sorting, and controls to hide familiar countries while learning.

Website: https://wchen-ai.github.io/name-the-flag/

## Features

- English, Simplified Chinese, Traditional Chinese, Spanish, French, German, Portuguese, Japanese, Korean, and Arabic.
- Localized country names and sorting, including a right-to-left Arabic layout.
- Hide individual flags or a preset of 16 countries; undo the last hide or restore all flags.
- Responsive layouts and bundled flag images.
- Remembers your language when browser storage is available. Hidden flags and sorting reset on reload.

## Run locally

Open `index.html` in a modern browser. No installation or build step is required.

The app and flag images work from the downloaded files without an internet connection. Google Fonts loads when online; system fonts are used otherwise. Country names use the browser's `Intl.DisplayNames` support.

## Publish with GitHub Pages

In the repository's **Settings → Pages**, choose **Deploy from a branch**, select **main** and **/(root)**, then save. The empty `.nojekyll` file tells GitHub Pages to serve the static files directly.

Keep `index.html`, `styles.css`, `app.js`, `data.js`, `locales.js`, and the `flags/` directory together at the repository root. Updates pushed to `main` are then published automatically.

## Credits and scope

Flag images are sourced from [Flagpedia](https://flagpedia.net). The dataset includes 193 UN member states and two observer states. The major-country preset is a learning aid, not an official classification.

Colors are estimated from image area. Ties within 2.5 percentage points follow red, orange, yellow, green, blue, purple, black, and white. Japanese sorting uses character collation rather than phonetic readings.
