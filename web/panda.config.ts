import { defineConfig } from "@pandacss/dev";
import { createPreset } from "@park-ui/panda-preset";
// @ts-ignore
import accentColor from "@park-ui/panda-preset/colors/indigo";
// @ts-ignore
import grayColor from "@park-ui/panda-preset/colors/slate";

export default defineConfig({
  preflight: true,
  presets: [createPreset({ accentColor, grayColor, radius: "sm" })],
  include: ["./src/**/*.{js,jsx,ts,tsx}", "./pages/**/*.{js,jsx,ts,tsx}"],
  exclude: [],
  theme: {
    extend: {},
  },
  jsxFramework: "solid",
  outdir: "styled-system",
});
