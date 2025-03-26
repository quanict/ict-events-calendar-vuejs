// import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory, RouteRecordRaw } from '@/modules/vue-router'

import YearView from '@/views/YearView.vue'
import MonthView from '@/views/MonthView.vue'
import DayView from '@/views/DayView.vue'
import OfflineView from '@/views/OfflineView.vue'

const offline = process.env.VUE_APP_OFFLINE_MODE==='1'
let routes: Array<RouteRecordRaw> = []

if( offline ){
  routes = [
    { path: '/', component: OfflineView, name: 'home' },
    { path: '/', component: OfflineView, name: 'year-current' },
    { path: '/', component: OfflineView, name: 'year' },
    { path: '/', component: OfflineView, name: 'month-current' },
    { path: '/', component: OfflineView, name: 'month' },
    { path: '/', component: OfflineView, name: 'day-current' },
    { path: '/', component: OfflineView, name: 'day' },
  ]
} else {
  routes = [
    { path: '/', name: 'home', component: YearView },
    { path: '/year', name: 'year-current', component: YearView },
    { path: '/year/:year', name: 'year', component: YearView },
    { path: '/month/',  name: 'month-current', component: MonthView },
    { path: '/month/:month', name: 'month', component: () => import('../views/MonthView.vue') },
    { path: '/day',  name: 'day-current', component: DayView },
    { path: '/day/:day',  name: 'day', component: DayView },
  ]  
}

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  offlineModel:offline,
  routes
})

export default router
