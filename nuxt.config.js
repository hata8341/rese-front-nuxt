const ENV = require('dotenv').config().parsed;
export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'rese-frontend',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/css/reset.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '@/plugins/vee-validate.js' },
    {
      src: '@/plugins/plugin',
      mode:'client'
    },
    { src: '@/plugins/main.js'}
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/moment'
  ],

  moment: {
  locales: ['ja']
},

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    'nuxt-fontawesome'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  env:ENV,
  axios: {
    baseURL:ENV.API_BASE_URL,
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },
  auth: {
    redirect: {
        login: '/login',
        logout: '/login',
        callback: false,
        home: '/'
    },
    strategies: {
      "laravelJWT": {
        provider:'laravel/jwt',
        url: 'auth',
        token: {
          property: 'access_token',
          maxAge: 60*60
        },
        refreshToken: {
          property: 'access_token',
          maxAge:20160*60
        },
        endpoints: {
          login: { url: '/login', method: 'post', propertyName: 'access_token' },
          logout: { url: '/logout', method: 'post' },
          refresh: { url: '/refresh', method: 'post' , propertyName: 'access_token'},
          user: {
            url: '/user', method: 'get',
            propertyName: false
          },
      }
      },
    },

  },
  fontawesome: {
    imports: [
      {
        set: '@fortawesome/free-solid-svg-icons',
        icons: ['fas'],
      },
    ],
  },
}
