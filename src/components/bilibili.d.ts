declare module "bilibili-bv-av-convert" {
  /**
   * Convert a BV string to AV number
   * @param bv The BV string to be converted to AV number
   * @returns The AV number converted from the provided BV string
   */
  export function BVtoAV(bv: string): number;

  /**
   * Convert a AV number to BV string
   * @param av The AV number to be converted to BV string
   * @returns The BV string converted from the provided AV number
   */
  export function AVtoBV(av: number): string;
}
