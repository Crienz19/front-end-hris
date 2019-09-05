import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'

const _1f8d7e9e = () => interopDefault(import('..\\pages\\auth\\activation\\index.vue' /* webpackChunkName: "pages_auth_activation_index" */))
const _522eaca0 = () => interopDefault(import('..\\pages\\auth\\form\\index.vue' /* webpackChunkName: "pages_auth_form_index" */))
const _484789d2 = () => interopDefault(import('..\\pages\\auth\\login\\index.vue' /* webpackChunkName: "pages_auth_login_index" */))
const _4f40e171 = () => interopDefault(import('..\\pages\\auth\\register\\index.vue' /* webpackChunkName: "pages_auth_register_index" */))
const _3064768c = () => interopDefault(import('..\\pages\\em\\dashboard\\index.vue' /* webpackChunkName: "pages_em_dashboard_index" */))
const _d13dbd24 = () => interopDefault(import('..\\pages\\hr\\dashboard\\index.vue' /* webpackChunkName: "pages_hr_dashboard_index" */))
const _7e2717b2 = () => interopDefault(import('..\\pages\\sa\\dashboard\\index.vue' /* webpackChunkName: "pages_sa_dashboard_index" */))
const _240d3056 = () => interopDefault(import('..\\pages\\sup\\dashboard\\index.vue' /* webpackChunkName: "pages_sup_dashboard_index" */))
const _73e34684 = () => interopDefault(import('..\\pages\\em\\filing\\coe-request\\index.vue' /* webpackChunkName: "pages_em_filing_coe-request_index" */))
const _25555b00 = () => interopDefault(import('..\\pages\\em\\filing\\leave-request\\index.vue' /* webpackChunkName: "pages_em_filing_leave-request_index" */))
const _b87971d0 = () => interopDefault(import('..\\pages\\em\\filing\\overtime-request\\index.vue' /* webpackChunkName: "pages_em_filing_overtime-request_index" */))
const _0aab8294 = () => interopDefault(import('..\\pages\\em\\filing\\trip-request\\index.vue' /* webpackChunkName: "pages_em_filing_trip-request_index" */))
const _45bf1ea6 = () => interopDefault(import('..\\pages\\hr\\requests\\coe\\index.vue' /* webpackChunkName: "pages_hr_requests_coe_index" */))
const _f6806ca2 = () => interopDefault(import('..\\pages\\hr\\requests\\leave\\index.vue' /* webpackChunkName: "pages_hr_requests_leave_index" */))
const _0530ab4d = () => interopDefault(import('..\\pages\\hr\\requests\\overtime\\index.vue' /* webpackChunkName: "pages_hr_requests_overtime_index" */))
const _2860b449 = () => interopDefault(import('..\\pages\\hr\\requests\\trip\\index.vue' /* webpackChunkName: "pages_hr_requests_trip_index" */))
const _6af01fae = () => interopDefault(import('..\\pages\\sa\\settings\\branch\\index.vue' /* webpackChunkName: "pages_sa_settings_branch_index" */))
const _12f36bf9 = () => interopDefault(import('..\\pages\\sa\\settings\\department\\index.vue' /* webpackChunkName: "pages_sa_settings_department_index" */))
const _2557dd15 = () => interopDefault(import('..\\pages\\sa\\settings\\role\\index.vue' /* webpackChunkName: "pages_sa_settings_role_index" */))
const _1853f5c8 = () => interopDefault(import('..\\pages\\sa\\timekeeping\\leave-requests\\index.vue' /* webpackChunkName: "pages_sa_timekeeping_leave-requests_index" */))
const _233ffe6e = () => interopDefault(import('..\\pages\\sa\\timekeeping\\overtime-requests\\index.vue' /* webpackChunkName: "pages_sa_timekeeping_overtime-requests_index" */))
const _24401cf2 = () => interopDefault(import('..\\pages\\sa\\timekeeping\\trip-requests\\index.vue' /* webpackChunkName: "pages_sa_timekeeping_trip-requests_index" */))
const _1a56b5ec = () => interopDefault(import('..\\pages\\sup\\filing\\coe\\index.vue' /* webpackChunkName: "pages_sup_filing_coe_index" */))
const _038f4a68 = () => interopDefault(import('..\\pages\\sup\\filing\\leave\\index.vue' /* webpackChunkName: "pages_sup_filing_leave_index" */))
const _8aa0ade0 = () => interopDefault(import('..\\pages\\sup\\filing\\overtime\\index.vue' /* webpackChunkName: "pages_sup_filing_overtime_index" */))
const _6d99e8e8 = () => interopDefault(import('..\\pages\\sup\\filing\\trip\\index.vue' /* webpackChunkName: "pages_sup_filing_trip_index" */))
const _684f0a97 = () => interopDefault(import('..\\pages\\sup\\requests\\leave\\index.vue' /* webpackChunkName: "pages_sup_requests_leave_index" */))
const _60c2e165 = () => interopDefault(import('..\\pages\\sup\\requests\\overtime\\index.vue' /* webpackChunkName: "pages_sup_requests_overtime_index" */))
const _8ed1913e = () => interopDefault(import('..\\pages\\sa\\dashboard\\profile\\_id\\index.vue' /* webpackChunkName: "pages_sa_dashboard_profile__id_index" */))
const _8a75cd04 = () => interopDefault(import('..\\pages\\sa\\timekeeping\\leave-requests\\_id\\index.vue' /* webpackChunkName: "pages_sa_timekeeping_leave-requests__id_index" */))
const _379c236c = () => interopDefault(import('..\\pages\\sa\\timekeeping\\overtime-requests\\_id\\index.vue' /* webpackChunkName: "pages_sa_timekeeping_overtime-requests__id_index" */))
const _2d831130 = () => interopDefault(import('..\\pages\\sa\\timekeeping\\trip-requests\\_id\\index.vue' /* webpackChunkName: "pages_sa_timekeeping_trip-requests__id_index" */))
const _4977439c = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages_index" */))
const _9ae014ae = () => interopDefault(import('..\\pages\\_.vue' /* webpackChunkName: "pages__" */))

Vue.use(Router)

if (process.client) {
  if ('scrollRestoration' in window.history) {
    window.history.scrollRestoration = 'manual'

    // reset scrollRestoration to auto when leaving page, allowing page reload
    // and back-navigation from other pages to use the browser to restore the
    // scrolling position.
    window.addEventListener('beforeunload', () => {
      window.history.scrollRestoration = 'auto'
    })

    // Setting scrollRestoration to manual again when returning to this page.
    window.addEventListener('load', () => {
      window.history.scrollRestoration = 'manual'
    })
  }
}
const scrollBehavior = function (to, from, savedPosition) {
  // if the returned position is falsy or an empty object,
  // will retain current scroll position.
  let position = false

  // if no children detected and scrollToTop is not explicitly disabled
  if (
    to.matched.length < 2 &&
    to.matched.every(r => r.components.default.options.scrollToTop !== false)
  ) {
    // scroll to the top of the page
    position = { x: 0, y: 0 }
  } else if (to.matched.some(r => r.components.default.options.scrollToTop)) {
    // if one of the children has scrollToTop option set to true
    position = { x: 0, y: 0 }
  }

  // savedPosition is only available for popstate navigations (back button)
  if (savedPosition) {
    position = savedPosition
  }

  return new Promise((resolve) => {
    // wait for the out transition to complete (if necessary)
    window.$nuxt.$once('triggerScroll', () => {
      // coords will be used if no selector is provided,
      // or if the selector didn't match any element.
      if (to.hash) {
        let hash = to.hash
        // CSS.escape() is not supported with IE and Edge.
        if (typeof window.CSS !== 'undefined' && typeof window.CSS.escape !== 'undefined') {
          hash = '#' + window.CSS.escape(hash.substr(1))
        }
        try {
          if (document.querySelector(hash)) {
            // scroll to anchor by returning the selector
            position = { selector: hash }
          }
        } catch (e) {
          console.warn('Failed to save scroll position. Please add CSS.escape() polyfill (https://github.com/mathiasbynens/CSS.escape).')
        }
      }
      resolve(position)
    })
  })
}

export function createRouter() {
  return new Router({
    mode: 'history',
    base: decodeURI('/'),
    linkActiveClass: 'nuxt-link-active',
    linkExactActiveClass: 'nuxt-link-exact-active',
    scrollBehavior,

    routes: [{
      path: "/auth/activation",
      component: _1f8d7e9e,
      name: "auth-activation"
    }, {
      path: "/auth/form",
      component: _522eaca0,
      name: "auth-form"
    }, {
      path: "/auth/login",
      component: _484789d2,
      name: "auth-login"
    }, {
      path: "/auth/register",
      component: _4f40e171,
      name: "auth-register"
    }, {
      path: "/em/dashboard",
      component: _3064768c,
      name: "em-dashboard"
    }, {
      path: "/hr/dashboard",
      component: _d13dbd24,
      name: "hr-dashboard"
    }, {
      path: "/sa/dashboard",
      component: _7e2717b2,
      name: "sa-dashboard"
    }, {
      path: "/sup/dashboard",
      component: _240d3056,
      name: "sup-dashboard"
    }, {
      path: "/em/filing/coe-request",
      component: _73e34684,
      name: "em-filing-coe-request"
    }, {
      path: "/em/filing/leave-request",
      component: _25555b00,
      name: "em-filing-leave-request"
    }, {
      path: "/em/filing/overtime-request",
      component: _b87971d0,
      name: "em-filing-overtime-request"
    }, {
      path: "/em/filing/trip-request",
      component: _0aab8294,
      name: "em-filing-trip-request"
    }, {
      path: "/hr/requests/coe",
      component: _45bf1ea6,
      name: "hr-requests-coe"
    }, {
      path: "/hr/requests/leave",
      component: _f6806ca2,
      name: "hr-requests-leave"
    }, {
      path: "/hr/requests/overtime",
      component: _0530ab4d,
      name: "hr-requests-overtime"
    }, {
      path: "/hr/requests/trip",
      component: _2860b449,
      name: "hr-requests-trip"
    }, {
      path: "/sa/settings/branch",
      component: _6af01fae,
      name: "sa-settings-branch"
    }, {
      path: "/sa/settings/department",
      component: _12f36bf9,
      name: "sa-settings-department"
    }, {
      path: "/sa/settings/role",
      component: _2557dd15,
      name: "sa-settings-role"
    }, {
      path: "/sa/timekeeping/leave-requests",
      component: _1853f5c8,
      name: "sa-timekeeping-leave-requests"
    }, {
      path: "/sa/timekeeping/overtime-requests",
      component: _233ffe6e,
      name: "sa-timekeeping-overtime-requests"
    }, {
      path: "/sa/timekeeping/trip-requests",
      component: _24401cf2,
      name: "sa-timekeeping-trip-requests"
    }, {
      path: "/sup/filing/coe",
      component: _1a56b5ec,
      name: "sup-filing-coe"
    }, {
      path: "/sup/filing/leave",
      component: _038f4a68,
      name: "sup-filing-leave"
    }, {
      path: "/sup/filing/overtime",
      component: _8aa0ade0,
      name: "sup-filing-overtime"
    }, {
      path: "/sup/filing/trip",
      component: _6d99e8e8,
      name: "sup-filing-trip"
    }, {
      path: "/sup/requests/leave",
      component: _684f0a97,
      name: "sup-requests-leave"
    }, {
      path: "/sup/requests/overtime",
      component: _60c2e165,
      name: "sup-requests-overtime"
    }, {
      path: "/sa/dashboard/profile/:id?",
      component: _8ed1913e,
      name: "sa-dashboard-profile-id"
    }, {
      path: "/sa/timekeeping/leave-requests/:id?",
      component: _8a75cd04,
      name: "sa-timekeeping-leave-requests-id"
    }, {
      path: "/sa/timekeeping/overtime-requests/:id?",
      component: _379c236c,
      name: "sa-timekeeping-overtime-requests-id"
    }, {
      path: "/sa/timekeeping/trip-requests/:id?",
      component: _2d831130,
      name: "sa-timekeeping-trip-requests-id"
    }, {
      path: "/",
      component: _4977439c,
      name: "index"
    }, {
      path: "/*",
      component: _9ae014ae,
      name: "all"
    }],

    fallback: false
  })
}
