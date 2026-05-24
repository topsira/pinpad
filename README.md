# pinpad

A small personal sticky-note board for a repo site.

Pinpad is a playful, private-first notepad that runs as a static web page. It lets you drop notes onto a board, move them around, color-code them, search them, and save everything in the browser with `localStorage`.

## Demo

Open `index.html` in a browser.

No build step is required.

## Features in This Demo

- Add sticky notes.
- Drag notes around the board.
- Edit note text in place.
- Change note colors.
- Pin notes to bring them forward.
- Search visible notes.
- Export notes as JSON.
- Import a previous JSON backup.
- Reset to sample notes.

## Suggested Stack

Current demo:

- Static HTML
- CSS
- Vanilla JavaScript
- Browser `localStorage`

Future production version:

- Vite or Astro if this becomes part of a larger personal site.
- IndexedDB if notes become large.
- Optional sync later through Supabase, Firebase, or a private GitHub gist.

## Deployment

Because this is static, it can be hosted on:

- GitHub Pages
- Cloudflare Pages
- Netlify
- Vercel
- Any existing portfolio repo as a subfolder

