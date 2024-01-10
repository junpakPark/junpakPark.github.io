import {defineCollection, reference, z} from 'astro:content';

const blog = defineCollection({
    type: 'content',
    schema: z.object({
        category: reference('category'),
        title: z.string(),
        date: z.string().transform((str) => new Date(str)),
        author: z.string(),
        image: z.string(),
        description: z.string(),
        published: z.boolean(),
        tags: z.array(z.string()),
    })
});

const category = defineCollection({
    type: 'data',
    schema: z.object({
        title: z.string(),
        major: z.string(),
        description: z.string(),
    })
});

const series = defineCollection({
    type: 'data',
    schema: z.object({
        title: z.string(),
        imageUrl: z.string(),
        description: z.string(),
        posts: z.array(reference('blog')),
    })
});

export const collections = {blog, category, series};
