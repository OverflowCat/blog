import { createGenerator } from "unocss";
import unoConfig from "uno.config"; // 导入当前项目的 UnoCSS 配置

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
