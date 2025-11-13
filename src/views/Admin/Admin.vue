<template>
    <div class="admin-layout">
        <Sidebar />
        <router-view />
    </div>
</template>

<script setup lang="ts">
import Sidebar from './Sidebar.vue'
</script>

<style scoped>
.admin-layout {
    display: flex;
    min-height: 100vh;
}
</style>
