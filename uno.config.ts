// uno.config.ts
import { defineConfig, presetUno } from "unocss";

export default defineConfig({
  presets: [presetUno()],
  rules: [
    ["wm-h", { 'writing-mode': "horizontal-tb", }]
  ],
});
