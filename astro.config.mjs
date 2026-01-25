import {defineConfig} from 'astro/config';

import mdx from '@astrojs/mdx';
import react from "@astrojs/react";
import sitemap from '@astrojs/sitemap';
import tailwind from "@astrojs/tailwind";
import remarkBreaks from "remark-breaks";
import astroExpressiveCode from "astro-expressive-code";
import rehypeExternalLinks from "rehype-external-links";
import rehypeMermaid from "rehype-mermaid";

// https://astro.build/config
export default defineConfig({
    site: 'https://junpakPark.github.io',
    image: {
        domains: ['avatars.githubusercontent.com'],
    },
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
            [rehypeMermaid, {strategy: 'inline-svg'}],
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
