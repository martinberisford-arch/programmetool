import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        nhs: {
          blue: '#005EB8',
          teal: '#007f6d'
        }
      }
    }
  },
  plugins: []
};

export default config;
