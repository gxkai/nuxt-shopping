export default {
  /*
   ** Router config
   */
  router: {
    middleware: 'check-auth'
  },
  /*
   ** Headers of the page
   */
  head: {
    title: 'Nuxt.js + Auth0',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: 'https://nuxtjs.org/favicon.ico'
      }
    ]
  },
  /*
   ** Global CSS
   */
  css: ['normalize.css'],
  scss: ['~assets/main.scss'],
  /*
   ** Environement variables
   */
  env: {
    AUTH0_CLIENT_ID: '',
    AUTH0_CLIENT_DOMAIN: ''
  },
  plugins: [],
  modules: ['@nuxtjs/style-resources'],
  styleResources: {
    scss: ['~assets/variables.scss']
  }
}
