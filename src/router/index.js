import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Search from '../pages/Search.vue'
import Message from '../pages/Message.vue'
import Notification from '../pages/Notification.vue'
import Profile from '../pages/Profile.vue'
import PostContent from '../pages/PostContent.vue'
import CenterPosts from '../pages/CenterPosts.vue'
import Register from '../pages/Register.vue'
import Login from '../pages/Login.vue'
import store from '../store'

const routes = [
    { path: '/', name: 'home', component: Home, title: '홈', icon: 'fa-solid fa-house-chimney fa-fw text-2xl lg:mr-2', meta: { isMenu: true, layout: 'AfterLogin', requireAuth: true} },
    { path: '/search', name: 'search', component: Search, title: '검색', icon: 'fa-solid fa-magnifying-glass text-2xl lg:mr-2', meta: { isMenu: true, layout: 'AfterLogin', requireAuth: true} },
    { path: '/message', name: 'messages', component: Message, title: '메시지', icon: 'fa-solid fa-message fa-fw text-2xl lg:mr-2', meta: { isMenu: false, layout: 'AfterLogin', requireAuth: true} },
    { path: '/notification', name: 'notifications', component: Notification, title: '알람', icon: 'fa-solid fa-bell fa-fw text-2xl lg:mr-2', meta: { isMenu: true, layout: 'AfterLogin', requireAuth: true} },
    { path: '/profile', name: 'profile', component: Profile, title: '프로필', icon: 'fa-solid fa-user fa-fw text-2xl lg:mr-2', meta: { isMenu: true, layout: 'AfterLogin', requireAuth: true }},
    { path: '/post/:id', name: 'postcontent', component: PostContent, meta: { isMenu: false, layout: 'AfterLogin', requireAuth: true }},
    { path: '/profile/:uid', component: Profile, meta: { isMenu: false, layout: 'AfterLogin', requireAuth: true }},
    { path: '/center/:id', component: CenterPosts, meta: { isMenu: false, layout: 'AfterLogin', requireAuth: true }},
    { path: '/register', component: Register, meta: { isMenu: false, layout: 'BeforeLogin', requireAuth: false }},
    { path: '/login', component: Login, meta: { isMenu: false, layout: 'BeforeLogin', requireAuth: false }},
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to, from, next) => {
    const currentUser = store.state.user
    const requireAuth = to.matched.some((record) => record.meta.requireAuth)
    // not authenticated
    if (requireAuth && !currentUser) next('/login')

    // authenticated
    else next()
})

export default router