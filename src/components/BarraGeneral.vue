<template>
    <div class="cont-titulo">
        <h3><b>{{ props.categoria }}</b></h3>
    </div>
    <div class="cont-general">
        <router-link to="noticia">
            <BloqueNoticia :titulo="resNoticias[0]?.titulo ?? ''" :multimedia="multimedia" />
        </router-link>
        <router-link to="noticia">
            <BloqueNoticia :titulo="resNoticias[1]?.titulo ?? ''" :multimedia="multimedia" />
        </router-link>
        <router-link to="noticia">
            <BloqueNoticia :titulo="resNoticias[2]?.titulo ?? ''" :multimedia="multimedia" />
        </router-link>
        <router-link to="noticia">
            <BloqueNoticia :titulo="resNoticias[3]?.titulo ?? ''" :multimedia="multimedia" />
        </router-link>
    </div>
</template>

<script setup lang="ts">

import BloqueNoticia from './BloqueNoticia.vue';
import { ref, onMounted } from 'vue';
import type { Noticia, PropsBarraGeneral } from '../types.ts';
import { useNoticiaStore } from '../stores/noticia.store.ts';

const noticiaStore = useNoticiaStore()

const resNoticias = ref<Noticia[]>([]);

const multimedia = "/assets/test.webp"

// Declaración básica
const props = defineProps<PropsBarraGeneral>();

onMounted(async () => {
    try {
        const noticias = await noticiaStore.obtenerNoticias();
        resNoticias.value = noticias;
        console.log('Noticias cargadas:', resNoticias.value);
    } catch (error) {
        console.error('Error al obtener noticias:', error);
    }
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