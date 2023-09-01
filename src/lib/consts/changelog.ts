import type { WhatsNew } from '$lib/types/WhatsNew';

export const changelog: WhatsNew[] = [{
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
      `Welcome Drift Devil Mechanics!`,
    ],
  },
]