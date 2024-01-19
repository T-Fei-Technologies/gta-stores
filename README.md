# gta-stores

## GTA Store Pricing Sheet

Drift Devils Mechanic's Pricing Sheet
Live at: https://pricing-sheet.driftdevilsmechanics.com/

Initially made for some of my mechanic friends on the [Stellar Roleplay](https://www.stellargaming.gg) GTA Five-M server, gta-stores is a quick and handy worksheet for mechanics to use for calculate charges when doing repairs/upgrades.
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

### Known Issues
- I broke the Management Page. Since migrating from storing prices/data in a JSON file to living in a database, I am still updating the Management side to be able to edit a much greater array of customizations

### Roadmap
- Finish the Management Page
- Possibly add a "customer-facing" version for online ordering. Will probably link to like a Discord Bot that can post orders to a Discord channel
- Add user login/registration for future features
- Add Employee Management features such as clocking in/out, tracking hours, etc.

### Tech Info
Here is the tech I used at-a-glance
- Svelte 4.2.9 / SvelteKit 2.4.0
- Typescript 5.3.3
- TailwindCSS 3.4.1
- DaisyUI 4.6.0
- Steeze UI HeroIcons 2.3.0

### Running Locally
It's a straight-up SvelteKit out-of-the-box app, so just clone the repo, run `npm install` and `npm run dev` to get it running locally or your flavor of package management.
I'm using pnpm myself.
