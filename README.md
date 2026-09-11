# MAVILO Bionics — mavilobionics.com

Public website for [MAVILO Bionics](https://mavilobionics.com). Next.js product experience (photos now; GLB when ready).

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm start
```

## Stack

- Next.js 15 App Router + TypeScript
- React Three Fiber + Three.js + Drei
- GSAP + ScrollTrigger
- Geist Sans + Space Grotesk
- ES / EN i18n

## Notes

- Product images: `public/images/product/`
- GLB contract: `lib/glb-contract.ts` (`public/models/` when assets land)
- Vercel should use this repo root as the project root
