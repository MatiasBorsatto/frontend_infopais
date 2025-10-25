import { createRouter, createWebHistory } from 'vue-router'
import Inicio from '../views/Inicio.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'

// Definís las rutas de tu aplicación
const routes = [
  {
    path: '/',             // URL
    name: 'inicio',          // Nombre de la ruta
    component: Inicio    // Vista que se mostrará
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
  }
]

// Creás la instancia del router
const router = createRouter({
  history: createWebHistory(), // Usa el modo "histórico" (sin # en la URL)
  routes                        // Array de rutas
})

// Exportás para usarlo en main.js
export default router
