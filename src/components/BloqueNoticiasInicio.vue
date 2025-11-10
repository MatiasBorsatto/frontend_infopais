<template>
    <div class="cont-noticia-main">
        <div id="not-izq-cont">
            <BloqueNoticia :titulo="resNoticias[0]?.titulo ?? ''" :subtitulo="resNoticias[0]?.subtitulo ?? ''"
                :multimedia="multimedia" :custom-styles-title="{ fontSize: '2.5rem' }"
                :custom-styles-subtitle="{ fontSize: '1.3rem' }" />
        </div>
        <div>
            <BloqueNoticia :titulo="resNoticias[0]?.titulo ?? ''" :multimedia="multimedia"
                :custom-styles-title="{ fontSize: '1.3rem' }" />

            <BloqueNoticia :titulo="resNoticias[0]?.titulo ?? ''" :multimedia="multimedia"
                :custom-styles-title="{ fontSize: '1.3rem' }" />

        </div>
    </div>
</template>

<script setup lang="ts">
import BloqueNoticia from './BloqueNoticia.vue';

import { ref, onMounted } from 'vue';
import noticiaService from '../services/noticia.service';
import type { Noticia } from '../services/noticia.service';

const resNoticias = ref<Noticia[]>([]);

const multimedia = "/src/assets/test.webp"

onMounted(async () => {
    try {
        const noticias = await noticiaService.obtenerNoticias();
        resNoticias.value = noticias;
        console.log('Noticias cargadas:', noticias);
    } catch (error) {
        console.error('Error al obtener noticias:', error);
    }
});

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
    gap: 1rem;
}

#not-izq-cont {
    height: 100%;
    flex: 1;
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
