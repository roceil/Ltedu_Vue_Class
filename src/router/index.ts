import { createWebHistory, createRouter } from 'vue-router'
import HomeView from '../views/Home.vue'


export const routes = [
  {
    name: 'Home',
    path: '/',
    component: HomeView,
  },
  {
    name: 'Ref',
    path: '/ref',
    component: () => import('../views/Ref.vue'),
  },
  {
    name: 'Bind',
    path: '/bind',
    component: () => import('../views/Bind.vue'),
  },
  {
    name: 'Computed',
    path: '/computed',
    component: () => import('../views/Computed.vue'),
  },
  {
    name: 'Watch',
    path: '/watch',
    component: () => import('../views/Watch.vue'),
  },
  {
    name: 'For',
    path: '/for',
    component: () => import('../views/For.vue'),
  },
  {
    name: 'If',
    path: '/if',
    component: () => import('../views/If.vue'),
  },
  {
    name: 'LifeCycle',
    path: '/life-cycle',
    component: () => import('../views/LifeCycle.vue'),
  },
]


// const routes = [
//   { path: '/', component: HomeView },
//   { path: '/ref', component: () => import('../views/Ref.vue') },
//   { path: '/computed', component: () => import('../views/Computed.vue') },
//   { path: '/watch', component: () => import('../views/Watch.vue') },
//   { path: '/for', component: () => import('../views/For.vue') },
//   { path: '/if', component: () => import('../views/If.vue') },
//   { path: '/life-cycle', component: () => import('../views/LifeCycle.vue') },
// ]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})