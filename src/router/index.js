import { createRouter, createWebHistory } from 'vue-router'

const routes = [

  {
    path: '/',
    name: 'home',
    meta: { role: "0" }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginView.vue')
  },
  {
    path: '/doctor',
    name: 'doctor',
    component: () => import('@/views/DoctorWindowView.vue'),
    meta: { role: "doctor" }
  },
  {
    path: '/coordinator',
    name: 'coordinator',
    component: () => import('@/views/CoordinatorWindowView.vue'),
    meta: { role: "coordinator" }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to) => {
  if ( to.meta.role && !(JSON.parse(localStorage.getItem('userAuthData')).role === to.meta.role) ) {
    return {
      path: '/login',
    }
  }
})
export default router
