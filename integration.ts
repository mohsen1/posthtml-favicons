const plugin = require("./dist/src");
import posthtml from "posthtml";
import fs from "fs";

const iconPath = "./__tests__/icon.png";
const html = `
<!doctype html>
<html>
    <head>
        <link rel="icon" href="${iconPath}" />
    </head>
    <body>
    </body>
</html>`;

console.time("processing time");
posthtml()
    .use(plugin({ outDir: "./dist", configuration: { path: "/icons" } }))
    .process(html)
    .then((res: any) => {
        console.log(res.html);
        console.timeEnd("processing time");
        console.assert(fs.existsSync("./dist/android-chrome-144x144.png"));
        console.assert(fs.existsSync("./dist/android-chrome-192x192.png"));
        console.assert(fs.existsSync("./dist/android-chrome-256x256.png"));
        console.assert(fs.existsSync("./dist/android-chrome-36x36.png"));
        console.assert(fs.existsSync("./dist/android-chrome-384x384.png"));
        console.assert(fs.existsSync("./dist/android-chrome-48x48.png"));
        console.assert(fs.existsSync("./dist/android-chrome-512x512.png"));
        console.assert(fs.existsSync("./dist/android-chrome-72x72.png"));
        console.assert(fs.existsSync("./dist/android-chrome-96x96.png"));
        console.assert(fs.existsSync("./dist/apple-touch-icon-1024x1024.png"));
        console.assert(fs.existsSync("./dist/apple-touch-icon-114x114.png"));
        console.assert(fs.existsSync("./dist/apple-touch-icon-120x120.png"));
        console.assert(fs.existsSync("./dist/apple-touch-icon-144x144.png"));
        console.assert(fs.existsSync("./dist/apple-touch-icon-152x152.png"));
        console.assert(fs.existsSync("./dist/apple-touch-icon-167x167.png"));
        console.assert(fs.existsSync("./dist/apple-touch-icon-180x180.png"));
        console.assert(fs.existsSync("./dist/apple-touch-icon-57x57.png"));
        console.assert(fs.existsSync("./dist/apple-touch-icon-60x60.png"));
        console.assert(fs.existsSync("./dist/apple-touch-icon-72x72.png"));
        console.assert(fs.existsSync("./dist/apple-touch-icon-76x76.png"));
        console.assert(fs.existsSync("./dist/apple-touch-icon-precomposed.png"));
        console.assert(fs.existsSync("./dist/apple-touch-icon.png"));
        console.assert(fs.existsSync("./dist/apple-touch-startup-image-1125x2436.png"));
        console.assert(fs.existsSync("./dist/apple-touch-startup-image-1136x640.png"));
        console.assert(fs.existsSync("./dist/apple-touch-startup-image-1242x2208.png"));
        console.assert(fs.existsSync("./dist/apple-touch-startup-image-1242x2688.png"));
        console.assert(fs.existsSync("./dist/apple-touch-startup-image-1334x750.png"));
        console.assert(fs.existsSync("./dist/apple-touch-startup-image-1536x2048.png"));
        console.assert(fs.existsSync("./dist/apple-touch-startup-image-1620x2160.png"));
        console.assert(fs.existsSync("./dist/apple-touch-startup-image-1668x2224.png"));
        console.assert(fs.existsSync("./dist/apple-touch-startup-image-1668x2388.png"));
        console.assert(fs.existsSync("./dist/apple-touch-startup-image-1792x828.png"));
        console.assert(fs.existsSync("./dist/apple-touch-startup-image-2048x1536.png"));
        console.assert(fs.existsSync("./dist/apple-touch-startup-image-2048x2732.png"));
        console.assert(fs.existsSync("./dist/apple-touch-startup-image-2160x1620.png"));
        console.assert(fs.existsSync("./dist/apple-touch-startup-image-2208x1242.png"));
        console.assert(fs.existsSync("./dist/apple-touch-startup-image-2224x1668.png"));
        console.assert(fs.existsSync("./dist/apple-touch-startup-image-2388x1668.png"));
        console.assert(fs.existsSync("./dist/apple-touch-startup-image-2436x1125.png"));
        console.assert(fs.existsSync("./dist/apple-touch-startup-image-2688x1242.png"));
        console.assert(fs.existsSync("./dist/apple-touch-startup-image-2732x2048.png"));
        console.assert(fs.existsSync("./dist/apple-touch-startup-image-640x1136.png"));
        console.assert(fs.existsSync("./dist/apple-touch-startup-image-750x1334.png"));
        console.assert(fs.existsSync("./dist/apple-touch-startup-image-828x1792.png"));
        console.assert(fs.existsSync("./dist/browserconfig.xml"));
        console.assert(fs.existsSync("./dist/coast-228x228.png"));
        console.assert(fs.existsSync("./dist/favicon-16x16.png"));
        console.assert(fs.existsSync("./dist/favicon-32x32.png"));
        console.assert(fs.existsSync("./dist/favicon-48x48.png"));
        console.assert(fs.existsSync("./dist/favicon.ico"));
        console.assert(fs.existsSync("./dist/firefox_app_128x128.png"));
        console.assert(fs.existsSync("./dist/firefox_app_512x512.png"));
        console.assert(fs.existsSync("./dist/firefox_app_60x60.png"));
        console.assert(fs.existsSync("./dist/manifest.json"));
        console.assert(fs.existsSync("./dist/manifest.webapp"));
        console.assert(fs.existsSync("./dist/mstile-144x144.png"));
        console.assert(fs.existsSync("./dist/mstile-150x150.png"));
        console.assert(fs.existsSync("./dist/mstile-310x150.png"));
        console.assert(fs.existsSync("./dist/mstile-310x310.png"));
        console.assert(fs.existsSync("./dist/mstile-70x70.png"));
        console.assert(fs.existsSync("./dist/yandex-browser-50x50.png"));
        console.assert(fs.existsSync("./dist/yandex-browser-manifest.json"));
    })
    .catch((err: Error) => {
        throw err;
    });
