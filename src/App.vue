<script setup lang="ts">
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Sidebar from './views/Admin/Sidebar.vue'

const route = useRoute()

// Rutas públicas
const rutasPublicas = ['inicio', 'login', 'register']

// Detecta si es una ruta del admin
const esAdmin = computed(() => route.path?.startsWith('/admin') ?? false)

const esPublica = computed(() => rutasPublicas.includes(route.name as string))
</script>

<template>
  <router-view />
</template>

<script setup lang="ts"></script>



<style scoped>
.admin-layout {
  display: flex;
  flex-direction: row;
  min-height: 100vh;
  background-color: #f8f9fc;
}

.admin-layout>.router-view {
  flex: 1;
  padding: 2rem;
}
</style>
