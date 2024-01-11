import {defineConfig} from 'astro/config';

import mdx from '@astrojs/mdx';
import react from "@astrojs/react";
import sitemap from '@astrojs/sitemap';
import tailwind from "@astrojs/tailwind";
import remarkBreaks from "remark-breaks";
import astroExpressiveCode from "astro-expressive-code";
import rehypeExternalLinks from "rehype-external-links";

// https://astro.build/config
export default defineConfig({
    site: 'https://junpakPark.github.io',
    integrations: [
        react(),
        sitemap(),
        tailwind(),
        astroExpressiveCode({
            themes: ['material-theme-darker'],
        }),
        mdx(),
    ],
    markdown: {
        syntaxHighlight: false,
        remarkPlugins: [remarkBreaks],
        rehypePlugins: [
            [
                rehypeExternalLinks,
                {
                    target: '_blank',
                    rel: ['noopener', 'noreferrer'],
                },
            ],
        ],
    },
});
