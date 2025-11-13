import { createRouter, createWebHistory } from 'vue-router'
import Inicio from '../views/Inicio.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Admin from '../views/Admin/Admin.vue'
import CrearNoticia from '../views/Admin/CrearNoticia.vue'
import Dashboard from '../views/Admin/Dashboard.vue'
import Usuarios from '../views/Admin/Usuarios.vue'

const routes = [
  {
    path: '/',
    name: 'inicio',
    component: Inicio
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/admin',
    component: Admin,
    children: [
      {
        path: '',
        name: 'admin',
        component: Dashboard
      },
      {
        path: 'crear-noticia',
        name: 'crear-noticia',
        component: CrearNoticia
      },
      {
        path: 'usuarios',
        name: 'usuarios',
        component: Usuarios
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
