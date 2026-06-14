<template>
    <div class="flex h-screen bg-gray-50 dark:bg-gray-900 overflow-hidden">
        
        <!-- Desktop Sidebar -->
        <aside class="hidden lg:flex w-72 flex-col bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 z-10 shrink-0 shadow-sm">
            <Sidebar />
        </aside>

        <!-- Mobile Drawer -->
        <Drawer v-model:visible="sidebarVisible" position="left" class="lg:hidden p-0 w-72" :pt="{ content: { class: 'p-0' } }">
            <Sidebar @close="sidebarVisible = false" />
        </Drawer>

        <!-- Contenedor Principal (Header + Contenido) -->
        <div class="flex-1 flex flex-col min-w-0 overflow-hidden">
            
            <!-- Mobile Header (Visible solo en pantallas pequeñas) -->
            <header class="lg:hidden flex items-center justify-between bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 h-16 px-4 shrink-0 shadow-sm z-10">
                <div class="flex items-center gap-3">
                    <Button icon="pi pi-bars" @click="sidebarVisible = true" text rounded class="p-button-secondary dark:text-gray-200" />
                    <img src="/assets/logo_infopais_sin_fondo.png" alt="InfoPais Logo" class="h-8 object-contain">
                </div>
            </header>

            <!-- Main Content Area -->
            <main class="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 relative scroll-smooth">
                <router-view />
                <ScrollTop target="parent" :threshold="200" icon="pi pi-arrow-up" class="!bg-blue-600 hover:!bg-blue-700 !text-white shadow-lg !rounded-full !w-12 !min-w-[3rem] !h-12 !min-h-[3rem] flex items-center justify-center z-50 right-6 bottom-6" />
            </main>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Drawer from 'primevue/drawer'
import Button from 'primevue/button'
import ScrollTop from 'primevue/scrolltop'
import Sidebar from './Sidebar.vue'

const sidebarVisible = ref(false)
</script>

<style scoped>
/* Sin estilos personalizados, usamos puramente Tailwind CSS */
</style>