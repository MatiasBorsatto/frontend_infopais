<template>
    <div>
        <BloqueNoticiaInicio />
    </div>
    <BarraGeneral />
</template>

<script setup lang="ts">
import BarraGeneral from '../components/BarraGeneral.vue';
import BloqueNoticiaInicio from '../components/BloqueNoticiasInicio.vue';

</script>

<style scoped>
p {
    margin: 0;
    background-color: black;
}

div {
    display: flex;
    align-items: center;
    padding-left: 18%;
    padding-right: 18%;
}

/*MEDIA QUERIES*/

/* Tablet - pantallas menores a 1024px */
@media (max-width: 1023px) {
    div {
        padding-left: 10%;
        padding-right: 10%;
    }
}

/* Móvil - pantallas menores a 768px */
@media (max-width: 767px) {
    .cont-noticia-main {
        grid-template-columns: 1fr;
        grid-template-rows: auto;
    }

    .not-izq {
        height: auto;
    }
}

/* Móvil pequeño - pantallas menores a 480px */
@media (max-width: 479px) {
    .cont-noticia-main {
        gap: 0.5rem;
        padding: 0.5rem;
    }
}
</style>