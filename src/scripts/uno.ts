import { createGenerator } from "unocss";
import unoConfig from "uno.config";

/**
 * Generate UnoCSS style from HTML string
 * @param content HTML string
 * @returns CSS string
 */
export async function generateUno(content: string, layer: string = 'default') {
  const generator = createGenerator(unoConfig);
  const style = await generator.generate(content);
  return style.getLayer(layer);
}
