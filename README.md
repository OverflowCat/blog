# 新世界的大门 blog

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
