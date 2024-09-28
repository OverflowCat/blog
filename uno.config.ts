// uno.config.ts
import { defineConfig, presetUno } from "unocss";
import presetIcons from '@unocss/preset-icons';
import transformerDirectives from '@unocss/transformer-directives'

export default defineConfig({
  presets: [presetUno(), presetIcons()],
  blocklist: ["b"],
  rules: [],
  transformers: [
    transformerDirectives(),
  ],
});
