/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        club77: {
          "primary": "#a42c71",
          "secondary": "#111111",
          "accent": "#f3f4f6",
          "neutral": "#111827",
          "base-100": "#371F1F",
          "info": "#3ABFF8",
          "success": "#84cc16",
          "warning": "#FBBD23",
          "error": "#e11d48",
        },
        driftdevil: {
          "primary": "#b91c1c",
          "secondary": "#111111",
          "accent": "#f3f4f6",
          "neutral": "#111827",
          "base-100": "#371F1F",
          "info": "#3ABFF8",
          "success": "#84cc16",
          "warning": "#FBBD23",
          "error": "#e11d48",
        },
        koi: {
          "primary": "#b21d23",
          "secondary": "#efdada",
          "accent": "#111111",
          "neutral": "#111827",
          "base-100": "#371F1F",
          "info": "#3ABFF8",
          "success": "#84cc16",
          "warning": "#FBBD23",
          "error": "#e11d48",
        },
      },
      "light",
      "dark",
    ],
  },
  plugins: [require('@tailwindcss/typography'), require("daisyui")],
}

