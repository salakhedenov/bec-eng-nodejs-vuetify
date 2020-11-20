import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    meta: {
      auth: true,
      layout: 'main'
    },
    component: () => import('../views/Profile.vue')
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      layout: 'empty'
    },
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    meta: {
      layout: 'empty'
    },
    component: () => import('../views/Register.vue')
  },
  {
    path: '/timesheet',
    name: 'timesheet',
    meta: {
      layout: 'main', auth: true
    },
    component: () => import('../views/Timesheet.vue')
  },
  {
    path: '/projects',
    name: 'projects',
    meta: {
      layout: 'main', auth: true
    },
    component: () => import('../views/Projects.vue')
  },
  {
    path: '/projects/:id',
    name: 'detail',
    meta: {
      layout: 'main', auth: true
    },
    component: () => import('../views/ProjectDetail.vue')
  },
  {
    path: '/drawings',
    name: 'drawings',
    meta: {
      layout: 'main', auth: true
    },
    component: () => import('../views/Drawings.vue')
  },
  {
    path: '/users',
    name: 'users',
    meta: {
      layout: 'main',
      auth: true
    },
    component: () => import('../views/Users.vue')
  },
  {
    path: '/users/:id/drawings',
    name: 'userDrawings',
    meta: {
      layout: 'main',
      auth: true
    },
    component: () => import('../views/UserDrawings.vue')
  },
  {
    path: '/users/:id/timesheets',
    name: 'userTimesheets',
    meta: {
      layout: 'main',
      auth: true
    },
    component: () => import('../views/UserTimesheets.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const currentUser = localStorage.getItem('uid')
  const requireAuth = to.meta.auth

  if (requireAuth && !currentUser) {
    next('/login?message=login')
  } else {
    next()
  }
})

export default router
