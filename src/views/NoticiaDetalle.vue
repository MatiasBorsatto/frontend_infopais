<template>
  <Navbar />

  <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">
    <div v-if="loading" class="grid grid-cols-1 lg:grid-cols-12 gap-10 animate-pulse">
      <article class="lg:col-span-8 lg:pr-8 lg:border-r border-slate-200 dark:border-slate-800">
        <div class="h-12 bg-slate-200 dark:bg-slate-800 rounded w-full mb-4"></div>
        <div class="h-12 bg-slate-200 dark:bg-slate-800 rounded w-3/4 mb-6"></div>
        <div class="h-6 bg-slate-200 dark:bg-slate-800 rounded w-full mb-2"></div>
        <div class="h-6 bg-slate-200 dark:bg-slate-800 rounded w-5/6 mb-6"></div>
        <div class="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/3 mb-8"></div>
        <div class="w-full h-64 md:h-96 bg-slate-200 dark:bg-slate-800 rounded-md mb-8"></div>
        <div class="space-y-4">
          <div class="h-4 bg-slate-200 dark:bg-slate-800 rounded w-full"></div>
          <div class="h-4 bg-slate-200 dark:bg-slate-800 rounded w-full"></div>
          <div class="h-4 bg-slate-200 dark:bg-slate-800 rounded w-5/6"></div>
          <div class="h-4 bg-slate-200 dark:bg-slate-800 rounded w-full"></div>
          <div class="h-4 bg-slate-200 dark:bg-slate-800 rounded w-4/6"></div>
        </div>
      </article>
      <aside class="lg:col-span-4 hidden lg:block">
        <div class="h-8 bg-slate-200 dark:bg-slate-800 rounded w-1/2 mb-6 border-b-4 border-blue-600 pb-1"></div>
        <div class="flex flex-col gap-5">
          <div v-for="i in 5" :key="i" class="flex gap-4 items-start">
            <div class="flex-1 space-y-2">
              <div class="h-4 bg-slate-200 dark:bg-slate-800 rounded w-full"></div>
              <div class="h-4 bg-slate-200 dark:bg-slate-800 rounded w-3/4"></div>
            </div>
            <div class="w-20 h-20 shrink-0 bg-slate-200 dark:bg-slate-800 rounded"></div>
          </div>
        </div>
      </aside>
    </div>

    <div v-else-if="error" class="flex flex-col items-center justify-center py-20 gap-4 text-center">
      <h2 class="text-2xl font-bold text-gray-900 dark:text-gray-100">Error al cargar la noticia</h2>
      <p class="text-gray-600 dark:text-gray-400">{{ error }}</p>
      <Button label="Volver al inicio" @click="router.push('/')" severity="secondary" />
    </div>

    <div v-else-if="noticia" class="grid grid-cols-1 lg:grid-cols-12 gap-10">
      
      <!-- Columna Principal (Noticia) -->
      <article class="lg:col-span-8 lg:pr-8 lg:border-r border-gray-200 dark:border-gray-800">
        
        <!-- Etiqueta superior de la categoría -->
        <div v-if="categoriaNombre" class="mb-4">
            <span class="inline-block bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 px-3 py-1 rounded-sm font-bold uppercase tracking-wider text-xs">
                {{ categoriaNombre }}
            </span>
        </div>

        <header class="mb-6">
          <h1 class="text-3xl md:text-5xl font-black text-gray-900 dark:text-gray-100 leading-tight mb-4 tracking-tight">
            {{ noticia.titulo }}
          </h1>
          <p v-if="noticia.subtitulo" class="text-xl text-gray-600 dark:text-gray-400 leading-snug mb-6 font-serif">
            {{ noticia.subtitulo }}
          </p>
          
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 dark:border-gray-800 pb-4">
            <div class="flex items-center gap-3">
              <!-- Avatar simulado del autor -->
              <div class="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center overflow-hidden shrink-0">
                  <i class="pi pi-user text-gray-400"></i>
              </div>
              <div class="flex flex-col">
                  <span class="font-bold text-sm text-gray-900 dark:text-gray-100">
                    Por {{ noticia.by || 'Redacción' }}
                  </span>
                  <span class="text-xs text-gray-500 dark:text-gray-400">{{ fechaFormateada }}</span>
              </div>
            </div>

            <!-- Botones de Redes Sociales -->
            <div class="flex items-center gap-2">
                <button class="w-8 h-8 rounded-full bg-gray-100 hover:bg-[#25D366] text-gray-600 hover:text-white dark:bg-gray-800 dark:text-gray-300 transition-colors flex items-center justify-center" title="Compartir en WhatsApp">
                    <i class="pi pi-whatsapp"></i>
                </button>
                <button class="w-8 h-8 rounded-full bg-gray-100 hover:bg-[#1DA1F2] text-gray-600 hover:text-white dark:bg-gray-800 dark:text-gray-300 transition-colors flex items-center justify-center" title="Compartir en Twitter">
                    <i class="pi pi-twitter"></i>
                </button>
                <button class="w-8 h-8 rounded-full bg-gray-100 hover:bg-[#1877F2] text-gray-600 hover:text-white dark:bg-gray-800 dark:text-gray-300 transition-colors flex items-center justify-center" title="Compartir en Facebook">
                    <i class="pi pi-facebook"></i>
                </button>
                <button class="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-300 text-gray-600 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-300 transition-colors flex items-center justify-center" title="Copiar Enlace">
                    <i class="pi pi-link"></i>
                </button>
            </div>
          </div>
        </header>

        <figure v-if="noticia.multimedia" class="mb-8">
          <img :src="noticia.multimedia" :alt="noticia.titulo" class="w-full h-auto object-cover max-h-[600px]" />
          <!-- Pie de foto -->
          <figcaption class="text-sm text-gray-500 mt-2 text-right">Imagen ilustrativa / InfoPaís</figcaption>
        </figure>

        <div class="contenido-html font-serif" v-html="noticia.contenido"></div>

        <!-- Temas Relacionados (Tags) -->
        <div class="mt-12 pt-6 border-t border-gray-200 dark:border-gray-800">
            <h4 class="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-4">Temas Relacionados</h4>
            <div class="flex flex-wrap gap-2">
                <span v-for="tag in etiquetas" :key="tag" class="px-3 py-1 border border-gray-300 dark:border-gray-700 hover:border-blue-500 hover:text-blue-600 dark:hover:border-blue-400 dark:hover:text-blue-400 text-gray-600 dark:text-gray-300 text-sm rounded cursor-pointer transition-colors font-medium">
                    #{{ tag }}
                </span>
            </div>
        </div>

        <!-- Te Recomendamos -->
        <div class="mt-12 pt-8 border-t-2 border-gray-200 dark:border-gray-800">
            <h3 class="text-2xl font-black uppercase text-slate-900 dark:text-slate-100 mb-6 tracking-tight">
                Te Recomendamos
            </h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <router-link 
                    v-for="item in recomendadas" 
                    :key="item.id_noticia"
                    :to="`/${item.slug}`"
                    class="group flex flex-col"
                >
                    <div class="aspect-[16/9] w-full bg-gray-100 dark:bg-gray-800 overflow-hidden mb-3">
                        <img :src="item.multimedia || '/assets/test.webp'" :alt="item.titulo" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy">
                    </div>
                    <h4 class="text-lg font-bold text-gray-900 dark:text-gray-100 leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {{ item.titulo }}
                    </h4>
                </router-link>
            </div>
        </div>

      </article>

      <!-- Columna Secundaria (Sidebar) -->
      <aside class="lg:col-span-4">
        <div class="sticky top-24 flex flex-col gap-10">
            
          <!-- Espacio Publicitario Superior -->
          <div class="w-full h-[250px] bg-gray-100 dark:bg-gray-800 flex flex-col items-center justify-center text-gray-400 border border-gray-200 dark:border-gray-700">
              <span class="text-xs uppercase tracking-widest mb-2">Publicidad</span>
              <i class="pi pi-image text-3xl opacity-50"></i>
          </div>

          <!-- Lo Más Leído -->
          <div>
            <div class="flex items-center mb-6 border-b-2 border-slate-200 dark:border-slate-800">
                <h3 class="text-lg font-black uppercase text-slate-900 dark:text-slate-100 border-b-4 border-blue-600 pb-1 -mb-[3px] tracking-wide">
                    Lo más leído
                </h3>
            </div>

            <div v-if="masLeidas.length > 0" class="flex flex-col gap-6">
                <router-link 
                v-for="(item, index) in masLeidas" 
                :key="item.id_noticia"
                :to="`/${item.slug}`"
                class="group flex gap-4 items-center relative p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                >
                <!-- Badge de ranking propio -->
                <div class="w-8 h-8 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300 flex items-center justify-center font-bold text-sm shrink-0">
                    {{ index + 1 }}
                </div>
                <div class="flex-1">
                    <h4 class="text-sm font-bold text-gray-900 dark:text-gray-100 leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-3">
                    {{ item.titulo }}
                    </h4>
                </div>
                </router-link>
            </div>
            <div v-else class="text-sm text-gray-500">
                No hay datos suficientes.
            </div>
          </div>

          <!-- Últimas Noticias (Alternativa) -->
          <div>
            <div class="flex items-center mb-6 border-b-2 border-slate-200 dark:border-slate-800">
                <h3 class="text-lg font-black uppercase text-slate-900 dark:text-slate-100 border-b-4 border-gray-400 pb-1 -mb-[3px] tracking-wide">
                    Últimas Noticias
                </h3>
            </div>
            <div class="flex flex-col gap-5">
                <router-link 
                v-for="item in ultimasNoticias" 
                :key="item.id_noticia"
                :to="`/${item.slug}`"
                class="group flex gap-3 items-start"
                >
                <div class="w-2 h-2 mt-1.5 rounded-full bg-blue-600 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div class="flex-1">
                    <h4 class="text-sm font-semibold text-gray-800 dark:text-gray-200 leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {{ item.titulo }}
                    </h4>
                </div>
                </router-link>
            </div>
          </div>

        </div>
      </aside>

    </div>
  </main>

  <!-- Espacio Publicitario Footer -->
  <div v-if="noticia" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 mb-8">
      <div class="w-full h-[90px] md:h-[120px] bg-gray-100 dark:bg-gray-800 flex flex-col items-center justify-center text-gray-400 border border-gray-200 dark:border-gray-700 hidden md:flex">
          <span class="text-xs uppercase tracking-widest mb-1">Publicidad</span>
      </div>
  </div>

  <ScrollTop />
  <Footer />
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useNoticiaStore } from '../stores/noticia.store';
import Navbar from '../components/Navbar.vue';
import Footer from '../components/Footer.vue';
import ScrollTop from '../components/ScrollTop.vue';

import Button from 'primevue/button';
import type { Noticia } from '../types';

const route = useRoute();
const router = useRouter();
const noticiaStore = useNoticiaStore();

const noticia = ref<Noticia | null>(null);
const ultimasNoticias = ref<Noticia[]>([]);
const masLeidas = ref<Noticia[]>([]);
const recomendadas = ref<Noticia[]>([]);
const categoriaNombre = ref('');
const loading = ref(true);
const error = ref('');

// Etiquetas simuladas al azar para darle realismo
const etiquetas = ref<string[]>([]);
const posiblesEtiquetas = ['Economía', 'Gobierno', 'Sociedad', 'Internacional', 'Análisis', 'Entrevista', 'Último Momento', 'Tendencia'];

const fechaFormateada = computed(() => {
  if (!noticia.value?.fecha_creacion) return new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
  return new Date(noticia.value.fecha_creacion).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' });
});

const cargarDatos = async (slug: string) => {
  loading.value = true;
  error.value = '';
  
  try {
    const data = await noticiaStore.obtenerNoticiaPorSlug(slug);
    noticia.value = data;
    
    // Obtener el nombre de la categoría para el Tag superior
    if (data.id_categoria) {
        const cats = await noticiaStore.obtenerCategorias();
        const c = cats.find((x: any) => x.id_categoria === data.id_categoria);
        if (c) categoriaNombre.value = c.nombre;
    }

    // Generar 3-4 etiquetas al azar
    const shuffled = posiblesEtiquetas.sort(() => 0.5 - Math.random());
    etiquetas.value = shuffled.slice(0, Math.floor(Math.random() * 2) + 3);

    // Cargar últimas noticias y lo más leído para el sidebar
    const todas = await noticiaStore.obtenerNoticias();
    const otras = todas.filter((n: Noticia) => n.id_noticia !== data.id_noticia);
    
    // Últimas noticias (orden original/inverso)
    ultimasNoticias.value = otras.slice(0, 5);
    
    // Lo más leído (simulado ordenando por vistas, o ID si no hay vistas suficientes)
    masLeidas.value = [...otras].sort((a, b) => {
        const vA = a.vistas || 0;
        const vB = b.vistas || 0;
        if (vA === vB) return b.id_noticia - a.id_noticia; // fallback
        return vB - vA;
    }).slice(0, 5);

    // Te recomendamos (misma categoría)
    recomendadas.value = otras.filter((n: Noticia) => n.id_categoria === data.id_categoria).slice(0, 4);
    // Si no hay suficientes de la misma categoría, rellenamos
    if (recomendadas.value.length < 4) {
        const faltan = 4 - recomendadas.value.length;
        const relleno = otras.filter((n: Noticia) => n.id_categoria !== data.id_categoria).slice(0, faltan);
        recomendadas.value = [...recomendadas.value, ...relleno];
    }
    
  } catch (err: any) {
    error.value = err.message || 'No se pudo encontrar la noticia.';
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  const slug = route.params.slug as string;
  if (!slug) {
    error.value = 'URL inválida';
    loading.value = false;
    return;
  }
  cargarDatos(slug);
});

// Reactividad si el usuario hace clic en una noticia del sidebar y la ruta cambia
watch(() => route.params.slug, (newSlug) => {
  if (newSlug) {
    cargarDatos(newSlug as string);
    window.scrollTo(0, 0);
  }
});
</script>

<style scoped>
@reference "../style.css";

/* Estilos dinámicos para el contenido generado por Quill/editor estilo periodístico */
.contenido-html {
  font-size: 1.15rem;
  line-height: 1.8;
  @apply text-gray-800 dark:text-gray-200;
}

.contenido-html :deep(p) {
  margin-bottom: 1.5rem;
}

.contenido-html :deep(h2) {
  font-size: 1.8rem;
  font-weight: 900;
  margin-top: 2.5rem;
  margin-bottom: 1rem;
  @apply text-gray-900 dark:text-gray-100;
  font-family: ui-sans-serif, system-ui, sans-serif;
}

.contenido-html :deep(h3) {
  font-size: 1.5rem;
  font-weight: 700;
  margin-top: 2rem;
  margin-bottom: 1rem;
  @apply text-gray-900 dark:text-gray-100;
  font-family: ui-sans-serif, system-ui, sans-serif;
}

.contenido-html :deep(img) {
  max-width: 100%;
  margin: 1.5rem 0;
}

.contenido-html :deep(a) {
  color: #3b82f6;
  text-decoration: none;
  font-weight: 500;
}

.contenido-html :deep(a:hover) {
  text-decoration: underline;
}

.contenido-html :deep(blockquote) {
  border-left: 4px solid #3b82f6; /* Azul estilo InfoPais */
  padding-left: 1.25rem;
  font-style: italic;
  margin: 2rem 0;
  font-size: 1.25rem;
  @apply text-gray-600 dark:text-gray-400 bg-blue-50 dark:bg-gray-800/50 py-3 rounded-r-md;
}
</style>