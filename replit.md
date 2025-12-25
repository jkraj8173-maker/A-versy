# Anniversary Site V2

## Overview
A beautiful anniversary celebration website built with Next.js, featuring animated screens with photo galleries, messages, and confetti effects.

## Tech Stack
- **Framework**: Next.js 15.5.2
- **UI**: React 19, Tailwind CSS 4
- **Animations**: Framer Motion
- **Components**: Keen Slider (photo gallery), Lucide React (icons), Canvas Confetti

## Project Structure
```
src/
├── app/
│   ├── page.jsx          # Main entry point
│   ├── layout.js         # Root layout
│   └── globals.css       # Global styles
├── components/
│   ├── ScreenContainer.jsx
│   └── screens/
│       ├── LoaderScreen.jsx
│       ├── IntroScreen.jsx
│       ├── MessageScreen.jsx
│       ├── PhotoGalleryScreen.jsx
│       └── AnniversaryScreen.jsx
public/
├── gifs/                 # GIF animations
└── images/               # Photo gallery images
```

## Development
- **Dev Server**: `npm run dev` (runs on port 5000)
- **Build**: `npm run build`
- **Start**: `npm run start`

## Deployment
Configured for autoscale deployment with Next.js production server.
