import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { createPinia } from 'pinia'
import axios from 'axios'
import './assets/main.css'
import App from './App.vue'
import MainPage from '@/pages/MainPage.vue'
import LoginPage from '@/pages/LoginPage.vue'
import AuthCallbackPage from '@/pages/AuthCallbackPage.vue'
import { useAuthStore } from '@/store/authStore.js'
import NotFoundPage from '@/pages/NotFoundPage.vue'
import EventsPage from '@/pages/EventsPage.vue'
import NewsPage from '@/pages/NewsPage.vue'
import CreateEventPage from '@/pages/CreateEventPage.vue'

axios.defaults.baseURL = 'http://localhost'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: MainPage },
        { path: '/events', component: EventsPage },
        { path: '/events/create', component: CreateEventPage },
        { path: '/news', component: NewsPage },
        { path: '/login', component: LoginPage },
        { path: '/auth/callback', component: AuthCallbackPage },
        { path: '/:path(.*)*', component: NotFoundPage },
    ],
})

router.beforeEach((to, from, next) => {
    let permittedPaths = ['/login', '/auth/callback']
    if (permittedPaths.includes(to.path)) {
        next()
        return
    }
    const authStore = useAuthStore()
    authStore
        .checkToken()
        .then(() => {
            console.log('then')
            next()
        })
        .catch(() => {
            console.log('catch')
            next('/login')
        })
})

const pinia = createPinia()

createApp(App)
    .use(router)
    .use(pinia)
    .mount('#app')
