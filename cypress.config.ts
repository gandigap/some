import { defineConfig } from 'cypress';
import coverage from '@cypress/code-coverage/task';

export default defineConfig({
  env: {
    codeCoverage: {
      exclude: 'cypress/**/*.*',
    },
  },
  e2e: {
    baseUrl: 'http://127.0.0.1:6969',
    setupNodeEvents(on, config) {
      coverage(on, config);
      return config;
    },
  },
  video: false,
});
