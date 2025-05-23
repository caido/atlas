import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    community: defineCollection({
      type: 'page',
      source: '**/*.{md,json}',
      schema: z.object({
        title: z.string(),
        description: z.string(),
        author: z.string(),
        platform: z.string(),
        format: z.array(z.enum(['article', 'video', 'lab'])),
        languages: z.array(z.string()),
        tags: z.array(z.string()),
        url: z.string(),
        publishedAt: z.date(),
      }),
    }),
  },
})