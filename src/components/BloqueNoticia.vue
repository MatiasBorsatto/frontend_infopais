<template>
    <div class="bloq-noticia-wrapper">
        <vs-card class="bloq-noticia">
            <template #title>
                <h2 :style="customStylesTitle">{{ props.titulo }}</h2>
            </template>
            <template #img>
                <img :src="props.multimedia" alt="Imagen de Noticia">
            </template>
            <template #text>
                <p v-if="props.subtitulo" :style="customStylesSubtitle">{{ props.subtitulo }}</p>
            </template>
            <template #interactions>
            </template>
        </vs-card>
        <hr>
    </div>
</template>

<script setup lang="ts">
import type { CSSProperties } from 'vue';

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

hr {
    width: 100%;
    height: 1px;
    margin: 0.5rem 0;
    border: none;
    background-color: #ccc;
}

/* CRÍTICO: Hacer que la card y todo su contenido use flex */
:deep(.vs-card) {
    height: 100% !important;
    display: flex !important;
    flex-direction: column !important;
    min-width: 100%;
}

:deep(.vs-card-content) {
    min-height: 0 !important;
    height: 100% !important;
    flex: 1 !important;
    display: flex !important;
    flex-direction: column !important;
    gap: 1rem;
}

/* Hacer que el título no crezca */
:deep(.vs-card__title) {
    flex-shrink: 0 !important;
}

/* Hacer que la imagen ocupe el espacio restante */
:deep(.vs-card__img) {
    flex: 1 !important;
    min-height: fit-content !important;
    overflow: hidden;
    display: flex !important;
}

/* El texto tampoco debe crecer */
:deep(.vs-card__text) {
    flex-shrink: 0 !important;
}
</style>