<template>
    <div v-if="resNoticias.length > 0" class="cont-noticia-main">
        <div id="not-izq-cont">
            <router-link :to="resNoticias[0]?.slug ?? ''">
                <BloqueNoticia :titulo="resNoticias[0]?.titulo ?? ''" :subtitulo="resNoticias[0]?.subtitulo ?? ''"
                    :multimedia="multimedia" :custom-styles-title="{ fontSize: '2.5rem' }"
                    :custom-styles-subtitle="{ fontSize: '1.3rem' }" :by="resNoticias[0]?.by" />
            </router-link>
        </div>
        <div id="not-der-cont">

            <router-link :to="resNoticias[1]?.slug ?? ''">
                <BloqueNoticia :titulo="resNoticias[1]?.titulo ?? ''" :multimedia="multimedia"
                    :custom-styles-title="{ fontSize: '1.5rem' }" :custom-styles-subtitle="{ fontSize: '1rem' }" />
            </router-link>

            <router-link :to="resNoticias[2]?.slug ?? ''">
                <BloqueNoticia :titulo="resNoticias[2]?.titulo ?? ''" :multimedia="multimedia"
                    :custom-styles-title="{ fontSize: '1.5rem' }" :custom-styles-subtitle="{ fontSize: '1rem' }" />
            </router-link>
        </div>
    </div>
    <p v-else>Cargando noticias...</p>
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
        console.log(noticias)
        resNoticias.value = noticias;
        console.log('Noticias cargadas:', resNoticias.value);
    } catch (error) {
        console.error('Error al obtener noticias:', error);
    }
}

obtenerNoticias()   //Revisar si lo mejor es que se cargue una sola vez por sesion o que cada vez que se visite el componente se ejecute la funcion

</script>

<style scoped>
img {
    max-width: 100%;
}

.cont-noticia-main {
    display: grid;
    grid-template-columns: 1fr .7fr;
    grid-template-rows: 1fr;
    width: 100%;
    padding: 0;
    transition: .5s;
    gap: 1rem;
    margin-bottom: 2rem;
}

#not-izq-cont {
    height: 100%;
    flex: 1;
}

#not-der-cont {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

:deep(.vs-card) {
    height: 100%;
    display: flex;
    flex-direction: column;
}

:deep(.vs-card-content) {
    min-height: 0 !important;
    height: 100%;
    display: flex;
    flex-direction: column;
}
</style>
