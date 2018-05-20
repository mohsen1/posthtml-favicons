import parser, { Tree } from "posthtml-parser";
import fs from "fs";
import path from "path";
import utils from "util";
import favicons, { Configuration, FavIconResponse } from "favicons";

export interface Options {
    /** Root of resolving path to the image */
    root?: string;
    /**
     * Directory to write the image files.
     * @default "./dist"
     */
    outDir?: string;
    /** Cache results if orignal favicon has not changed? */
    // cache?: boolean;
    /** Favicon generator configuration */
    configuration?: Partial<Configuration>;
}

/**
 * @todo implement caching
 */
function plugin(options: Options = {}) {
    const root = options.root || "./";
    const outDir = options.outDir || "./dist";
    // const shouldCache = options.cache === undefined ? true : options.cache;
    const configuration = options.configuration || {};

    return function postHtmlFavicons(tree: Tree) {
        return new Promise((resolve, reject) => {
            tree.match({ tag: "link", attrs: { rel: "icon" } }, node => {
                if (node.attrs.href === undefined) {
                    return node;
                }

                const filePath = path.resolve(root, node.attrs.href);

                favicons(filePath, configuration, (err, res) => {
                    if (err) {
                        reject(err);
                    } else {
                        // Write images to disk
                        for (const { name, contents } of [...res.images, ...res.files]) {
                            fs.writeFileSync(path.resolve(outDir, name), contents);
                        }

                        // Add tags to head tag
                        tree.match({ tag: "head" }, head => {
                            return {
                                ...head,
                                content: [...head.content, ...res.html]
                            };
                        });

                        resolve(tree);
                    }
                });

                // Remove original link tag
                return false;
            });
        });
    };
}

export default plugin;
module.exports = plugin;
