/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
/// <reference types="astro-scope/client" />
declare namespace App {
  interface Locals {
    title: string;
    metas: object;
    hant?: boolean;
    vert?: string | false;
    noscript: boolean;
    renderer?: 'rss';
  }
}
