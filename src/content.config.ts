import { defineCollection, z } from 'astro:content';

import { glob, file } from 'astro/loaders';

const blog = defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./src/collections/blog" }),
    schema: z.object({
        title: z.string(),
        date: z.coerce.date(),
        updated: z.coerce.string().date().optional()
    })
});

export const collections = {blog};
