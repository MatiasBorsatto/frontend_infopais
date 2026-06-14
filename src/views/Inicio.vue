<template>
    <Navbar />

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <BloqueNoticiaInicio />
        
        <Divider class="my-8" />

        <template v-if="datosListos">
            <div v-for="c in categorias" :key="c.id_categoria" class="mb-10 w-full">
                <DeferredContent>
                    <BarraGeneral :categoriaName="c.nombre" :categoriaId="c.id_categoria" />
                </DeferredContent>
                <Divider class="mt-10" />
            </div>
        </template>
        <div v-else class="w-full">
            <div v-for="i in 3" :key="'skeleton-'+i" class="mb-10 w-full animate-pulse">
                <div class="flex items-center mb-6 border-b-2 border-slate-200 dark:border-slate-800">
                    <div class="h-8 bg-slate-200 dark:bg-slate-800 rounded w-48 border-b-4 border-blue-600 pb-2 -mb-[3px]"></div>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div v-for="j in 4" :key="'skel-item-'+j" class="flex flex-col gap-3">
                        <div class="bg-slate-200 dark:bg-slate-800 aspect-video rounded-md"></div>
                        <div class="h-4 bg-slate-200 dark:bg-slate-800 rounded w-3/4"></div>
                        <div class="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/2"></div>
                    </div>
                </div>
                <Divider class="mt-10" />
            </div>
        </div>
    </main>

    <ScrollTop />
    <Footer />
</template>

<script setup lang="ts">
import BarraGeneral from '../components/BarraGeneral.vue';
import BloqueNoticiaInicio from '../components/BloqueNoticiasInicio.vue';
import Footer from '../components/Footer.vue';
import Navbar from '../components/Navbar.vue';
import Divider from 'primevue/divider';
import DeferredContent from 'primevue/deferredcontent';
import ScrollTop from '../components/ScrollTop.vue';
import { ref, onMounted } from 'vue';
import { useNoticiaStore } from '../stores/noticia.store';


const noticiaStore = useNoticiaStore()

let categorias: any = ref([])
let datosListos = ref(false)

onMounted(async () => {
    categorias.value = await noticiaStore.obtenerCategorias()
    datosListos.value = true
})
</script>

<style scoped>
/* Las Media Queries antiguas fueron removidas ya que Tailwind maneja el responsive */
</style>