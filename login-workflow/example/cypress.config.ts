import { defineConfig } from "cypress";

export default defineConfig({
  viewportWidth: 1000,
  viewportHeight: 750,
  e2e: {
    setupNodeEvents(on, config) {
      require('@cypress/code-coverage/task')(on, config)
      return config
    },
  },
});
