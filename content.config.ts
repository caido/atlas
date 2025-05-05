import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    community: defineCollection({
      type: 'page',
      source: '**/*.md',
      schema: z.object({
        format: z.array(z.enum(['article', 'video', 'lab'])),
        languages: z.array(z.string()),
        tags: z.array(z.string()),
        author: z.string(),
        platform: z.string(),
        url: z.string(),
      }),
    }),
  },
})