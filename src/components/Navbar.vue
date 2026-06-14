<template>
    <header class="w-full flex flex-col font-sans transition-colors duration-300">
        <!-- Top Bar: Información secundaria, clima, login, etc. -->
        <div class="bg-gray-900 dark:bg-gray-950 text-white text-xs font-medium py-1 px-4 sm:px-6 lg:px-8 border-b dark:border-gray-800">
            <div class="max-w-7xl mx-auto flex justify-between items-center">
                <div class="flex gap-4">
                    <span class="hidden sm:inline">secciones</span>
                    <span>{{ fechaActual }}</span>
                </div>
                <div class="flex gap-4 items-center">
                    <button @click="toggleDarkMode" class="hover:text-gray-300 transition-colors flex items-center gap-1" title="Alternar modo oscuro">
                        <i :class="isDark ? 'pi pi-sun' : 'pi pi-moon'" style="font-size: 0.85rem"></i>
                    </button>
                    <button class="hover:text-gray-300 transition-colors flex items-center gap-1">
                        <i class="pi pi-search" style="font-size: 0.75rem"></i> buscar
                    </button>
                    <router-link to="/login" class="hover:text-gray-300 transition-colors">Login</router-link>
                </div>
            </div>
        </div>

        <!-- Logo Bar: Centrado, fondo blanco / negro -->
        <div class="bg-white dark:bg-gray-900 py-4 px-4 sm:px-6 lg:px-8 border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
            <div class="max-w-7xl mx-auto flex justify-center">
                <router-link to="/">
                    <img src="/assets/logo_infopais.png" alt="InfoPaís" 
                         class="h-16 md:h-20 object-contain hover:opacity-90 transition-all" 
                         :class="isDark ? 'invert mix-blend-screen' : 'mix-blend-multiply'">
                </router-link>
            </div>
        </div>

        <!-- Main Navigation: Pegadiza (sticky), categorías principales -->
        <nav class="relative bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50 shadow-sm transition-colors duration-300">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between md:justify-center">
                
                <!-- Botón Menú Hamburguesa (Solo Móvil) -->
                <button @click="mobileMenuOpen = !mobileMenuOpen" class="md:hidden py-3 cursor-pointer text-gray-800 dark:text-gray-200 hover:text-blue-600 focus:outline-none flex items-center gap-2 font-bold uppercase text-sm">
                    <i :class="mobileMenuOpen ? 'pi pi-times' : 'pi pi-bars'" class="text-xl"></i> 
                    <span v-if="!mobileMenuOpen">Secciones</span>
                </button>

                <!-- Menú Escritorio -->
                <ul class="hidden md:flex justify-center items-center gap-6 lg:gap-8 py-3 whitespace-nowrap text-[13px] md:text-[14px] font-bold text-gray-800 dark:text-gray-200 uppercase tracking-wide">
                    <li><router-link to="/seccion/mundo" class="hover:text-blue-600 dark:hover:text-blue-400 hover:underline underline-offset-8 transition-all">Mundo</router-link></li>
                    <li><router-link to="/seccion/política" class="hover:text-blue-600 dark:hover:text-blue-400 hover:underline underline-offset-8 transition-all">Política</router-link></li>
                    <li><router-link to="/seccion/negocios" class="hover:text-blue-600 dark:hover:text-blue-400 hover:underline underline-offset-8 transition-all">Negocios</router-link></li>
                    <li><router-link to="/seccion/opinión" class="hover:text-blue-600 dark:hover:text-blue-400 hover:underline underline-offset-8 transition-all">Opinión</router-link></li>
                    <li><router-link to="/seccion/tecnología" class="hover:text-blue-600 dark:hover:text-blue-400 hover:underline underline-offset-8 transition-all">Tecnología</router-link></li>
                    <li><router-link to="/seccion/ciencia" class="hover:text-blue-600 dark:hover:text-blue-400 hover:underline underline-offset-8 transition-all">Ciencia</router-link></li>
                    <li><router-link to="/seccion/salud" class="hover:text-blue-600 dark:hover:text-blue-400 hover:underline underline-offset-8 transition-all">Salud</router-link></li>
                    <li><router-link to="/seccion/deportes" class="hover:text-blue-600 dark:hover:text-blue-400 hover:underline underline-offset-8 transition-all">Deportes</router-link></li>
                    <li><router-link to="/seccion/entretenimiento" class="hover:text-blue-600 dark:hover:text-blue-400 hover:underline underline-offset-8 transition-all">Entretenimiento</router-link></li>
                </ul>
            </div>

            <!-- Menú Desplegable Móvil Flotante con Transición -->
            <transition name="slide-fade">
                <div v-show="mobileMenuOpen" class="md:hidden absolute left-0 right-0 top-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 max-h-[70vh] overflow-y-auto shadow-lg z-50">
                    <ul class="flex flex-col px-4 font-bold text-gray-800 dark:text-gray-200 uppercase tracking-wide text-sm">
                        <li><router-link @click="mobileMenuOpen = false" to="/seccion/mundo" class="block py-4 border-b border-gray-200 dark:border-gray-700 hover:text-blue-600 transition-colors">Mundo</router-link></li>
                        <li><router-link @click="mobileMenuOpen = false" to="/seccion/política" class="block py-4 border-b border-gray-200 dark:border-gray-700 hover:text-blue-600 transition-colors">Política</router-link></li>
                        <li><router-link @click="mobileMenuOpen = false" to="/seccion/negocios" class="block py-4 border-b border-gray-200 dark:border-gray-700 hover:text-blue-600 transition-colors">Negocios</router-link></li>
                        <li><router-link @click="mobileMenuOpen = false" to="/seccion/opinión" class="block py-4 border-b border-gray-200 dark:border-gray-700 hover:text-blue-600 transition-colors">Opinión</router-link></li>
                        <li><router-link @click="mobileMenuOpen = false" to="/seccion/tecnología" class="block py-4 border-b border-gray-200 dark:border-gray-700 hover:text-blue-600 transition-colors">Tecnología</router-link></li>
                        <li><router-link @click="mobileMenuOpen = false" to="/seccion/ciencia" class="block py-4 border-b border-gray-200 dark:border-gray-700 hover:text-blue-600 transition-colors">Ciencia</router-link></li>
                        <li><router-link @click="mobileMenuOpen = false" to="/seccion/salud" class="block py-4 border-b border-gray-200 dark:border-gray-700 hover:text-blue-600 transition-colors">Salud</router-link></li>
                        <li><router-link @click="mobileMenuOpen = false" to="/seccion/deportes" class="block py-4 border-b border-gray-200 dark:border-gray-700 hover:text-blue-600 transition-colors">Deportes</router-link></li>
                        <li><router-link @click="mobileMenuOpen = false" to="/seccion/entretenimiento" class="block py-4 hover:text-blue-600 transition-colors">Entretenimiento</router-link></li>
                    </ul>
                </div>
            </transition>
        </nav>
    </header>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';

const fechaActual = computed(() => {
    const opciones: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date().toLocaleDateString('es-ES', opciones);
});

const isDark = ref(false);
const mobileMenuOpen = ref(false);

const toggleDarkMode = () => {
    isDark.value = !isDark.value;
    if (isDark.value) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
    }
};

onMounted(() => {
    // Restaurar preferencia del usuario o del sistema
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        isDark.value = true;
        document.documentElement.classList.add('dark');
    } else {
        isDark.value = false;
        document.documentElement.classList.remove('dark');
    }
});
</script>

<style scoped>
/* Elimino el CSS personalizado ya que uso Tailwind */
/* Estilos para ocultar el scrollbar en la navegación móvil pero permitiendo scroll */
nav::-webkit-scrollbar {
  display: none;
}
nav {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

/* Transición para el menú hamburguesa */
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}
</style>