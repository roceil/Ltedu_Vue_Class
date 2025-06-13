import { createWebHistory, createRouter } from 'vue-router'
import HomeView from '../views/home.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/computed', component: () => import('../views/computed.vue') },
  { path: '/watch', component: () => import('../views/watch.vue') },
  { path: '/for', component: () => import('../views/for.vue') },
  { path: '/if', component: () => import('../views/if.vue') },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})