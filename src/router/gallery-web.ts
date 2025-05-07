import GalleryView from '@/views/pages/GalleryView.vue'

export default [
    { path: '/', name: 'home', redirect: { name: 'gallery.default' } },
    {
        path: '/photos', name: 'gallery.default', component: GalleryView,

        children: [
            { path: '/:day', component: GalleryView, name: 'gallery.day' },
        ]
    }
]