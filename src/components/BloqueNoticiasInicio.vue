<template>
    <div v-if="resNoticias.length > 0" class="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 mb-12">
        
        <!-- Noticia Principal (Destacada) -->
        <div class="lg:col-span-8 h-full">
            <BloqueNoticia 
                :titulo="resNoticias[0]?.titulo ?? ''" 
                :subtitulo="resNoticias[0]?.subtitulo ?? ''"
                :multimedia="resNoticias[0]?.multimedia || multimedia" 
                :slug="resNoticias[0]?.slug"
                :by="resNoticias[0]?.by"
                imageContainerClass="aspect-[16/9] lg:aspect-[2/1]"
                titleClass="text-3xl md:text-4xl lg:text-5xl font-black mt-2"
                subtitleClass="text-lg md:text-xl text-gray-600 mt-4"
                contentContainerClass="p-0 pt-4"
            />
        </div>

        <!-- Noticias Secundarias (Columna Derecha) -->
        <div class="lg:col-span-4 flex flex-col gap-6 lg:border-l lg:border-gray-200 lg:pl-6">
            
            <div v-if="resNoticias[1]" class="flex-1">
                <BloqueNoticia 
                    :titulo="resNoticias[1]?.titulo ?? ''" 
                    :multimedia="resNoticias[1]?.multimedia || multimedia"
                    :slug="resNoticias[1]?.slug"
                    imageContainerClass="aspect-[16/9]"
                    titleClass="text-xl font-bold mt-2"
                    contentContainerClass="p-0 pt-3"
                />
            </div>

            <!-- Separador sutil -->
            <hr v-if="resNoticias[1] && resNoticias[2]" class="border-gray-200">

            <div v-if="resNoticias[2]" class="flex-1">
                <BloqueNoticia 
                    :titulo="resNoticias[2]?.titulo ?? ''" 
                    :multimedia="resNoticias[2]?.multimedia || multimedia"
                    :slug="resNoticias[2]?.slug"
                    imageContainerClass="aspect-[16/9]"
                    titleClass="text-xl font-bold mt-2"
                    contentContainerClass="p-0 pt-3"
                />
            </div>

        </div>
    </div>

    <!-- Skeleton loading state para mejor UX -->
    <div v-else class="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 mb-12 animate-pulse">
        <div class="lg:col-span-8 bg-gray-200 aspect-[16/9] lg:aspect-[2/1] rounded-md"></div>
        <div class="lg:col-span-4 flex flex-col gap-6">
            <div class="bg-gray-200 aspect-[16/9] rounded-md"></div>
            <div class="bg-gray-200 aspect-[16/9] rounded-md"></div>
        </div>
    </div>
</template>

<script setup lang="ts">
import BloqueNoticia from './BloqueNoticia.vue';
import { ref, onMounted } from 'vue';
import type { Noticia } from '../types.ts';
import { useNoticiaStore } from '../stores/noticia.store.ts'

const noticiaStore = useNoticiaStore()
const resNoticias = ref<Noticia[]>([]);
const multimedia = "/assets/test.webp"

const obtenerNoticias = async () => {
    try {
        const noticias = await noticiaStore.obtenerNoticias()
        resNoticias.value = noticias;
    } catch (error) {
        console.error('Error al obtener noticias:', error);
    }
}

onMounted(() => {
    obtenerNoticias()
})
</script>
