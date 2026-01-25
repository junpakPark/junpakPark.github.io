import { getCollection } from 'astro:content';
import { SITE_TITLE, SITE_DESCRIPTION, AUTHOR } from '../constants';
import { processPosts } from '../utils';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
    const posts = await getCollection('blog');
    const publishedPosts = processPosts(posts);
    const siteUrl = context.site!.toString().replace(/\/$/, '');

    const feed = {
        version: 'https://jsonfeed.org/version/1.1',
        title: SITE_TITLE,
        description: SITE_DESCRIPTION,
        home_page_url: siteUrl,
        feed_url: `${siteUrl}/feed.json`,
        language: 'ko',
        authors: [
            {
                name: AUTHOR.name,
                avatar: AUTHOR.profileImage,
            },
        ],
        items: publishedPosts.map((post) => ({
            id: `${siteUrl}/posts/${post.slug}/`,
            url: `${siteUrl}/posts/${post.slug}/`,
            title: post.data.title,
            summary: post.data.description,
            date_published: post.data.date.toISOString(),
            tags: post.data.tags,
        })),
    };

    return new Response(JSON.stringify(feed, null, 2), {
        headers: {
            'Content-Type': 'application/feed+json; charset=utf-8',
        },
    });
}
