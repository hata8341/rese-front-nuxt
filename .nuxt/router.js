import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _5b807615 = () => interopDefault(import('../pages/done.vue' /* webpackChunkName: "pages/done" */))
const _4e9eb3e6 = () => interopDefault(import('../pages/login.vue' /* webpackChunkName: "pages/login" */))
const _3adab58e = () => interopDefault(import('../pages/mypage.vue' /* webpackChunkName: "pages/mypage" */))
const _568bd994 = () => interopDefault(import('../pages/register.vue' /* webpackChunkName: "pages/register" */))
const _9d2d09c8 = () => interopDefault(import('../pages/thanks.vue' /* webpackChunkName: "pages/thanks" */))
const _5139744f = () => interopDefault(import('../pages/detail/_id.vue' /* webpackChunkName: "pages/detail/_id" */))
const _f611de62 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

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
    component: _5b807615,
    name: "done"
  }, {
    path: "/login",
    component: _4e9eb3e6,
    name: "login"
  }, {
    path: "/mypage",
    component: _3adab58e,
    name: "mypage"
  }, {
    path: "/register",
    component: _568bd994,
    name: "register"
  }, {
    path: "/thanks",
    component: _9d2d09c8,
    name: "thanks"
  }, {
    path: "/detail/:id?",
    component: _5139744f,
    name: "detail-id"
  }, {
    path: "/",
    component: _f611de62,
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
