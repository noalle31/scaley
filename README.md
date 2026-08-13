# Scaley 🎼

A musical app that builds a scale based on root note and scale type and renders it on a staff.

## How It Works

- Select a root note
- Select a scale type
- Select a clef

Scaley builds the full scale (using correct enharmonic 'note spelling') for that key and renders the result on a musical staff in standard notation, including the appropriate key signature. In some cases (e.g. Db minor, Gb minor), it surfaces an enharmonic alternative instead.

## Supported Scales

| Scale | Mode |
|---|---|
| Major (Ionian) | |
| Natural Minor (Aeolian) | |
| Harmonic Minor | |
| Melodic Minor | |
| Dorian | mode II |
| Phrygian | mode III |
| Lydian | mode IV |
| Mixolydian | mode V |
| Locrian | mode VII |

## Prerequisites

- Node.js 18+ and npm

## Run locally (web)

```bash
npm install
npm run build:web
npx http-server . -p 4173 -c-1
```

Open `http://localhost:4173`.

## Run locally (CLI)

```bash
node src/app/cli.js
```

Use arrow keys to navigate root/type menus, `left`/`right` to switch between them, and `Enter` to confirm. The scale is printed to the terminal.

## Run tests

```bash
npm test
```

For the interactive Playwright test UI:

```bash
npm run test:ui
```

If Playwright browsers are missing:

```bash
npx playwright install
```

## Built with

- [VexFlow](https://www.vexflow.com/) - music notation rendering
- [Browserify](https://browserify.org/) - bundling for the browser
- [Playwright](https://playwright.dev/) - end-to-end tests

## Project Structure

```
src/
  app/        # entry points (web-ui.js, cli.js)
  domain/     # core logic (scale building, key signatures, octave placement)
  ui/         # rendering and layout (staff, menus)
dist/
  bundle.js   # browserified output
```