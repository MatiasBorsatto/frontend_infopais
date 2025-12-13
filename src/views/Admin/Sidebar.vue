<template>
    <div class="sidebar-content">
        <!-- Header con Logo -->
        <div class="sidebar-header">
            <img src="/assets/logo_min_sin_fondo.png" alt="Logo Icono">
        </div>

        <!-- Menú -->
        <nav class="sidebar-nav">
            <!-- Sección Documents -->
            <div class="menu-section">
                <div class="section-label">Panel de Administracion</div>
                <router-link to="/admin/dashboard" class="menu-item" @click="$emit('close')">
                    <span class="flex-1">Inicio</span>
                </router-link>
                <router-link to="/admin/noticias" class="menu-item" @click="$emit('close')">
                    <span class="flex-1">Noticias</span>
                    <i class="pi pi-book"></i>
                </router-link>
                <router-link to="/admin/usuarios" class="menu-item" @click="$emit('close')">
                    <span class="flex-1">Usuarios</span>
                    <i class="pi pi-users"></i>
                </router-link>
            </div>

            <!-- Sección Profile -->
            <div class="menu-section">
                <div class="section-label">Profile</div>
                <router-link to="/profile/settings" class="menu-item" @click="$emit('close')">
                    <span class="flex-1">Settings</span>
                    <span class="shortcut">⌘+O</span>
                </router-link>
                <router-link to="/profile/messages" class="menu-item" @click="$emit('close')">
                    <span class="flex-1">Messages</span>
                </router-link>
                <a href="#" class="menu-item" @click.prevent="handleLogout">
                    <span class="flex-1">Cerrar Sesion</span>
                    <i class="pi pi-sign-out"></i>
                </a>
            </div>
        </nav>

        <!-- Footer con Usuario -->
        <div class="sidebar-footer">
            <div class="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors">
                <div class="flex flex-col">
                    <span class="font-semibold text-gray-900">Amy Elsner</span>
                    <span class="text-sm text-gray-500">Admin</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import authService from '../../services/auth.service'
import Swal from 'sweetalert2'
import { onMounted } from 'vue'
import usuarioService from '../../services/usuario.service'

const router = useRouter()

const nombreUser = ''

onMounted(async () => {
    const datosCookie = JSON.parse(decodeURIComponent(document.cookie))

    console.log(datosCookie)
    //const id = 
    //const usuario = await usuarioService.obtenerUsuario(id)
})

const emit = defineEmits(['close'])

const handleLogout = async () => {
    try {
        await authService.logout()  // Ejecuta la petición al backend

        Swal.fire({
            title: "Estas seguro que queres cerrar sesion?",
            text: "Si cerras sesion, saldras de la plataforma",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Sesion Cerrada!",
                    text: "Has cerrado sesion",
                    icon: "success"
                });

                router.push({ name: 'login' })
                emit('close')
            }
        });
    } catch (error) {
        console.error("Error al cerrar sesión:", error)
    }
}
</script>

<style scoped>
.sidebar-content {
    display: flex;
    flex-direction: column;
    height: 100%;
    background: white;
    width: 100%;

}

.sidebar-header {
    display: flex;
    justify-content: center;
    border-bottom: 1px solid #e5e7eb;
}

.sidebar-header img {
    width: 5rem;
}

.sidebar-nav {
    flex: 1;
    overflow-y: auto;
    padding: 1rem 0;
}

.menu-section {
    margin-bottom: 1.5rem;
}

.section-label {
    font-size: 0.75rem;
    font-weight: 600;
    color: #0062ff;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    padding: 0.5rem 1rem;
}

.menu-item {
    display: flex;
    align-items: center;
    padding: 0.75rem 1rem;
    margin: 0 0.5rem;
    border-radius: 0.5rem;
    color: #4b5563;
    text-decoration: none;
    transition: all 0.2s;
    cursor: pointer;
}

.menu-item:hover {
    background: #f3f4f6;
    color: #111827;
}

.menu-item.router-link-active {
    background: #f3f4f6;
    color: #3B82F6;
    font-weight: 500;
}

.shortcut {
    font-size: 0.75rem;
    color: #9ca3af;
    padding: 0.125rem 0.5rem;
    border: 1px solid #e5e7eb;
    border-radius: 0.25rem;
    background: #f9fafb;
}

.sidebar-footer {
    border-top: 1px solid #e5e7eb;
    margin-top: auto;
}
</style>