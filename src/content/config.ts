import { defineCollection, reference, z } from 'astro:content';

const blog = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        category: z.string(),
        date: z.string().transform((str) => new Date(str)),
        thumbnail: z.string(),
        tags: z.array(z.string()),
        description: z.string()
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

export const collections = { blog, series };