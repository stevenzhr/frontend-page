import { createRouter, createWebHistory } from 'vue-router'
import Layout from '../layout/Layout.vue'

const routes = [
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    redirect: '/devices',
    children: [
      {
        path: 'devices',
        name: 'Devices',
        component: () => import("@/views/Devices"),
      },
      {
        path: 'automations',
        name: 'Automations',
        component: () => import("@/views/Automations"),
      }
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import("@/views/Login")
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import("@/views/Register")
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
