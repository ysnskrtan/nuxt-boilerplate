// https://nuxt.com/docs/api/configuration/nuxt-config

import Lara from '@primevue/themes/lara'

export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },

  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/test-utils',
    '@primevue/nuxt-module'
  ],

  primevue: {
    options: {
      theme: {
        preset: 'lara'
      }
    }
  }
})