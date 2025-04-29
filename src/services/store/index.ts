import { createStore } from 'vuex'
import photos from "./photos.module";
import photoModal from "./photo-modal.module";
import notification from "./notification.module";

export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    notification,
    photos,
    photoModal
  }
})
