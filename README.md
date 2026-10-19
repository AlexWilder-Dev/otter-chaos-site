# Otter Chaos: demo site

A speculative redesign of the website for [Otter Chaos](https://www.otterchaos.co.uk), Brixton's boardgame café and bar in two
railway arches under Brixton station. Built to show the owners what their site could do; it is a front-end demo only.

**Live:** https://alexwilder-dev.github.io/otter-chaos/

## What's in it

- **Tonight**: their window sticker with a bobbing otter (tap it to roll its die; tap it three times for chaos), open-now for the
  café and the kitchen (London time), what's on tonight or next, book, call, and the table fee, then a chessboard whose pieces
  take turns to move (the knight in L-shapes) and the key facts at a glance.
- **What's on**: a swipeable fortnight, today first, with every weekly night, the monthly Live Music Night and one-offs, each with
  its real sign-up route (Meetup, Ticket Tailor or on the door). Past dates drop off by themselves.
- **Games**: a picker (players, time, party / co-op / strategy) that pulls real titles from the Otter_Chaos BoardGameGeek collection,
  and the library drawn as box spines on shelves.
- **Menu**: the April 2026 food & drink menu transcribed in full under a Scrabble-tile MENU, with the card-suit markers from the
  printed menu and pizzas that flip to show the game they're named after.
- **Book**: a mock booking flow on the chessboard ("Make your move") that shows the table fee for your group before you type
  anything.
- **Private hire**, **gift cards** (sold via DesignMyNight) and **Find us** (hours, transport, access, contact).

Forms only show a confirmation state; nothing is sent anywhere.

## Content

Everything the site says lives in one file: [`src/data/otterChaos.ts`](src/data/otterChaos.ts) (contact, hours, table fee, menu,
events, games, hire, gift cards). Research and sources are in [`research/notes.md`](research/notes.md).

## Develop

```bash
npm install
npm run dev        # http://localhost:5173/otter-chaos/
npm run build      # type-check and build to dist/
npm run images     # re-cut photos from research/img into public/img
npm run og         # rebuild public/og.jpg (1200x630 link preview)
```

Stack: Vite, React, TypeScript, Framer Motion, React Router (HashRouter). Deployed to GitHub Pages by
`.github/workflows/deploy.yml` on pushes to `main`. Asset paths are relative, so the build works from any Pages path; the
link-preview tags in `index.html` point at `https://alexwilder-dev.github.io/otter-chaos/`.

Photos and logo belong to Otter Chaos. Headings use Fredoka and body text uses Host Grotesk (both SIL OFL); `scripts/fonts`
holds a static Fredoka cut so `npm run og` can letter the preview image.

---

Site by AlexWilder-Dev
