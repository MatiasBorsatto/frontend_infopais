<template>
    <router-link to="noticia">
        <Card style="overflow: hidden" class="contenedor">
            <template #header>
                <img :src="props.multimedia" alt="Imagen de Noticia">
            </template>
            <template #title>
                <h2 :style="customStylesTitle">{{ props.titulo }}</h2>
            </template>
            <template #subtitle v-if="props.subtitulo" :style="customStylesSubtitle">
                <p>{{ props.subtitulo }}</p>
            </template>
        </Card>
    </router-link>
</template>

<script setup lang="ts">
import type { CSSProperties } from 'vue';
import Card from 'primevue/card';

interface PropsNoticia {
    titulo: string
    subtitulo?: string
    multimedia: string
    customStylesTitle?: CSSProperties
    customStylesSubtitle?: CSSProperties
    customStylesImg?: CSSProperties
}
const props = defineProps<PropsNoticia>()
</script>

<style scoped>
h2,
p {
    margin: 0;
}

.bloq-noticia-wrapper {
    display: flex;
    flex-direction: column;
    height: 100%;
}

.bloq-noticia {
    flex: 1;
    min-height: 0;
}

.contenedor {
    height: 100%;
    transition: .2s;

}

.contenedor:hover {
    cursor: pointer;
    box-shadow: .2rem .2rem 0.5rem rgb(183, 183, 183);
    cursor: pointer;
    transition: .2s;
}

hr {
    width: 100%;
    height: 1px;
    margin: 0.5rem 0;
    border: none;
    background-color: #ccc;
}
</style>