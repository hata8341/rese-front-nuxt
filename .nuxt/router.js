import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _41104852 = () => interopDefault(import('../pages/done.vue' /* webpackChunkName: "pages/done" */))
const _49940664 = () => interopDefault(import('../pages/login.vue' /* webpackChunkName: "pages/login" */))
const _c2e09a60 = () => interopDefault(import('../pages/mypage.vue' /* webpackChunkName: "pages/mypage" */))
const _1f24c7f8 = () => interopDefault(import('../pages/register.vue' /* webpackChunkName: "pages/register" */))
const _151e785e = () => interopDefault(import('../pages/thanks.vue' /* webpackChunkName: "pages/thanks" */))
const _a86bfede = () => interopDefault(import('../pages/detail/_id.vue' /* webpackChunkName: "pages/detail/_id" */))
const _7fec634d = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/done",
    component: _41104852,
    name: "done"
  }, {
    path: "/login",
    component: _49940664,
    name: "login"
  }, {
    path: "/mypage",
    component: _c2e09a60,
    name: "mypage"
  }, {
    path: "/register",
    component: _1f24c7f8,
    name: "register"
  }, {
    path: "/thanks",
    component: _151e785e,
    name: "thanks"
  }, {
    path: "/detail/:id?",
    component: _a86bfede,
    name: "detail-id"
  }, {
    path: "/",
    component: _7fec634d,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
