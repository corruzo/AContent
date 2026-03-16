// astro.config.mjs
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

export default defineConfig({
  site: 'https://acontent.net',
  output: 'server', // Cambia 'static' por 'server'
  adapter: vercel(), // Añade esto
  integrations: [react(), tailwind(), sitemap()],
});
