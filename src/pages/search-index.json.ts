import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { processPosts } from '../utils';

export interface SearchIndexItem {
    slug: string;
    title: string;
    description: string;
    tags: string[];
    date: string;
}

export const GET: APIRoute = async () => {
    const posts = await getCollection('blog');
    const publishedPosts = processPosts(posts);

    const searchIndex: SearchIndexItem[] = publishedPosts.map((post) => ({
        slug: post.slug,
        title: post.data.title,
        description: post.data.description,
        tags: post.data.tags,
        date: post.data.date.toISOString().split('T')[0],
    }));

    return new Response(JSON.stringify(searchIndex), {
        headers: {
            'Content-Type': 'application/json',
        },
    });
};
