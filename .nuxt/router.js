import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _ce009590 = () => interopDefault(import('../pages/done.vue' /* webpackChunkName: "pages/done" */))
const _7df14dba = () => interopDefault(import('../pages/login.vue' /* webpackChunkName: "pages/login" */))
const _1586b7f1 = () => interopDefault(import('../pages/mypage.vue' /* webpackChunkName: "pages/mypage" */))
const _9721ee4e = () => interopDefault(import('../pages/register.vue' /* webpackChunkName: "pages/register" */))
const _e7d50502 = () => interopDefault(import('../pages/thanks.vue' /* webpackChunkName: "pages/thanks" */))
const _17878d32 = () => interopDefault(import('../pages/detail/_id.vue' /* webpackChunkName: "pages/detail/_id" */))
const _114093e8 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

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
    component: _ce009590,
    name: "done"
  }, {
    path: "/login",
    component: _7df14dba,
    name: "login"
  }, {
    path: "/mypage",
    component: _1586b7f1,
    name: "mypage"
  }, {
    path: "/register",
    component: _9721ee4e,
    name: "register"
  }, {
    path: "/thanks",
    component: _e7d50502,
    name: "thanks"
  }, {
    path: "/detail/:id?",
    component: _17878d32,
    name: "detail-id"
  }, {
    path: "/",
    component: _114093e8,
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
