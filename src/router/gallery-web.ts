import GalleryView from '@/views/pages/GalleryView.vue'
import LearnDashboardView from '@/views/learn/DashboardView.vue'

export default [
    { path: '/', name: 'home', redirect: { name: 'gallery.default' } },
    {
        path: '/photos', name: 'gallery.default', component: GalleryView,

        children: [
            { path: '/:day', component: GalleryView, name: 'gallery.day' },
        ]
    },
    {
        path: '/learn', name: 'student.learn', component: LearnDashboardView,
    }
]