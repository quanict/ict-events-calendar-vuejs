import GalleryView from '@/views/GalleryView.vue'

export default [
    { path: '/', name: 'home', redirect: { name: 'gallery.default' }  },
    { 
        path: '/photos',  name: 'gallery.default', component: GalleryView ,
    }
]