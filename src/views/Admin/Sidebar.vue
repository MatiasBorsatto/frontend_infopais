<template>
    <div class="flex flex-col h-full bg-white dark:bg-gray-800">
        <!-- Header con Logo -->
        <div class="flex items-center justify-center h-20 border-b border-gray-200 dark:border-gray-700 shrink-0">
            <img src="/assets/logo_infopais_sin_fondo.png" alt="Logo InfoPais" class="h-10 object-contain">
        </div>

        <!-- Menú -->
        <nav class="flex-1 overflow-y-auto py-6 px-4 space-y-8">
            <!-- Sección Panel -->
            <div>
                <div class="px-3 mb-2 text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                    Panel de Administración
                </div>
                <div class="space-y-1">
                    <router-link to="/admin/dashboard" class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition-colors" active-class="bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 font-semibold" @click="$emit('close')">
                        <i class="pi pi-home"></i>
                        <span class="flex-1">Inicio</span>
                    </router-link>
                    <router-link to="/admin/noticias" class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition-colors" active-class="bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 font-semibold" @click="$emit('close')">
                        <i class="pi pi-book"></i>
                        <span class="flex-1">Noticias</span>
                    </router-link>
                    <router-link to="/admin/usuarios" class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition-colors" active-class="bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 font-semibold" @click="$emit('close')">
                        <i class="pi pi-users"></i>
                        <span class="flex-1">Usuarios</span>
                    </router-link>
                </div>
            </div>

            <!-- Sección Acciones -->
            <div>
                <div class="px-3 mb-2 text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                    Acciones
                </div>
                <div class="space-y-1">
                    <router-link to="/" target="_blank" class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition-colors" @click="$emit('close')">
                        <i class="pi pi-external-link"></i>
                        <span class="flex-1">Ir al Portal</span>
                    </router-link>
                    <a href="#" @click.prevent="handleLogout" class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                        <i class="pi pi-sign-out"></i>
                        <span class="flex-1">Cerrar Sesión</span>
                    </a>
                </div>
            </div>
        </nav>

        <!-- Footer con Usuario -->
        <div class="border-t border-gray-200 dark:border-gray-700 p-4 shrink-0 bg-gray-50 dark:bg-gray-800/50">
            <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                    <i class="pi pi-user text-xl"></i>
                </div>
                <div class="flex flex-col overflow-hidden">
                    <span class="font-semibold text-sm text-gray-900 dark:text-gray-100 truncate">Administrador</span>
                    <span class="text-xs text-gray-500 dark:text-gray-400 truncate">Panel InfoPais</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import authService from '../../services/auth.service'
import Swal from 'sweetalert2'

const router = useRouter()
const emit = defineEmits(['close'])

const handleLogout = async () => {
    try {
        await authService.logout()

        Swal.fire({
            title: "¿Estás seguro que querés cerrar sesión?",
            text: "Si cerrás sesión, saldrás del panel de administración.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3B82F6",
            cancelButtonColor: "#EF4444",
            confirmButtonText: "Sí, salir",
            cancelButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "¡Sesión Cerrada!",
                    text: "Has cerrado sesión correctamente.",
                    icon: "success",
                    confirmButtonColor: "#3B82F6"
                });

                router.push({ name: 'inicio' })
                emit('close')
            }
        });
    } catch (error) {
        console.error("Error al cerrar sesión:", error)
    }
}
</script>

<style scoped>
/* Estilos puramente con Tailwind */
</style>