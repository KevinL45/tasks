import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CreateTaskViewView from '@/views/CreateTaskView.vue'
import AffectationView from '@/views/AffectationView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path:'/createtask',
    name:'createtask',
    component: CreateTaskViewView
  },
  {
    path:'/affectation',
    name:'affectation',
    component : AffectationView

  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
