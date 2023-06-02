// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  components: true,
  css: [
    'bootstrap/dist/css/bootstrap.css',
    'bootstrap-icons/font/bootstrap-icons.css'
  ],

  modules: [
    '@pinia/nuxt',
  ],

  plugins: [
    { src: '~/plugins/swalMixin.js', mode: 'client' }
  ],

  pinia: {
    autoImports: [
      'defineStore',
      ['defineStore', 'definePiniaStore']
    ]
  },
})
