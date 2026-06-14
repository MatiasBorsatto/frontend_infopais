<template>
    <section class="flex flex-col mb-10 w-full">
        <!-- Encabezado de Sección estilo Periódico -->
        <div class="flex items-center mb-6 border-b-2 border-slate-200 dark:border-slate-800">
            <h3 class="text-xl md:text-2xl font-black uppercase text-slate-900 dark:text-slate-100 border-b-4 border-blue-600 pb-2 -mb-[3px] tracking-wide">
                {{ props.categoriaName }}
            </h3>
            <!-- Link opcional "Ver más" -->
            <a href="#" class="ml-auto text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors hidden sm:block">
                VER MÁS
            </a>
        </div>

        <template v-if="datosListos">
            <div v-if="resNoticias.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <!-- Mostramos un máximo de 4 noticias por categoría en el inicio -->
                <div v-for="n in resNoticias.slice(0, 4)" :key="n.id_noticia" class="h-full">
                    <BloqueNoticia 
                        :titulo="n.titulo" 
                        :multimedia="n.multimedia || multimedia" 
                        :slug="n.slug"
                        :by="n.by"
                        imageContainerClass="aspect-video"
                        titleClass="text-lg md:text-xl font-bold mt-2"
                        contentContainerClass="p-0 pt-3"
                    />
                </div>
            </div>
            <div v-else class="text-gray-500 italic py-4">
                No hay noticias recientes en esta sección.
            </div>
        </template>
        
        <!-- Skeleton para carga -->
        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div v-for="i in 4" :key="i" class="animate-pulse flex flex-col gap-3">
                <div class="bg-gray-200 aspect-video rounded-md"></div>
                <div class="h-4 bg-gray-200 rounded w-3/4"></div>
                <div class="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { Noticia, PropsBarraGeneral } from '../types.ts';
import { useNoticiaStore } from '../stores/noticia.store.ts';
import BloqueNoticia from './BloqueNoticia.vue';

const noticiaStore = useNoticiaStore()
const resNoticias = ref<Noticia[]>([]);
const multimedia = "/assets/test.webp"
let datosListos = ref(false)

const props = defineProps<PropsBarraGeneral>();

onMounted(async () => {
    try {
        resNoticias.value = await noticiaStore.obtenerNoticiasByCat(props.categoriaId);
        datosListos.value = true;
    } catch (error) {
        console.error('Error al obtener noticias:', error);
    }
});
</script>