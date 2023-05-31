// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@pinia/nuxt',
  ],

  css: [
    'bootstrap/dist/css/bootstrap.css',
  ],

  pinia: {
    autoImports: [
      'defineStore',
      ['defineStore', 'definePiniaStore']
    ]
  }
})