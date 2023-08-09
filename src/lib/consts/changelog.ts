import type { WhatsNew } from '$lib/types/WhatsNew';

export const changelog: WhatsNew[] = [
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