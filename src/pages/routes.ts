import {createRouter} from 'vue-router'

import BookingPage from './booking/Booking.vue';

const routes = [
    {
        path: '/',
        component: BookingPage
    }
]

export default function (history: any) {
    return createRouter({
      history,
      routes
    })
}