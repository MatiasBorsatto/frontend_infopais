<template>
    <div>
        <BloqueNoticia :titulo="resNoticias[0]?.titulo ?? ''" :multimedia="multimedia" />
    </div>
</template>

<script setup lang="ts">
import BloqueNoticia from './BloqueNoticia.vue';


</script>

<style scoped></style>