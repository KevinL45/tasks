import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CreateTaskViewView from '@/views/CreateTaskView.vue'
import AffectTask from '@/views/AffectTask.vue'

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
    path:'/affecttask',
    name:'affecttask',
    component : AffectTask

  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
