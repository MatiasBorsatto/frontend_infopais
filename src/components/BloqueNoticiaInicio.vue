<template>
    <div v-for="noticia in resNoticias" :key="noticia.id">
        <h2>{{ noticia.titulo }}</h2>
        <p>{{ noticia.subtitulo }}</p>
        <img :src="noticia.multimedia" alt="Imagen Noticia" />
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import noticiaService from '../services/noticia.service';
import type { Noticia } from '../services/noticia.service';


const resNoticias = ref<Noticia[]>([]);

onMounted(async () => {
    try {
        const noticias = await noticiaService.obtenerNoticias();
        resNoticias.value = noticias;
        console.log(resNoticias.value);
    } catch (error) {
        console.error('Error al obtener noticias:', error);
    }
});
</script>

<style scoped>
img {
    max-width: 100%;
    border-radius: 8px;
}
</style>
