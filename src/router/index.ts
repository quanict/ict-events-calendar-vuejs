import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import YearView from '@/views/YearView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'year',
    component: YearView
  },
  {
    path: '/year',
    name: 'year',
    component: YearView
  },
  {
    path: '/month',
    name: 'month',
    component: () => import(/* webpackChunkName: "about" */ '../views/MonthView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
