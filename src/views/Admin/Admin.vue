<template>
    <div class="app-container">
        <!-- Mobile: Botón Hamburguesa -->
        <Button icon="pi pi-bars" @click="sidebarVisible = true"
            class="lg:!hidden fixed top-4 left-4 z-50 bg-white shadow-lg" text rounded />

        <!-- Desktop: Sidebar fijo -->
        <aside class="hidden lg:flex sidebar-desktop">
            <Sidebar />
        </aside>

        <!-- Mobile: Drawer -->
        <Drawer v-model:visible="sidebarVisible" position="left" class="lg:hidden">
            <Sidebar @close="sidebarVisible = false" />
        </Drawer>

        <!-- Contenido principal -->
        <main class="main-content">
            <router-view />
        </main>
    </div>
</template>

<script setup lang="ts">

import { ref } from 'vue'
import Drawer from 'primevue/drawer'
import Button from 'primevue/button'
import Sidebar from './Sidebar.vue'

const sidebarVisible = ref(false)
</script>

<style scoped>
.app-container {
    display: flex;
    max-height: 100vh;
    min-height: 100vh;
}

.sidebar-desktop {
    width: 280px;
    flex-shrink: 0;
    border-right: 1px solid #e5e7eb;
}

.main-content {
    flex: 1;
    background: #f9fafb;
    overflow-y: auto;
}
</style>