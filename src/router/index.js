import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Message from '../pages/Message.vue'
import Notification from '../pages/Notification.vue'
import Profile from '../pages/Profile.vue'

const routes = [
    { path: '/', component: Home, title: '홈', icon: 'fa-solid fa-house-chimney fa-fw text-2xl lg:mr-2', meta: { isMenu: true, layout: 'AfterLogin'} },
    { path: '/message', component: Message, title: '메시지', icon: 'fa-regular fa-envelope fa-fw text-2xl lg:mr-2', meta: { isMenu: true, layout: 'AfterLogin'}  },
    { path: '/Notification', component: Notification, title: '알람', icon: 'fa-solid fa-bell fa-fw text-2xl lg:mr-2', meta: { isMenu: true, layout: 'AfterLogin'}  },
    { path: '/Profile', component: Profile, title: '알람', icon: 'fa-solid fa-bell fa-fw text-2xl lg:mr-2', meta: { isMenu: false, layout: 'AfterLogin' }},
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router