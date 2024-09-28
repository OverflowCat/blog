/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
/// <reference types="astro-scope/client" />
declare namespace App {
  interface Locals {
    title: string;
    metas: any;
    noscript: boolean;
    renderer?: 'rss';
  }
}
