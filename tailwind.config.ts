import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          '50': '#edfcf5',
          '100': '#d3f8e5',
          '200': '#abefd0',
          '300': '#74e1b6',
          '400': '#3ecc98',
          '500': '#18b17e',
          '600': '#0c8f66',
          '700': '#0a7255',
          '800': '#0a5b44',
          '900': '#094b39',
          '950': '#042a21',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
export default config
