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
const esAdmin = computed(() => route.path.startsWith('/admin'))
const esPublica = computed(() => rutasPublicas.includes(route.name as string))
</script>

<template>
  <!-- Layout público -->
  <div v-if="esPublica">
    <Navbar />
    <router-view />
    <Footer />
  </div>

  <!-- Layout de administración -->
  <div v-if="esAdmin" class="admin-layout">
    <Sidebar />
    <router-view />
  </div>
</template>

<style scoped>
.admin-layout {
  display: flex;
  min-height: 100vh;
}
</style>
