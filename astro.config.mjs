// @ts-check
import { defineConfig, envField } from "astro/config";
import mdx from "@astrojs/mdx";
import cloudflare from "@astrojs/cloudflare";
import { MessageChannel } from "node:worker_threads";

import react from "@astrojs/react";

//@ts-ignore
globalThis.MessageChannel ??= MessageChannel;

// https://astro.build/config
export default defineConfig({
  image: {
    service: { entrypoint: 'astro/assets/services/noop' },
  },
  adapter: cloudflare({
    imageService: 'compile',
  }),
  site: "https://argonptg.uk",
  markdown: {
    shikiConfig: {
      theme: "catppuccin-mocha",
    },
  },
  integrations: [react(), mdx()],
  env: {
    schema: {
      DB_URL: envField.string({ context: "client", access: "public" }),
      AUTH_TOKEN: envField.string({ context: "server", access: "secret" })
    }
  },
  vite: {
    resolve: {
      // Use react-dom/server.edge instead of react-dom/server.browser for React 19.
      // Without this, MessageChannel from node:worker_threads needs to be polyfilled.
      alias: import.meta.env.AUTH_TOKEN && {
        "react-dom/server": "react-dom/server.edge",
      },
    },
  },
});