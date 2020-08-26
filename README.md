# PostHTML Favicon Generator Plugin

[![Build Status](https://travis-ci.org/mohsen1/posthtml-favicons.svg?branch=master)](https://travis-ci.org/mohsen1/posthtml-favicons)

This module is using [favicons](https://github.com/evilebottnawi/favicons) to generate all of favicons based on a single image

## Usage

Use a simple `<link>` tag to include your favicon. This plugin will add other related tags and writes generated images to disk.

```html
<html>
    <head>
        <link rel="icon" href="path/to/icon.png" />
    </head>
    <body></body>
</html>
```

### Options

See the `Options` interface in [`src/index.ts`](./src/index.ts)

For favicon configurations see favicon repo:

https://github.com/evilebottnawi/favicons#nodejs

### Example

```js
const favIconPlugin = require("posthtml-favicons");
const html = `
<!doctype html>
<html>
    <head>
        <link rel="icon" href="my-icon.png" />
    </head>
    <body>
    </body>
</html>`;

posthtml()
    .use(favIconPlugin({ outDir: "./dist", configuration: { path: "/icons" } }))
    .process(html)
    .then((res) => {
        // files are written to dist folder
        // res.html has new tags
    });
```

### Using with Parcel Bundler

There is an example repo for demonstrating usage with Parcel Bundler

[posthtml-favicon-parcel-example](https://github.com/mohsen1/posthtml-favicon-parcel-example)
