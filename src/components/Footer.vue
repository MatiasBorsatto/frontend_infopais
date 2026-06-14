<template>
    <footer class="bg-gray-200 dark:bg-gray-900 py-10 transition-colors duration-300 border-t border-gray-300 dark:border-gray-800 mt-10">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
            
            <!-- Logo y Redes Sociales -->
            <div class="w-full flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
                <div>
                    <img :src="isDark ? '/assets/logo_infopais_sin_fondo.png' : '/assets/logo_infopais_sin_fondo.png'" alt="Logo InfoPais" class="h-16 md:h-20 object-contain mix-blend-multiply dark:invert dark:mix-blend-screen transition-all">
                </div>
                
                <div class="flex flex-col sm:flex-row items-center gap-4 text-gray-800 dark:text-gray-200">
                    <p class="font-bold uppercase tracking-wider text-sm">Seguinos:</p>
                    <div class="flex items-center gap-4">
                        <a href="#" class="hover:opacity-80 transition-opacity">
                            <img src="/assets/facebook-logo.svg" alt="Facebook" class="w-8 h-8 dark:invert">
                        </a>
                        <a href="#" class="hover:opacity-80 transition-opacity">
                            <img src="/assets/instagram-logo.svg" alt="Instagram" class="w-8 h-8 dark:invert">
                        </a>
                    </div>
                </div>
            </div>

            <div class="w-full h-px bg-gray-300 dark:bg-gray-700 mb-8"></div>

            <!-- Categorías -->
            <div class="flex flex-wrap justify-center gap-x-6 gap-y-4 mb-8 text-sm md:text-base font-bold text-gray-800 dark:text-gray-200 uppercase tracking-wide">
                <router-link to="/seccion/mundo" class="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Mundo</router-link>
                <router-link to="/seccion/política" class="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Política</router-link>
                <router-link to="/seccion/negocios" class="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Negocios</router-link>
                <router-link to="/seccion/opinión" class="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Opinión</router-link>
                <router-link to="/seccion/tecnología" class="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Tecnología</router-link>
                <router-link to="/seccion/ciencia" class="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Ciencia</router-link>
                <router-link to="/seccion/salud" class="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Salud</router-link>
                <router-link to="/seccion/deportes" class="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Deportes</router-link>
                <router-link to="/seccion/entretenimiento" class="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Entretenimiento</router-link>
            </div>

            <div class="w-full h-px bg-gray-300 dark:bg-gray-700 mb-6"></div>

            <!-- Copyright -->
            <div class="text-center text-sm text-gray-600 dark:text-gray-400 font-medium">
                <p>Todos Los Derechos Reservados © 2026 InfoPaís</p>
            </div>
        </div>
    </footer>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const isDark = ref(false);

onMounted(() => {
    // Escuchar el modo oscuro global
    const updateTheme = () => {
        isDark.value = document.documentElement.classList.contains('dark');
    };
    updateTheme();
    // Opcional: configurar un mutation observer para detectar el cambio al vuelo
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
});
</script>

<style scoped>
/* Estilos eliminados, reemplazados con Tailwind */
</style>