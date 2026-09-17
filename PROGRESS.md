# Project progress

Updated: 2026-09-17

## Current status

The website is published. This log records the completed features and current layout changes.

- Website: https://wchen-ai.github.io/name-the-flag/
- Repository: https://github.com/wchen-ai/name-the-flag
- Hosting: GitHub Pages, `main` branch, repository root.
- Latest layout update: compact spacing and collapsed Display options, following `d314536` (multi-select colors and larger country names).
- Architecture: static HTML, CSS, and JavaScript. No backend, database, build step, or production package dependencies.

## Completed milestones

1. **Initial review and publication** — `387e74f`
   - Validated JavaScript syntax, 195 bundled flag images, image dimensions, and translation consistency across 10 languages.
   - Added repository documentation, `.gitignore`, and `.nojekyll`.
   - Uploaded the site and enabled GitHub Pages.
   - Verified the published page and all 199 supporting scripts, styles, and flag images against the local files.

2. **Floating color navigation** — `c952e53`
   - Added a floating color picker to reach color groups without returning to the top.
   - Added translated labels, keyboard support, Escape dismissal, and outside-pointer dismissal.
   - Color navigation was subsequently replaced by multi-select filtering; this milestone describes the earlier behavior.

3. **Layouts, patterns, and Spectrum-inspired design** — `557ae3e`
   - Added 2-, 3-, and 4-column layouts, with the chosen column count remembered locally.
   - Added multi-select patterns: left/right bands, up/down bands, central symbols, diagonals, and crosses.
   - Curated overlapping pattern tags against the bundled flag images.
   - Applied Adobe React Spectrum design guidance through neutral surfaces, blue selected states, labeled controls, and visible keyboard focus.
   - Retained native HTML controls and custom CSS; the React Spectrum package is not installed.
   - Expanded the floating control into a Browse panel containing colors, columns, and patterns.
   - Removed blur-triggered dismissal that could close the menu before a touch/Safari click arrived.
   - Added interaction regression tests and removed the external font dependency.

4. **Multi-select colors and larger country names** — `d314536`
   - Replaced color jumps with toggleable dominant-color filters at the top and in the floating Browse panel.
   - Kept the floating panel open for repeated selections and preserved the current sort mode.
   - Added All colors, synchronized selected states between both panels, and translated the new labels and help into all 10 languages.
   - Increased country-name text to 18px on desktop, 16px on mobile, and 15px/14px in mobile 3-/4-column layouts. Secondary names use 14px.

5. **More room for flags**
   - Reduced header, intro, toolbar, section, and card spacing; widened the usable content area.
   - Collapsed the main filter controls into a native, keyboard-accessible Display options disclosure. The floating Browse panel retains every filter and column option.
   - Reduced card padding while retaining larger country-name typography and comparable space for the flag images.
   - Kept all 2-/3-/4-column choices, multi-select filters, translations, and hiding controls.

## Current interaction rules

- Multiple colors match **any selected dominant-color group**, not every color present in a flag.
- Multiple patterns match **any selected pattern**.
- When both filter types are active, a flag must match a selected color **and** a selected pattern.
- Clicking a selected option deselects it. No selection means no restriction for that filter type.
- All colors clears only color selections; All patterns clears only pattern selections.
- Restore all clears color and pattern filters, individually hidden flags, and the major-country preset.
- Hidden flags and the major-country preset continue to apply while filtering. Undo restores the last individually hidden flag.
- Language and column count persist when browser storage is available. Filters, sorting, and hidden flags reset on reload.
- Colors remain selectable when results are empty so users can recover without reopening the panel.

## Validation and remaining checks

- All **11 interaction tests passed** for the latest feature update.
- JavaScript syntax and Git whitespace checks passed.
- The deployed HTML, application script, translations, and Spectrum stylesheet matched the reviewed local files.
- Tests use a simulated DOM. Real-browser visual checks, physical scrolling, and touch behavior have not been independently verified in this session.
- Recommended next verification: mobile Safari/Chrome, all three column layouts, long translated names, and Arabic right-to-left layout.
- Pattern tags are visual learning aids rather than an official classification. Some flags match none of the five pattern categories.

## Maintenance

- `app.js`: filtering, rendering, menus, layout selection, hiding, and undo.
- `data.js` / `flags/`: country data, dominant colors, palettes, and flag images.
- `patterns.js`: overlapping visual-pattern tags.
- `locales.js`: interface translations.
- `styles.css` / `spectrum.css`: base styling and Spectrum-inspired presentation.
- `tests/app.test.cjs`: interaction regression tests.
- Open `index.html` to run the site. For development checks, run `npm ci` then `npm test` with a current Node.js 22 release or newer.
- Updates to `main` publish automatically through GitHub Pages. Verify changed live assets after deployment.
