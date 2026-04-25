# Humanistic GIS Laboratory — Website

Source for [hgis.uw.edu](https://hgis.uw.edu), the Humanistic GIS Laboratory at the University of Washington, Department of Geography.

Built with [Astro](https://astro.build) as a static site. The hero globe is rendered with [D3](https://d3js.org/) (`geoOrthographic` projection + topojson land).

## Stack

- **Astro 5** — static site generator
- **D3 v7** + `topojson-client` — interactive globe (loaded from esm.sh)
- **Fraunces** + **Cormorant Garamond** + **Inter** — typography (Google Fonts)
- No JS framework, no build complexity beyond `astro build`

## Local development

```bash
npm install
npm run dev        # dev server at http://localhost:4321
npm run build      # static output to dist/
npm run preview    # serve the built dist/
```

## Site structure

```
src/
├── components/
│   ├── Header.astro           # site header + nav
│   ├── Footer.astro
│   └── GlobeHero.astro        # D3 orthographic globe with project/press/talk markers
├── data/
│   ├── projects.json          # public-scholarship projects with thumbnails + coords
│   ├── news.ts                # media coverage (with outlet → city mapping)
│   └── talks.ts               # invited talks with venue coordinates
├── layouts/
│   └── BaseLayout.astro
├── pages/                     # one .astro file per route
│   ├── index.astro
│   ├── research.astro
│   ├── projects.astro
│   ├── publications.astro
│   ├── people.astro
│   ├── teaching.astro
│   ├── news.astro
│   └── cv.astro
└── styles/
    └── global.css             # Morandi color tokens + base type
```

## Deployment

This repo includes the built `dist/` folder. To deploy on the UW Apache host:

```bash
git clone https://github.com/jakobzhao/hgis-site.git
# Point Apache DocumentRoot at hgis-site/dist
```

### Auto-pull on push (cron)

Every minute, the server checks GitHub and fast-forwards if there are new
commits — see [`deploy/pull.sh`](deploy/pull.sh). Install once:

```bash
ssh netid@uwserver
cd ~/hgis-site
crontab -e
# add this line:
* * * * * /home/USER/hgis-site/deploy/pull.sh
```

`pull.sh` uses `flock` to avoid concurrent runs and only fast-forwards
(refuses to clobber local edits). Activity is logged to `deploy/pull.log`.

Latency: at most 1 minute from `git push` to live.

### Manual update

```bash
ssh netid@uwserver
cd ~/hgis-site && git pull
```

When making changes locally:

```bash
# 1. Edit something under src/
# 2. Rebuild
npm run build
# 3. Commit both source and dist/
git add -A
git commit -m "..."
git push
```

## License

All rights reserved.
