import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE_TITLE, SITE_DESCRIPTION } from '../constants';
import { processPosts } from '../utils';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
    const posts = await getCollection('blog');
    const publishedPosts = processPosts(posts);

    return rss({
        title: SITE_TITLE,
        description: SITE_DESCRIPTION,
        site: context.site!,
        items: publishedPosts.map((post) => ({
            title: post.data.title,
            description: post.data.description,
            pubDate: post.data.date,
            link: `/posts/${post.slug}/`,
        })),
    });
}
