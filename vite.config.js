import path from "path"

import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"
import mdx from "@mdx-js/rollup"

// ~~~~~~~~~~~~~~~~~~~~~~~~
import remarkGfm from "remark-gfm"
import remarkParse from "remark-parse"
import remarkRehype from "remark-rehype"
import rehypeStringify from "rehype-stringify"
import rehypeKatex from "rehype-katex"
import remarkMath from "remark-math"
// import rehypeRaw from 'rehype-raw'
import rehypePrettyCode from "rehype-pretty-code"
import { rendererRich, transformerTwoslash } from "@shikijs/twoslash"
// import { remarkMermaid } from '@theguild/remark-mermaid'
import rehypeShiki from "@shikijs/rehype"
import remarkMdxDisableExplicitJsx from "./plugins/remark-mdx-disable-explicit-jsx.mjs"
import { remarkCustomHeadingId } from "./plugins/remark-custom-heading-id.mjs"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import { remarkHeadings } from "./plugins/remark-headings.mjs"
import { remarkLinkRewrite } from "./plugins/remark-link-rewrite.mjs"
import { remarkMdxFrontMatter } from "./plugins/remark-mdx-frontmatter.mjs"
// import { remarkMdxTitle } from './plugins/remark-mdx-title.mjs'
import { remarkStaticImage } from "./plugins/remark-static-image.mjs"
import { remarkStructurize } from "./plugins/remark-structurize.mjs"
// import { rehypeAttachCodeMeta, rehypeParseCodeMeta } from './plugins/rehype.mjs'
import { rehypeExtractTocContent } from "./plugins/rehype-extract-toc-content.mjs"
import { rehypeIcon } from "./plugins/rehype-icon.mjs"
import { DEFAULT_REHYPE_PRETTY_CODE_OPTIONS, rehypeAttachCodeMeta, rehypeParseCodeMeta } from "./plugins/rehype.mjs"
// import { recmaRewriteJsx } from './plugins/recma-rewrite-jsx.mjs'
// import { recmaRewriteFunctionBody } from './plugins/recma-rewrite-function-body.mjs'
// ~~~~~~~~~~~~~~~~~~~~~~~~

export default defineConfig({
    base: '/',
    plugins: [
        mdx({
            providerImportSource: "@mdx-js/react",
            remarkPlugins: [
                // remarkMermaid,
                remarkGfm,
                remarkMdxFrontMatter,
                remarkParse,
                remarkRehype,
                remarkMath,
                remarkMdxDisableExplicitJsx,
                remarkCustomHeadingId,
                // remarkMdxTitle,
                [remarkHeadings, { exportName: "useTOC" }],
                [
                    remarkLinkRewrite,
                    {
                        pattern: /\.mdx?(?:(?=[#?])|$)/,
                        replace: "",
                        excludeExternalLinks: true,
                    },
                ],
                remarkStaticImage,
                [remarkStructurize, { codeblocks: true }],
            ],
            rehypePlugins: [
                rehypeAutolinkHeadings,
                [
                    rehypePrettyCode,
                    {
                        theme: "github-light",
                        keepBackground: false,
                        onVisitHighlightedLine(node) {
                            node.properties.className = ["highlighted"]
                        },
                        onVisitHighlightedWord(node) {
                            node.properties.className = ["highlighted-word"]
                        },
                    },
                ],
                [rehypeParseCodeMeta, { defaultShowCopyCode: true }],
                rehypeStringify,
                rehypeKatex,
                [
                    rehypeShiki,
                    {
                        theme: "github-light",
                    },
                ],
                rehypeIcon,
                rehypeAttachCodeMeta,
                rehypeExtractTocContent,
            ],
        }),
        tailwindcss(),
        react(),
    ],
    resolve: {
        alias: {
            "@/": `${path.resolve(__dirname, "")}/`, // Alias for the "src" directory
        },
    },
    optimizeDeps: {
        include: ["@mdx-js/react"],
    },
})
