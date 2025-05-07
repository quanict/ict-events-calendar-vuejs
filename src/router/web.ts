import YearView from '@/views/pages/YearView.vue'
import MonthView from '@/views/pages/MonthView.vue'
import DayView from '@/views/pages/DayView.vue'
import EventPage from '@/views/pages/EventPage.vue'


export default [
    { path: '/', name: 'home', redirect: { name: 'year.default' }  },
    { 
        path: '/year',  name: 'year.default', component: YearView ,
        meta: {
            title: 'Year',
        },
        children: [
            { path: '/:year', component: YearView, name: 'year' },
        ]
    },
    { 
        path: '/month',  name: 'month.default', component: MonthView ,
        meta: {
            title: 'Year',
        },
        children: [
            { path: '/:month', component: MonthView, name: 'month' },
        ]
    },
    { 
        path: '/day',  name: 'day.default', component: DayView,
        children: [
            { path: '/:day', component: DayView, name: 'day' },
        ]
    },
    { 
        path: '/events',  name: 'event.items', component: EventPage,
    },
] 