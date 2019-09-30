import colors from 'vuetify/es5/util/colors'
import webpack from 'webpack'

export default {
  server: {
    port: 3333, // default: 3000
    host: '127.0.0.1', // default: localhost
  },
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: 'HRIS - %s',
    title: 'HRIS',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons'
      }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
  ],
  
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: "~/plugins/chart", ssr: false },
    { src: "~/plugins/jsonToExcel", ssr: false },
    { src: "~/plugins/apexchart", ssr: false},
    "~/plugins/axios",
    "~/plugins/mixins/auth",
    "~/plugins/mixins/user",
    "~/plugins/mixins/role",
    "~/plugins/mixins/branch",
    "~/plugins/mixins/department",
    "~/plugins/mixins/leave",
    "~/plugins/mixins/overtime",
    "~/plugins/mixins/trip",
    "~/plugins/mixins/coe",
    "~/plugins/mixins/validation"
  ],

  buildModules: [
    '@nuxtjs/vuetify',
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    'vue-sweetalert2/nuxt'
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    baseURL: 'http://hris-api.test/api'
  },

  auth: {
    redirect: {
      login: '/'
    },
    strategies: {
      local: {
        endpoints: {
          login: {
            url: '/auth/login',
            method: 'post',
            propertyName: "meta.token"
          },
          user: {
            url: '/auth/me',
            method: 'get',
            propertyName: 'data'
          },
          logout: {
            url: '/auth/logout',
            method: 'post'
          }
        }
      }
    }
  },
  /*
  ** vuetify module configuration
  ** https://github.com/nuxt-community/vuetify-module
  */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken4,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.yellow.darken2,
          error: colors.red.darken4,
          success: colors.green.accent3
        }
      }
    },
  },
  /*
  ** Build configuration
  */
  build: {
    build: {
      plugins: [
        new webpack.ProvidePlugin({
          '_': 'lodash'
        })
      ]
    },
    extend(config, ctx) {
    }
  }
}
