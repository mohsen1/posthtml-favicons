import { Configuration } from "favicons";
import posthtml from "posthtml";

import fs from "fs";
import { join } from "path";
import rimraf from "rimraf";

import plugin from "../src/";

//
// Here we're checking the plugin on the ENOENT error.
//
describe("Writing tests", () => {
    let config: Partial<Configuration> = {
        icons: {
            android: false,
            appleIcon: false,
            appleStartup: false,
            coast: false,
            favicons: true,
            firefox: false,
            yandex: false,
            windows: false,
        },
    };

    let iconPath: string = "./__tests__/icon.png";

    let outDir: string = "./__tests__/dist/";

    afterEach(() => rimraf.sync(outDir));

    it("should create a nested output dir with an icon ", async () => {
        // We expect that the plugin will create three files in the output directory.
        // After, we'll list the files in the directory and compare it with the list of our expected files.
        const expectedFilesList = ["favicon.ico", "favicon-16x16.png", "favicon-32x32.png", "favicon-48x48.png"];

        const html = `
            <!doctype html>
            <html>
                <head>
                    <link rel="icon" href="${iconPath}" />
                </head>
                <body>
                </body>
            </html>
        `;

        const assetsDir = join(outDir, "assets");

        const result = await posthtml()
            .use(plugin({ outDir: assetsDir, configuration: config }))
            .process(html);

        const generatedFiles = fs.readdirSync(assetsDir);

        expect(expectedFilesList).toEqual(expect.arrayContaining(generatedFiles));
    });
});
