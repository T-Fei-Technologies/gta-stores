import type { WhatsNew } from '$lib/types/WhatsNew';

export const changelog: WhatsNew[] = [
  {
    version:  '2.1.0',
    title:    `Multi-Store Support`,
    features: [
      `Changes to support multiple stores driven by the DB and environment variables. Merged several stores together `
      + `into a single codebase. Will try to include merged features here, but may miss some`,
      `Delivery fees now available to stores. Delivery fee is a flat fee per order, not per item`,
    ],
    other: [
      `Management page still disabled while I rework it to support the new database-driven system`,
    ]
  },
  {
    version:  '2.0.0',
    title:    `Version Update - Migration to Database`,
    features: [
      `All parts and markup are now stored in a database so they should properly persist and no longer have caching issues`,
    ],
    other: [
      `Removed the Cosmetics category until it gets implemented again in-city`,
    ],
  },
  {
    version:  '1.2.1',
    title:    `Major Update - Updated based on new performance parts`,
    features: [
      `Updated catalog with new performance parts and prices`,
    ],
    other: [
      `Removed local storage for settings and catalog items. Was causing too many issues`,
      `Removed local install capability for the same reason`,
      `Removed the settings cog since there's no longer a need for it`,
      `Updated readme to reflect new name (whoops for taking so long)`,
    ],
  },
  {
    version: '1.1.1',
    title: `Minor Update - Special Label and Billing Command Copy`,
    features: [
      `Added a space for a special label for a receipt when billing a customer`,
      `Added a display for the billing command to use for a bill including a copy to clipboard button`
    ],
    bugfixes: [
      `Fixed a bug where markups would not be updated properly from the management page`,
    ],
  },
  {
    version: '1.1.0',
    title: `Mobile-Friendly`,
    features: [
      `Styling tweaks have been made to make the app mobile-friendly! It should act a little more like a shopping type 
      experience. Bug-tested reasonably well, but please report any issues you find!`,
    ],
  },
  {
    version: '1.0.1',
    title: `Price and Markup Admin Control`,
    features: [
      `Prices and Settings moved to an admin page. The URL is a secret though!`,
    ],
  },
  {
    version: '1.0.0',
    title: `It's Official`,
    other: [
      `Welcome to the GTA Stores App!`,
    ],
  },
]
