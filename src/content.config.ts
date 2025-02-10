import { defineCollection, z } from 'astro:content';

import { glob, file } from 'astro/loaders';

const blog = defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./src/data/blog" }),
    schema: z.object({
        title: z.string(),
        date: z.coerce.date(),
        updated: z.coerce.string().date().optional()
    })
});
const friends = defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./src/data/friends" })
    schema: z.object({
        name: z.string(),
        link: z.string(),
        order: z.number()
    })
})

export const collections = { blog, friends };
