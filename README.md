# FieldTactics

An interactive tactics board for coaches and players to plan and visualize game strategies across multiple sports.

**Live app:** [guideflandre.github.io/FieldTactics](https://guideflandre.github.io/FieldTactics/)

---

## What it does

FieldTactics lets you set up a sport-specific court or field, place player tokens for both teams, move them into position, and draw tactical lines that automatically fade out — all in the browser, no account needed.

**Supported sports:**
- Tennis (with Australian Open, Roland-Garros, Wimbledon, and US Open court themes)
- Padel
- Football (soccer)
- Field Hockey
- Ice Hockey
- Basketball
- Volleyball
- Baseball

**Key features:**
- **Move mode** — drag player tokens to set up formations
- **Draw mode** — draw fading tactical lines directly on the court
- **Team A / Team B** color-coded player tokens (red and blue)
- **Zoom & pan** — scroll wheel or pinch-to-zoom for detail work
- **Long-press** a player token to remove it
- Touch-friendly, works well on tablets and mobile devices

---

## Run locally

**Prerequisites:** Node.js

```bash
git clone git@github.com:guideflandre/FieldTactics.git
cd FieldTactics
npm install
npm run dev
```

The dev server starts at `http://localhost:5173`.

### Other commands

```bash
npm run build     # Production build → /docs
npm run preview   # Preview the production build locally
```

---

## Deploy to GitHub Pages

The production build outputs to the `/docs` folder, which is what GitHub Pages serves.

1. Run `npm run build`
2. Commit and push the updated `/docs` folder
3. In your repo settings → Pages, set the source to **Deploy from a branch**, branch `main`, folder `/docs`

The app will be live at `https://<your-username>.github.io/FieldTactics/`.

---

## Tech stack

- [React](https://react.dev/) 18
- [Vite](https://vitejs.dev/) 5
- Pure client-side — no backend, no authentication, no data storage
