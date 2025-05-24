// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  site: "https://argonptg.uk",
  markdown: {
    shikiConfig: {
      theme: "catppuccin-mocha",
    },
  },
  integrations: [mdx()],
  adapter: cloudflare(),
});
