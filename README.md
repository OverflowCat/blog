![新世界的大门 Logo](https://user-images.githubusercontent.com/20166026/203767771-c977f2cb-30da-49a9-8936-761fc4ee3450.svg#gh-dark-mode-only)
![新世界的大门 Logo](https://user-images.githubusercontent.com/20166026/203770324-bafac264-f05f-4ce4-b944-d28e5de06e0d.svg#gh-light-mode-only)
<h1 align="center">新世界的大门 blog</h1>

[![Built with Astro](https://astro.badg.es/v2/built-with-astro/tiny.svg)](https://astro.build)
![Build status](https://github.com/OverflowCat/blog/actions/workflows/pages.yml/badge.svg)

About this blog, see [About](https://blog.xinshijiededa.men/about/). Below are technical details.

## Changelog

### Astro 3.0

#### scopedStyleStrategy

Remove postcss `inaccurate-pseudo-where`, as using classes is available in Astro@2.4 and 3.0 uses data attributes.

#### Image

- `sharp`: see [Missing Sharp](https://docs.astro.build/en/reference/errors/missing-sharp/).

Moving images from [`/public`](/public/) to the content collection.

- [ ] Use `image()` in frontmatter

  Problem: Many covers are not local images.

- [ ] Fix og image
      https://docs.astro.build/en/guides/images/#generating-images-with-getimage

#### RSS

```sh
λ src/pages/atom.xml.ts
13:25:37 [astro] Lower case endpoint names are deprecated and will not be supported in Astro 4.0. Rename the endpoint get to GET.
  └─ /atom.xml (+142ms)
```
