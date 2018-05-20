# PostHTML Favicon Generator Plugin

[![Build Status](https://travis-ci.org/mohsen1/posthtml-favicons.svg?branch=master)](https://travis-ci.org/mohsen1/posthtml-favicons)

This module is using [favicons](https://github.com/evilebottnawi/favicons) to generate all of favicons based on a single image

## Usage

Use a simple `<link>` tag to include your favicon. This plugin will add other related tags and writes generated images to disk.

```html
<html>
    <head>
        <link rel="favicon" href="path/to/icon.png" />
    </head>
    <body>
    </body>
</html>
```

### Options

See favicon `configuration`

https://github.com/evilebottnawi/favicons#nodejs
