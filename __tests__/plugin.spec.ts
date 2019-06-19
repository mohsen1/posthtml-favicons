import posthtml from "posthtml";

import { Configuration, FavIconResponse } from "favicons";
import plugin from "../src/";

jest.mock("favicons", () => (input: string, config: any, cb: Function) => {
    const res: FavIconResponse = {
        images: [{ name: "foo", contents: Buffer.alloc(10) }],
        files: [{ name: "bar", contents: Buffer.alloc(10) }],
        html: ['<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">']
    };
    cb(null, res);
});

//
// Here we're checking the correctness of the replacement of a source link tag by generated link tags with icons.
//
describe("basics", () => {
    let iconPath: string = "./__tests__/icon.png";

    let config: Partial<Configuration> = {
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

        const result = await posthtml()
            .use(plugin({ configuration: config }))
            .process(html);

        expect(result.html).toMatchSnapshot();
    });
});
