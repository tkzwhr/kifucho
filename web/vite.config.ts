/// <reference types="vitest" />

import { defineConfig } from "vite";
import solid from "vite-plugin-solid";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths({ root: "./" }), solid()],
  test: {
    include: ["src/dto/**/*.spec.ts"],
    coverage: {
      include: ["src/dto/**/*"],
    },
  },
});
