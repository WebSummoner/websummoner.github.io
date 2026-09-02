# WebSummoner website

[![build](https://github.com/WebSummoner/websummoner-website/actions/workflows/build.yml/badge.svg)](https://github.com/WebSummoner/websummoner-website/actions/workflows/build.yml)

The marketing site for [WebSummoner](https://github.com/WebSummoner/websummoner) —
a [Hugo](https://gohugo.io/) static site. The reference documentation lives in
each repository's own `docs-site/`, not here.

## Building

Nothing needs to be installed on your machine; the build runs in a container,
like the rest of the workspace.

```bash
docker run --rm -v "$PWD":/project ghcr.io/gohugoio/hugo:v0.165.0 \
    --source /project/site --destination /project/dist --cleanDestinationDir
```

The result lands in `dist/`, which is ignored by git. To preview it locally:

```bash
docker run --rm -p 1313:1313 -v "$PWD":/project ghcr.io/gohugoio/hugo:v0.165.0 \
    server --source /project/site --bind 0.0.0.0
```

## Layout

```
site/content/      the pages (features, browsers, ecosystem, resources)
site/data/meta.json  navigation, ecosystem projects and footer links
site/layouts/      templates; partials/ holds the reusable blocks
site/static/       images, CSS and icons, copied to the web root as-is
```

Content is plain Markdown. `site/static/css/site.css` is hand-written and
served as-is — there is no asset pipeline to run.

## Browser artwork

`site/static/images/browsers/` uses official vendor logos from
[alrra/browser-logos](https://github.com/alrra/browser-logos), the same source
as the WebSummoner UI. Do not replace them with redrawn approximations, and
keep the set in step with the browsers the project actually ships.
