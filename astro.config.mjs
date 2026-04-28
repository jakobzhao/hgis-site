import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { DRAFT_SLUGS } from './src/data/friday-harbor';

export default defineConfig({
  site: 'https://hgis.uw.edu',
  integrations: [
    sitemap({
      filter: (page) => !DRAFT_SLUGS.some((slug) => page.includes(`/friday-harbor/${slug}`)),
    }),
  ],
});
