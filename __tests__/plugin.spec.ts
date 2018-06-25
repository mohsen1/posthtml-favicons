import posthtml from "posthtml";

import plugin from "../src";
import { Configuration, FavIconResponse } from "favicons";

jest.mock("fs");
jest.mock("favicons", () => (input: string, config: any, cb: Function) => {
    setTimeout(() => {
        const res: FavIconResponse = {
            images: [{ name: "foo", contents: Buffer.alloc(10) }],
            files: [{ name: "bar", contents: Buffer.alloc(10) }],
            html: ['<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">']
        };
        cb(null, res);
    }, 1);
});

describe("basics", () => {
    it("does nothing if a link tag does not exist", async () => {
        const html = `
            <!doctype html>
            <html>
                <head>
                </head>
                <body>
                </body>
            </html>
        `;
        const config: Partial<Configuration> = {
            icons: {
                android: false,
                appleIcon: false,
                appleStartup: false,
                coast: false,
                favicons: true,
                firefox: false,
                yandex: false,
                windows: false
            }
        };
        const result = await posthtml()
            .use(plugin({ configuration: config }))
            .process(html);
        expect(result.html).toMatchSnapshot();
    });

    it("appends basic tags", async function() {
        const iconPath = "./__tests__/icon.png";
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
        const config: Partial<Configuration> = {
            icons: {
                android: false,
                appleIcon: false,
                appleStartup: false,
                coast: false,
                favicons: true,
                firefox: false,
                yandex: false,
                windows: false
            }
        };

        const result = await posthtml()
            .use(plugin({ configuration: config }))
            .process(html);
        expect(result.html).toMatchSnapshot();
    });
});
