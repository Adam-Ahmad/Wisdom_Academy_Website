import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const routes = [
  { path: '/', component: () => import('../components/pages/Home.vue'), meta: { layout: 'public' } },
  { path: '/about', component: () => import('../components/pages/About.vue'), meta: { layout: 'public' } },
  { path: '/register', component: () => import('../components/pages/Register.vue'), meta: { layout: 'public' } },
  { path: '/login', component: () => import('../components/pages/Login.vue'), meta: { layout: 'auth' } },
  {
    path: '/admin',
    component: () => import('../components/layout/AdminLayout.vue'),
    meta: { layout: 'admin', requiresAuth: true, role: 'admin' },
    children: [
      { path: '', component: () => import('../components/pages/admin/Dashboard.vue') },
      { path: 'news', component: () => import('../components/pages/admin/ManageNews.vue') },
      { path: 'registrations', component: () => import('../components/pages/admin/ManageRegistrations.vue') }
    ]
  }
]

const router = createRouter({ history: createWebHistory(), routes })

router.beforeEach((to, from, next) => {
  const auth = useAuthStore()
  if (to.meta.requiresAuth && !auth.isAuthenticated) return next('/login')
  if (to.meta.role && auth.user?.role !== to.meta.role) return next('/')
  next()
})

export default router