import { Tree } from "posthtml-parser";
import fs from "fs";
import path from "path";
import utils from "util";
import mkdirp from "mkdirp";
import favIcons, { Configuration } from "favicons";

const writeFile = utils.promisify(fs.writeFile);

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
            let filePath: undefined | string;

            tree.match({ tag: "link", attrs: { rel: /icon/ } }, node => {
                if (node.attrs.href === undefined) {
                    return node;
                }

                filePath = path.resolve(root, node.attrs.href);

                // Remove original link tag
                return false;
            });

            if (filePath === undefined) {
                console.info("[posthtml-favicon] No favicon link tag was found.");
                return resolve();
            }

            if (!fs.existsSync(outDir)) {
                mkdirp.sync(outDir);
            }

            favIcons(filePath, configuration, async (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    const writeFilePromises = [];

                    // Write images to disk
                    for (const { name, contents } of [...res.images, ...res.files]) {
                        writeFilePromises.push(writeFile(path.resolve(outDir, name), contents));
                    }

                    try {
                        await Promise.all(writeFilePromises);
                    } catch (e) {
                        return reject(e);
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
        });
    };
}

export default plugin;
module.exports = plugin;
