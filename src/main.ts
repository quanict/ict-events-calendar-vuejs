import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import * as Vue from 'vue' // in Vue 3
import axios from 'axios'
import VueAxios from 'vue-axios'

import "./assets/styles/app.scss"

// app.use(VueAxios, axios)

createApp(App)
 .use(VueAxios, axios)
.use(store)
.use(router)
.mount('#app')
