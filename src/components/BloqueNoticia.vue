<template>
    <router-link :to="`/${props.slug}`" class="group flex flex-col h-full bg-white dark:bg-gray-900 transition-all duration-300 hover:shadow-md dark:hover:shadow-gray-800 rounded-md overflow-hidden">
        <!-- Contenedor de Imagen -->
        <div class="relative w-full overflow-hidden bg-gray-100 dark:bg-gray-800" :class="imageContainerClass">
            <img 
                :src="props.multimedia" 
                :alt="props.titulo" 
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
            >
            <!-- Badge de categoría opcional -->
            <span v-if="props.categoria" class="absolute bottom-0 left-0 bg-blue-600 text-white text-xs font-bold uppercase px-2 py-1">
                {{ props.categoria }}
            </span>
        </div>

        <!-- Contenido de la Noticia -->
        <div class="flex flex-col flex-1 p-4" :class="contentContainerClass">
            <h2 
                class="font-bold text-gray-900 dark:text-gray-100 leading-tight mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors"
                :class="titleClass"
                :style="customStylesTitle"
            >
                {{ props.titulo }}
            </h2>
            
            <p v-if="props.subtitulo" 
                class="text-gray-600 dark:text-gray-400 text-sm leading-snug mb-3 flex-1"
                :class="subtitleClass"
                :style="customStylesSubtitle"
            >
                {{ props.subtitulo }}
            </p>

            <!-- Meta data (autor, fecha) -->
            <div v-if="props.by || props.fecha" class="mt-auto pt-3 border-t border-gray-100 dark:border-gray-800 text-xs text-gray-500 dark:text-gray-400 font-medium flex items-center justify-between">
                <span v-if="props.by" class="flex items-center gap-1">
                    <i class="pi pi-pencil text-[10px]"></i> {{ props.by }}
                </span>
                <span v-if="props.fecha" class="flex items-center gap-1">
                    <i class="pi pi-clock text-[10px]"></i> {{ props.fecha }}
                </span>
            </div>
        </div>
    </router-link>
</template>

<script setup lang="ts">
import type { CSSProperties } from 'vue';

interface PropsNoticia {
    titulo: string;
    subtitulo?: string;
    multimedia: string;
    slug?: string; // Es importante pasar el slug para el router-link
    by?: string;
    fecha?: string;
    categoria?: string;
    // Clases tailwind personalizadas para diferentes tamaños (Hero vs Grid)
    imageContainerClass?: string;
    contentContainerClass?: string;
    titleClass?: string;
    subtitleClass?: string;
    
    // Estilos inline heredados por compatibilidad
    customStylesTitle?: CSSProperties;
    customStylesSubtitle?: CSSProperties;
}

const props = withDefaults(defineProps<PropsNoticia>(), {
    slug: 'noticia',
    imageContainerClass: 'aspect-video',
    titleClass: 'text-xl md:text-2xl',
});
</script>

<style scoped>
/* Sin estilos personalizados, usando Tailwind 100% */
</style>