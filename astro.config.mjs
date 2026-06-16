import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from "@astrojs/tailwind";

import sitemap from "@astrojs/sitemap";

const isGithubPages = process.env.GITHUB_PAGES === "true";

// https://astro.build/config
export default defineConfig({
  site: isGithubPages ? "https://dimarising.github.io" : "https://spacefix.pl",
  base: isGithubPages ? "/SpaceFix-testing/" : undefined,
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false
    }),
    sitemap({
      lastmod: new Date(),
    })],
  trailingSlash: 'always'
});
