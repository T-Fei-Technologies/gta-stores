# gta-stores

## GTA Store Pricing Sheet

Drift Devils Mechanic's Pricing Sheet
Live at: https://pricing-sheet.driftdevilsmechanics.com/

Made for some of my mechanic friends on the Stellar Roleplay GTA Five-M server, 4M is a quick and handy worksheet for mechanics to use for calculate charges when doing repairs/upgrades.
Now it supports stores in general and not just mechanics.
An easy way to keep a running total for big orders or if you just hate mathing things.

This readme is pretty informal as this wasn't meant to be some complex project, just a quick tool for my friends to use.

### Features
- Maintains a Parts Catalog and an active Worksheet where you can add parts charges
- Settings for handling category-based markups and adding/removing parts from the Catalog
- A discount section on the worksheet as it is more likely to change than markups
- Notes section for parts in case you need a little reminder of anything (found in settings for the corresponding part)
- A handy "Clear Worksheet" button to clear the worksheet and start fresh and quickly on your next job
- It's a Progressive Web App (PWA), so it can be installed on mobile devices as well as used offline

### Roadmap
- Nothing at the moment. With usage and feedback it may change, but I'm not planning on adding anything else currently

### Tech Info
Here is the tech I used at-a-glance
- Svelte 4.2.1 / SvelteKit 1.25.1
- Typescript 5.0.0
- TailwindCSS 3.3.3
- DaisyUI 3.9.2
- Svelte Hero Icons 5.0.0
- Theme Change 2.5.0

All data from app settings is saved to local storage, so it will persist between sessions, but not if the user clears their cache.

### Running Locally
It's a straight-up SvelteKit out-of-the-box app, so just clone the repo, run `npm install` and `npm run dev` to get it running locally.
