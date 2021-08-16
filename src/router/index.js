/**
 * Vue Router
 *
 * @library
 *
 * https://router.vuejs.org/en/
 */

// Lib imports
import Vue from 'vue'
import VueRouter from 'vue-router'

// Routes
import paths from './paths'

Vue.use(VueRouter)

const router = new VueRouter({
  routes : paths
  // mode: 'history'
})

export default router
