<template>
  <Navbar />

  <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10 min-h-[70vh]">
    <div v-if="loading" class="w-full">
      <div class="flex items-center mb-6 border-b-2 border-slate-200 dark:border-slate-800 animate-pulse">
        <div class="h-10 bg-slate-200 dark:bg-slate-800 rounded w-48 border-b-4 border-blue-600 pb-2 -mb-[3px]"></div>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-pulse">
        <div v-for="j in 8" :key="'skel-item-'+j" class="flex flex-col gap-3">
          <div class="bg-slate-200 dark:bg-slate-800 aspect-video rounded-md"></div>
          <div class="h-4 bg-slate-200 dark:bg-slate-800 rounded w-3/4"></div>
          <div class="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/2"></div>
        </div>
      </div>
    </div>

    <div v-else-if="error" class="flex flex-col items-center justify-center py-20 gap-4 text-center">
      <h2 class="text-2xl font-bold text-gray-900 dark:text-gray-100">Error al cargar la sección</h2>
      <p class="text-gray-600 dark:text-gray-400">{{ error }}</p>
      <Button label="Volver al inicio" @click="router.push('/')" severity="secondary" />
    </div>

    <div v-else>
      <div class="flex items-center mb-6 border-b-2 border-slate-200 dark:border-slate-800">
        <h1 class="text-2xl md:text-3xl font-black uppercase text-slate-900 dark:text-slate-100 border-b-4 border-blue-600 pb-2 -mb-[3px] tracking-wide">
          {{ categoriaNombre }}
        </h1>
      </div>

      <div v-if="noticias.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <BloqueNoticia
          v-for="noticia in noticias"
          :key="noticia.id_noticia"
          v-bind="noticia"
        />
      </div>
      <div v-else class="text-center py-20 text-gray-500 dark:text-gray-400">
        <i class="pi pi-inbox text-4xl mb-4 opacity-50"></i>
        <p class="text-lg">No hay noticias publicadas en esta sección todavía.</p>
      </div>
    </div>
  </main>

  <ScrollTop />
  <Footer />
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useNoticiaStore } from '../stores/noticia.store';
import Navbar from '../components/Navbar.vue';
import Footer from '../components/Footer.vue';
import ScrollTop from '../components/ScrollTop.vue';
import BloqueNoticia from '../components/BloqueNoticia.vue';
import Button from 'primevue/button';
import type { Noticia } from '../types';

const route = useRoute();
const router = useRouter();
const noticiaStore = useNoticiaStore();

const noticias = ref<Noticia[]>([]);
const categoriaNombre = ref('');
const loading = ref(true);
const error = ref('');

// Función auxiliar para quitar acentos
const normalizeString = (str: string) => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
};

const cargarDatos = async (nombreRuta: string) => {
  loading.value = true;
  error.value = '';
  noticias.value = [];
  categoriaNombre.value = '';
  
  try {
    const categorias = await noticiaStore.obtenerCategorias();
    // Buscar la categoría ignorando acentos y mayúsculas
    const categoria = categorias.find((c: any) => normalizeString(c.nombre) === normalizeString(nombreRuta));
    
    if (!categoria) {
      error.value = `No se encontró la sección: ${nombreRuta}`;
      loading.value = false;
      return;
    }

    categoriaNombre.value = categoria.nombre;
    const data = await noticiaStore.obtenerNoticiasByCat(categoria.id_categoria);
    noticias.value = data || [];
  } catch (err: any) {
    error.value = err.message || 'Error de conexión al cargar las noticias.';
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  const nombre = route.params.nombre as string;
  if (!nombre) {
    error.value = 'URL inválida';
    loading.value = false;
    return;
  }
  cargarDatos(nombre);
});

// Reactividad si el usuario navega entre secciones usando la Navbar
watch(() => route.params.nombre, (newNombre) => {
  if (newNombre) {
    cargarDatos(newNombre as string);
    window.scrollTo(0, 0);
  }
});
</script>

<style scoped>
@reference "../style.css";
</style>
