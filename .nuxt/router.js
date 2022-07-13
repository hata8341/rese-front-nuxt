import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _f9904430 = () => interopDefault(import('../pages/done.vue' /* webpackChunkName: "pages/done" */))
const _1dd44673 = () => interopDefault(import('../pages/login.vue' /* webpackChunkName: "pages/login" */))
const _525774a1 = () => interopDefault(import('../pages/mypage.vue' /* webpackChunkName: "pages/mypage" */))
const _00035989 = () => interopDefault(import('../pages/register.vue' /* webpackChunkName: "pages/register" */))
const _6e338ba2 = () => interopDefault(import('../pages/thanks.vue' /* webpackChunkName: "pages/thanks" */))
const _616b1c3c = () => interopDefault(import('../pages/detail/_id.vue' /* webpackChunkName: "pages/detail/_id" */))
const _542ca35c = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

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
    component: _f9904430,
    name: "done"
  }, {
    path: "/login",
    component: _1dd44673,
    name: "login"
  }, {
    path: "/mypage",
    component: _525774a1,
    name: "mypage"
  }, {
    path: "/register",
    component: _00035989,
    name: "register"
  }, {
    path: "/thanks",
    component: _6e338ba2,
    name: "thanks"
  }, {
    path: "/detail/:id?",
    component: _616b1c3c,
    name: "detail-id"
  }, {
    path: "/",
    component: _542ca35c,
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
