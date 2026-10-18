import { createGenerator } from "unocss";
import unoConfig from "uno.config"; // 导入当前项目的 UnoCSS 配置

let generator: ReturnType<typeof createGenerator> | undefined;

/**
 * Generate UnoCSS style from HTML string
 * @param content HTML string
 * @returns CSS string
 */
export async function generateUno(content: string, layer = 'default') {
  // @ts-ignore
  generator ??= createGenerator(unoConfig);
  // console.log({ generator, layer, content})
  const style = await (await generator).generate(content);
  return style.getLayer(layer);
}
