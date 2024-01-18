import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import ProductsView from '@/views/ProductsView.vue'
import ErrorView from '@/views/ErrorView.vue'

const routes = [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
        path: '/products',
        name: 'products',
        component: ProductsView
      },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'error',
        component: ErrorView
      }
  ]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router