# Scaley 🎼

A scale builder with proper diatonic spelling, key signatures, and Playwright tests.

## How It Works

In the web app, you choose:
- a root note (for example `C`, `F#`, or `Bb`)
- a scale type (for example major, natural minor, harmonic minor, or melodic minor)

Scaley then builds the full scale using correct note spelling for that key and renders the result on a musical stave in standard notation, including the appropriate key signature.

## Prerequisites

- Node.js 18+ and npm

## Run locally

```bash
npm install
npm run build:web
npx http-server . -p 4173 -c-1
```

Open `http://localhost:4173`.

## Run tests

```bash
npm test
```

If Playwright browsers are missing:

```bash
npx playwright install
```
