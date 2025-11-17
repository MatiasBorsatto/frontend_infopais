<script setup lang="ts">

</script>

<template>
  <router-view />
</template>

<script setup lang="ts"></script>

<style scoped>
.admin-layout {
  display: flex;
  flex-direction: row;
  min-height: 100vh;
  background-color: #f8f9fc;
}

.admin-layout>.router-view {
  flex: 1;
  padding: 2rem;
}
</style>
