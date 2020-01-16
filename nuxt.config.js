export default {
  /*
   ** Router config
   */
  router: {
    middleware: 'check-auth',
    extendRoutes(routes, resolve) {
      const indexIndex = routes.findIndex((route) => route.name === 'index')
      const index = routes[indexIndex].children.findIndex(
        (route) => route.name === 'index-child-id'
      )
      routes[indexIndex].children[index] = {
        ...routes[indexIndex].children[index],
        components: {
          default: routes[indexIndex].children[index].component,
          left: resolve(__dirname, 'components/childLeft.vue')
        },
        chunkNames: {
          left: 'components/childLeft'
        }
      }
      const index1 = routes[indexIndex].children.findIndex(
        (route) => route.name === 'index-section'
      )
      routes[indexIndex].children[index1] = {
        ...routes[indexIndex].children[index1],
        components: {
          default: routes[indexIndex].children[index1].component,
          left: resolve(__dirname, 'components/childLeft.vue')
        },
        chunkNames: {
          left: 'components/childLeft'
        }
      }
      const indexIndex2 = routes.findIndex((route) => route.name === 'blog')
      const index2 = routes[indexIndex2].children.findIndex(
        (route) => route.name === 'blog-main'
      )
      routes[indexIndex2].children[index2] = {
        ...routes[indexIndex2].children[index2],
        components: {
          default: routes[indexIndex2].children[index2].component,
          top: resolve(__dirname, 'components/blogTop.vue')
        },
        chunkNames: {
          top: 'components/blogTop'
        }
      }
    }
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
  },
  build: {
    babel: {
      plugins: ['@babel/plugin-proposal-optional-chaining']
    }
  }
}
