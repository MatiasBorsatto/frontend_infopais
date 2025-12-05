<template>
    <div class="cont-titulo">
        <h3><b>Titulo General</b></h3>
    </div>
    <div class="cont-general">
        <BloqueNoticia :titulo="resNoticias[0]?.titulo ?? ''" :multimedia="multimedia" />
        <BloqueNoticia :titulo="resNoticias[0]?.titulo ?? ''" :multimedia="multimedia" />
        <BloqueNoticia :titulo="resNoticias[0]?.titulo ?? ''" :multimedia="multimedia" />
        <BloqueNoticia :titulo="resNoticias[0]?.titulo ?? ''" :multimedia="multimedia" />
    </div>
</template>

<script setup lang="ts">

import BloqueNoticia from './BloqueNoticia.vue';

import { ref, onMounted } from 'vue';
import type { Noticia } from '../services/noticia.service';

const resNoticias = ref<Noticia[]>([]);

const multimedia = "/src/assets/test.webp"

onMounted(async () => {
    // try {
    //     const noticias = await noticiaService.obtenerNoticias();
    //     resNoticias.value = noticias;
    //     console.log('Noticias cargadas:', resNoticias.value);
    // } catch (error) {
    //     console.error('Error al obtener noticias:', error);
    // }
});

</script>

<style scoped>
.cont-general {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 1rem;
    height: 20rem;
    padding: 0;
    margin-top: 1rem;
    margin-bottom: 1rem;
}

.cont-titulo {
    display: flex;
    justify-content: flex-start;
    width: 100%;
}

h3 {
    font-size: larger;
}
</style>