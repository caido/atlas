import path from 'path'

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@primevue/nuxt-module'
  ],
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
        }
      ],
      htmlAttrs: {
        "data-mode": "dark"
      }
    },
  },
})