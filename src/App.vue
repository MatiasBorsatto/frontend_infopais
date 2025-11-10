<script setup lang="ts">
import Navbar from './components/Navbar.vue';
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Footer from './components/Footer.vue';

const route = useRoute()

const esLogin = computed(() => route.name === 'login')
const esRegister = computed(() => route.name === 'register')
const esAdmin = computed(() => route.name === 'admin')
</script>

<template>
  <Navbar v-if="!esLogin && !esRegister && !esAdmin" />

  <router-view />

  <Footer v-if="!esAdmin" />

</template>

<style scoped></style>
