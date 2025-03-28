import YearView from '@/views/YearView.vue'
import MonthView from '@/views/MonthView.vue'
import DayView from '@/views/DayView.vue'

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
] 