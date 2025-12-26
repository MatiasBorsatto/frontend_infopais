<template>
    <div class="cont-dash">
        <CantidadVistas />
        <CantidadVistas />
        <CantidadVistas />
        <CantidadVistas />
    </div>
</template>

<script setup lang="ts">
import CantidadVistas from '../../components/admin/dashboards/CantidadVistas.vue';


</script>

<style scoped>
.cont-dash {
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 5rem;
    width: 100%;
    gap: 1rem;
}
</style>