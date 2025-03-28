import { createRouter, createWebHistory } from './vue-router'
import {RouteRecordRaw} from 'vue-router'
import WebOffline from "./web-offline"
import WebPath from "./web"


const offline = process.env.VUE_APP_OFFLINE_MODE==='1'
let routes: Array<RouteRecordRaw> = []

if( offline ){
  routes = WebOffline
} else {
  routes = WebPath 
}

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL??'/'),
  routes
})

router.beforeEach((to, from, next) => {
  // let test = document.title
  // document.title = "test"
  // test = "test"
  // console.log(`==== `, {test, to})
  // document.title = to.meta?.title ?? 'Default Title' as string
  next();
})

export default router
