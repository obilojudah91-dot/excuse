# EXCUSE™

A deliberately unnecessary investigation department for why you didn't do the
thing. Submit an excuse, watch a theatrical fake investigation run, and get
back a forensic-style diagnosis with a severity score, evidence, and a
treatment plan.

Entertainment only. Not a real medical or psychological tool.

## Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS
- Framer Motion
- No backend, no database, no auth, no external AI API — everything runs
  client-side. The diagnosis engine (`lib/diagnosisEngine.ts`) is a
  deterministic, pattern-matching text analyzer with seeded variety, so the
  same excuse always produces the same case, while different excuses land in
  different corners of the diagnosis space.
- Archive persistence is `localStorage` only (`lib/storage.ts`) — nothing
  leaves the browser.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Deploying

Push to a GitHub repo and import it on [vercel.com/new](https://vercel.com/new),
or run:

```bash
npm i -g vercel
vercel
```

No environment variables are required.

## Project structure

```
app/
  page.tsx          Investigate flow (idle → investigating → verdict)
  archive/page.tsx   Local case archive
  about/page.tsx     Department charter / disclaimer
  layout.tsx         Fonts, metadata, global shell
  globals.css        Base styles, focus states, reduced-motion support
components/
  Hero, ExcuseInput, InvestigationSequence, VerdictCard,
  SeverityMeter, EvidenceList, TreatmentCard, Archive,
  Navigation, StatusIndicator, Microcopy
lib/
  diagnosisEngine.ts  Pattern detection + deterministic diagnosis generation
  storage.ts          localStorage archive read/write
  types.ts            Shared types
```

## Design system

- **Palette** — obsidian `#0A0A0A` / ivory `#F4F0E8` as the primary
  black-and-ivory base; tangerine `#FF5A1F` for energy and calls to action;
  acid lime `#C7F000` for verdicts and confidence; ice cyan `#9DEBFF` used
  sparingly for technical/investigation metadata.
- **Type** — Fraunces (editorial display/serif), Space Grotesk (interface
  sans), IBM Plex Mono (diagnostic codes, scores, timestamps, metadata).
- Reduced-motion is respected globally; all interactive elements have
  visible focus states.
