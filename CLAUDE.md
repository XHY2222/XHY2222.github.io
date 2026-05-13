# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static personal portfolio website (个人主页) for Xiao Huiyu (肖慧宇). It is vanilla HTML/CSS/JS with no build tools, no dependencies, and no package manager. It deploys automatically to GitHub Pages at https://xhy2222.github.io.

## File Structure

| File | Purpose |
|---|---|
| `index.html` | Page structure and bilingual (CN/EN) content |
| `style.css` | Styling including dark mode and responsive design |
| `script.js` | Theme toggle with localStorage persistence, auto year, scroll animations |
| `cv.pdf` | Resume PDF (ignored by git, added manually to repo for Pages deployment) |

## Development

There is no build step. To preview locally, open `index.html` directly in a browser:

```bash
open index.html
```

Or use any static file server.

## Deployment

GitHub Pages auto-deploys from the `main` branch. Push to deploy:

```bash
git add index.html style.css script.js
git commit -m "描述更新内容"
git push
```

Changes appear at https://xhy2222.github.io within seconds.

## Architecture Notes

- **Theming**: Dark mode is toggled via `data-theme="dark"` on `<html>`. CSS custom properties define light/dark values. The user's preference is saved to `localStorage` and restored on page load.
- **Scroll animations**: `IntersectionObserver` fades in `.project-card`, `.about-grid`, and `.contact-list` elements when they enter the viewport. Styles are applied inline by JS (opacity, transform, transition).
- **Responsive breakpoint**: Mobile layout switches at 720px.
- **Fonts**: Google Fonts (Inter + Noto Serif SC) loaded from CDN.
- **Glassmorphism nav**: Uses `backdrop-filter: blur()` with a shadow that appears on scroll (set inline by JS).

## Content Customization

The site contains placeholder content that should be customized when editing:

- `index.html:32` — Hero tagline
- `index.html:46-47` — About bio paragraphs
- `index.html:50-52` — About metadata (Location, Focus, Stack)
- `index.html:64-96` — Project cards (title, description, tags, links)
- `index.html:108-133` — Contact links (GitHub, email, other)
- `cv.pdf` — Replace with an updated resume
