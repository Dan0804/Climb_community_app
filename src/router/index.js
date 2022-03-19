import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Message from '../pages/Message.vue'
import Notification from '../pages/Notification.vue'
import Profile from '../pages/Profile.vue'
import Register from '../pages/Register.vue'
import Login from '../pages/Login.vue'

const routes = [
    { path: '/', component: Home, title: '홈', icon: 'fa-solid fa-house-chimney fa-fw text-2xl lg:mr-2', meta: { isMenu: true, layout: 'AfterLogin'} },
    { path: '/message', component: Message, title: '메시지', icon: 'fa-regular fa-envelope fa-fw text-2xl lg:mr-2', meta: { isMenu: true, layout: 'AfterLogin'}  },
    { path: '/notification', component: Notification, title: '알람', icon: 'fa-solid fa-bell fa-fw text-2xl lg:mr-2', meta: { isMenu: true, layout: 'AfterLogin'}  },
    { path: '/profile', component: Profile, title: '알람', icon: 'fa-solid fa-bell fa-fw text-2xl lg:mr-2', meta: { isMenu: false, layout: 'AfterLogin' }},
    { path: '/register', component: Register, meta: { isMenu: false, layout: 'BeforeLogin' }},
    { path: '/login', component: Login, meta: { isMenu: false, layout: 'BeforeLogin' }},
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router