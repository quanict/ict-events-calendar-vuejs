import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './services/store'
import * as Vue from 'vue' // in Vue 3
import axios from 'axios'
import VueAxios from 'vue-axios'

import "./assets/styles/app.scss"

axios.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

createApp(App)
.use(VueAxios, axios)
.use(store)
.use(router)
.mount('#app')
