<script setup lang="ts">
import Navbar from './components/Navbar.vue';
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const esLogin = computed(() => route.name === 'login')
const esRegister = computed(() => route.name === 'register')
</script>

<template>
  <Navbar v-if="!esLogin && !esRegister" />

  <router-view />

</template>

<style scoped></style>
