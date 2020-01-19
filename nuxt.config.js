require('dotenv').config()
const BASE_URL = process.env.BASE_URL
export default {
  /*
   ** Router config
   */
  router: {
    // middleware: 'check-auth',
    extendRoutes(routes, resolve) {
      const indexIndex2 = routes.findIndex((route) => route.path === '/blog')
      const index2 = routes[indexIndex2].children.findIndex(
        (route) => route.name === 'blog'
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
      const index3 = routes[indexIndex2].children.findIndex(
        (route) => route.name === 'blog-category-id'
      )
      routes[indexIndex2].children[index3] = {
        ...routes[indexIndex2].children[index3],
        components: {
          default: routes[indexIndex2].children[index3].component,
          top: resolve(__dirname, 'components/blogTop.vue')
        },
        chunkNames: {
          top: 'components/blogTop'
        }
      }

      const indexIndex3 = routes.findIndex((route) => route.path === '/admin')
      const index4 = routes[indexIndex3].children.findIndex(
        (route) => route.name === 'admin'
      )
      routes[indexIndex3].children[index4] = {
        ...routes[indexIndex3].children[index4],
        components: {
          default: routes[indexIndex3].children[index4].component,
          top: resolve(__dirname, 'components/adminTop.vue')
        },
        chunkNames: {
          top: 'components/adminTop'
        }
      }
      const index5 = routes[indexIndex3].children.findIndex(
        (route) => route.name === 'admin-category-id'
      )
      routes[indexIndex3].children[index5] = {
        ...routes[indexIndex3].children[index5],
        components: {
          default: routes[indexIndex3].children[index5].component,
          top: resolve(__dirname, 'components/adminTop.vue')
        },
        chunkNames: {
          top: 'components/adminTop'
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
  modules: [
    '@nuxtjs/style-resources',
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    '@nuxtjs/toast',
    'bootstrap-vue/nuxt'
  ],
  axios: {
    baseURL: BASE_URL
  },
  toast: {
    position: 'top-center',
    register: [
      // Register custom toasts
      {
        name: 'my-error',
        message: 'Oops...Something went wrong',
        options: {
          type: 'error'
        }
      }
    ]
  },
  styleResources: {
    scss: ['~assets/variables.scss']
  },
  auth: {
    redirect: {
      login: '/auth/sign-in',
      logout: '/auth/sign-in',
      home: '/'
    },
    strategies: {
      local: {
        endpoints: {
          login: {
            url: '/users/login',
            method: 'post'
          },
          logout: {
            url: '/users/logout',
            method: 'post'
          },
          user: {
            url: '/users/me',
            method: 'get'
          }
        }
      }
    }
  },
  build: {
    babel: {
      plugins: ['@babel/plugin-proposal-optional-chaining']
    }
  },
  server: {
    port: 9000,
    host: '0.0.0.0'
  }
}
