import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import YearView from '@/views/YearView.vue'
import MonthView from '@/views/MonthView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'year',
    component: YearView
  },
  {
    path: '/year', name: 'year-current',
    component: YearView
  },
  {
    path: '/year/:year', name: 'year',
    component: YearView
  },
  {
    path: '/month/',  name: 'month-current',
    component: MonthView
  },
  {
    path: '/month/:month', name: 'month',
    component: () => import('../views/MonthView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
