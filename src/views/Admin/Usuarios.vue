<template>
    <div class="flex flex-col gap-6 w-full max-w-7xl mx-auto">
        <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Gestión de Usuarios</h1>
        <div class="w-full bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <TablaUsuarios />
        </div>
    </div>
</template>

<script lang="ts" setup>
// @ts-ignore: no declaration file for .vue modules
import TablaUsuarios from '../../components/admin/TablaUsuarios.vue';
</script>

<style scoped>
/* Estilos puramente con Tailwind */
</style>