import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config';

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      browser: {
        enabled: true,
        provider: 'playwright',
        instances: [
          { browser: 'chromium', headless: true },
          { browser: 'firefox', headless: true },
        ],
      },
    },
  }),
);
