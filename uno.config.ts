// uno.config.ts
import { defineConfig, presetUno } from "unocss";
import presetIcons from "@unocss/preset-icons";
import transformerDirectives from "@unocss/transformer-directives";

export default defineConfig({
  presets: [presetUno(), presetIcons()],
  blocklist: ["b"],
  rules: [
    ["text-2nd", { color: "var(--text-secondary)" }],
    ["text-hint", { color: "var(--text-hint)" }],
  ],
  transformers: [transformerDirectives()],
});
