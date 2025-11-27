import { createRouter, createWebHistory } from 'vue-router'
import Inicio from '../views/Inicio.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Admin from '../views/Admin/Admin.vue'
import Dashboard from '../views/Admin/Dashboard.vue'
import Usuarios from '../views/Admin/Usuarios.vue'
// @ts-ignore: no declaration file for .vue modules
import TablaNoticias from '../components/admin/TablaNoticias.vue'
import NoticiaDetalle from '../views/NoticiaDetalle.vue'

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
    path: '/:slug',
    name: 'noticia',
    component: NoticiaDetalle
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
        path: 'noticias',
        name: 'noticias',
        component: TablaNoticias
      },
      {
        path: 'usuarios',
        name: 'usuarios',
        component: Usuarios
      },
      {
        path: 'dashboard',
        name: 'dashboard',
        component: Dashboard
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
