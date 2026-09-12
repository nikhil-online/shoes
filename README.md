# NIKE Landing Page

A single-page Nike landing site (shoes + clothing) built with plain HTML, CSS and JavaScript.
No build step — open `index.html` or serve the folder.

## Structure

```
.
├── index.html          # markup only (~300 lines)
├── css/
│   └── style.css       # all styles, extracted from the old inline <style>
├── js/
│   └── main.js         # all interactions, extracted from the old inline <script>
└── assets/
    ├── images/         # product shots (.png / .jpg / .webp)
    └── video/          # hero background clips (.mp4)
```

## Notes

- Asset paths in `index.html` are relative (`assets/images/...`), so the site works from any sub-path — including GitHub Pages.
- `assets/images/full-zip.webp` was renamed from `full zip.webp` (spaces in filenames break URLs).
- Hero video, product grid and loader artwork are all local; the only remote references are Google Fonts and one Nike CDN image used as a CSS `background-image` in `css/style.css`.

## Local preview

```bash
python -m http.server 8000
# then open http://localhost:8000
```
