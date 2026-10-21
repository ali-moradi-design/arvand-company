import fsd from "@feature-sliced/steiger-plugin";
import { defineConfig } from "steiger";

export default defineConfig([
  ...fsd.configs.recommended,
  {
    // Slices used by a single page are fine in a small site; keep them for clarity.
    files: ["./src/**"],
    rules: { "fsd/insignificant-slice": "off" },
  },
]);
