import { createRouter, createWebHashHistory } from 'vue-router'
import Description from '../views/Description.vue'

const routes = [
  {
    path: '/',
    name: 'Description',
    component: Description
  },
  {
    path: '/calendarExercise',
    name: 'CalendarExercise',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/CalendarExercise.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
