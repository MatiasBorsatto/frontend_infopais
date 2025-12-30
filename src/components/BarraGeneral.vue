<template>
    <div class="cont-general">
        <div class="cont-titulo">
            <h3><b>{{ props.categoriaName }}</b></h3>
        </div>

        <template v-if="datosListos">

            <div class="cont-noticia">
                <BloqueNoticia v-for="n in resNoticias" :titulo="n.titulo" :multimedia="multimedia" />
            </div>
        </template>


        <!-- <Carousel :value="resNoticias" :numVisible="4" :numScroll="1" :responsiveOptions="responsiveOptions">
            <template #item="slotProps">
                <div class="border border-surface-200 dark:border-surface-700 rounded m-2 cont-noticia">
                    <div>
                        <div class="relative mx-auto">
                            <img :src=multimedia :alt="multimedia" class="w-full rounded" />
                        </div>
                    </div>
                    <div class="p-4 font-medium">{{ slotProps.data.titulo }}</div>
                </div>
            </template>
</Carousel> -->

    </div>
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


// Declaración básica
const props = defineProps<PropsBarraGeneral>();

onMounted(async () => {
    try {
        resNoticias.value = await noticiaStore.obtenerNoticiasByCat(props.categoriaId);
        console.log('Noticias cargadas:', resNoticias.value);
        datosListos.value = true

    } catch (error) {
        console.error('Error al obtener noticias:', error);
    }
});

</script>

<style scoped>
.cont-general {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    height: auto;
}

.cont-titulo {
    display: flex;
    justify-content: flex-start;
    width: 100%;
}

h3 {
    font-size: larger;
}

.cont-noticia {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 1rem;
}
</style>