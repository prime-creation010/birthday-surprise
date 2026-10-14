# Prime Creations — Birthday Experience

A multi-screen, mobile-friendly birthday website made with vanilla HTML, CSS and JavaScript.

## Open it
1. Extract the ZIP.
2. Open `index.html` in Chrome, Edge, or Firefox.
3. Click **OPEN YOUR SURPRISE**. All screens are part of one page; the buttons switch between them.

If your browser blocks anything when opened directly from a file, use VS Code's Live Server extension or another local static server.

## Personalise it
Open `content.js`. Change:
- `recipientName` to her name.
- `birthdayDate` in `YYYY-MM-DD` format.
- `contactEmail` if needed.
- `photoPaths` if your images have different names.
- `featuredPhotoIndex` to `0`–`4`.
- `logoPath` to the location of your actual Prime Creations logo PNG.
- `musicPath` to an optional local audio file.

## Add your five photos
Place your own images in `assets/images/` and name them:
- `photo-1.jpg` — featured photo (largest)
- `photo-2.jpg`
- `photo-3.jpg`
- `photo-4.jpg`
- `photo-5.jpg`

JPG, PNG, or WebP are fine if you update the paths in `content.js`. Missing files show tasteful placeholders instead of broken-image icons. Use photos you have permission to share, especially if the site will be public.

## Add your logo
Put your logo PNG at `assets/images/prime-creations-logo.png`. The final page will use it automatically. Until then, a designed text monogram is shown.

## Optional background music
Music is off by default and never autoplays. If you want it, add a file at `assets/audio/your-song.mp3`. Use audio you have permission to publish.

## Publish with GitHub Pages
1. Create a repository and upload the extracted project files (keep the folder structure).
2. In repository **Settings → Pages**, choose the branch and root folder.
3. Save and wait for GitHub Pages to publish.
4. Test the live URL on both phone and desktop before sharing.

Use relative paths as provided. Do not add a fake portfolio link; set `portfolioUrl` only when you have a real public URL.

## Project structure
```text
prime-creations-birthday/
├── index.html
├── content.js
├── README.md
├── .gitignore
├── css/
│   ├── style.css
│   └── animations.css
├── js/
│   └── main.js
└── assets/
    ├── images/
    │   ├── favicon.svg
    │   └── (add your five photos and Prime Creations logo)
    └── audio/
        └── (optional your-song.mp3)
```

## Notes
- The opening button and every chapter button are wired in `js/main.js`.
- The date label will not falsely claim it is the recipient's birthday unless the configured date matches the local date.
- The experience uses no external JavaScript libraries.
- Google Fonts are optional; if unavailable, local serif/sans-serif fallbacks are used.
