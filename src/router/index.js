import Vue from 'vue'
import VueRouter from 'vue-router'
import PostCreation from '../views/PostCreation.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'PostCreation',
    component: PostCreation
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
