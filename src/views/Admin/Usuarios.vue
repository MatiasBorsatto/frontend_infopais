<template>
    <div class="center">
        <TablaUsuarios />
    </div>
</template>

<script lang="ts" setup>
// @ts-ignore: no declaration file for .vue modules
import TablaUsuarios from '../../components/admin/TablaUsuarios.vue';
</script>


<style scoped>
.center {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
}

.tabla {
    display: flex;
    width: 85%;
    height: 80vh;
    overflow-y: auto;
}
</style>