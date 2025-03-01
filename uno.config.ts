// uno.config.ts
import { defineConfig, presetWind3 } from "unocss";
import presetIcons from "@unocss/preset-icons";
import transformerDirectives from "@unocss/transformer-directives";

export default defineConfig({
  presets: [presetWind3(), presetIcons()],
  blocklist: ["b", "container", "me", "my", "pl", "pr", "pt", "pb", "px"],
  rules: [
    // theme
    ["text-2nd", { color: "var(--text-secondary)" }],
    ["text-hint", { color: "var(--text-hint)" }],

    // vertical
    ["upright", { "text-combine-upright": "all" }],
    ["yoko", { "text-combine-upright": "all" }],

    // transform
    [/flip-(x|y)/, ([, axis]) => ({
      transform: `scale${axis.toUpperCase()}(-1)`
    })],
    [/flip-(inline|block)/, function* ([, axis], { symbols }) {
      yield {
        transform: `scale${axis === "inline" ? "X" : "Y"}(-1)`
      }
      yield {
        [symbols.selector]: selector => `#vert:target ${selector}`,
        transform: `scale${axis === "block" ? "X" : "Y"}(-1)`
      }
    }],
  ],
  transformers: [transformerDirectives()],
});
