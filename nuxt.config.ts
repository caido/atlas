import path from 'path'

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  site: {
    url: 'https://atlas.caido.io',
    name: 'Atlas',
  },
  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxtjs/sitemap',
    '@nuxtjs/tailwindcss',
    '@primevue/nuxt-module',
  ],
  content: {
    // Default options
  },
  nitro: {
    static: true,
    prerender: {
      crawlLinks: true,
      routes: ['/sitemap.xml'],
    },
  },
  primevue: {
    options: {
      unstyled: true,
    },
    importPT: {
      from: path.resolve(__dirname, './presets/'),
    }
  },
  app: {
    head: {
      meta: [
        {
          name: 'color-scheme',
          content: 'dark'
        },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1'
        }
      ],
      htmlAttrs: {
        "data-mode": "dark"
      }
    },
  }
})