import { createRouter, createWebHistory } from './vue-router'
import { RouteRecordRaw } from 'vue-router'
import WebCalendarOffline from "./web-offline"
import WebCalendarPath from "./web"
import GalleryPath from "./gallery-web"
import { APP_TYPE, IS_CALANDER, IS_GALLERY } from "@/configs/app"

const offline = process.env.VUE_APP_OFFLINE_MODE === '1'
let routes: Array<RouteRecordRaw> = []

if (IS_CALANDER) {
  routes = offline ? WebCalendarOffline : WebCalendarPath;
} else if (IS_GALLERY) {
  routes = GalleryPath;
}

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL ?? '/'),
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
