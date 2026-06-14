<template>
    <div class="flex flex-col gap-8 w-full max-w-[1600px] mx-auto pb-10 flex-1">
        <div class="flex items-center justify-between">
            <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">Resumen Analítico</h1>
            <Button icon="pi pi-refresh" rounded outlined severity="secondary" aria-label="Actualizar" @click="fetchData" :loading="loading" />
        </div>

        <!-- KPI Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <!-- Vistas -->
            <div @click="showDetails('vistas')" class="animate-fade-in-up delay-100 cursor-pointer bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center justify-between hover:shadow-md transition-shadow duration-300 transform hover:-translate-y-1">
                <div class="flex flex-col gap-1">
                    <span class="text-sm font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Total de Vistas</span>
                    <span class="text-4xl font-extrabold text-gray-900 dark:text-white">{{ totalVistas.toLocaleString('es-AR') }}</span>
                </div>
                <div class="w-14 h-14 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
                    <i class="pi pi-eye text-2xl"></i>
                </div>
            </div>

            <!-- Interacciones -->
            <div @click="showDetails('interacciones')" class="animate-fade-in-up delay-200 cursor-pointer bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center justify-between hover:shadow-md transition-shadow duration-300 transform hover:-translate-y-1">
                <div class="flex flex-col gap-1">
                    <span class="text-sm font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Interacciones</span>
                    <span class="text-4xl font-extrabold text-gray-900 dark:text-white">{{ totalInteracciones.toLocaleString('es-AR') }}</span>
                </div>
                <div class="w-14 h-14 rounded-full bg-purple-50 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400 shrink-0">
                    <i class="pi pi-thumbs-up text-2xl"></i>
                </div>
            </div>

            <!-- Noticias Publicadas -->
            <div @click="showDetails('publicaciones')" class="animate-fade-in-up delay-300 cursor-pointer bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center justify-between hover:shadow-md transition-shadow duration-300 transform hover:-translate-y-1">
                <div class="flex flex-col gap-1">
                    <span class="text-sm font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Publicaciones</span>
                    <span class="text-4xl font-extrabold text-gray-900 dark:text-white">{{ totalNoticias.toLocaleString('es-AR') }}</span>
                </div>
                <div class="w-14 h-14 rounded-full bg-orange-50 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 dark:text-orange-400 shrink-0">
                    <i class="pi pi-file-edit text-2xl"></i>
                </div>
            </div>

            <!-- Usuarios -->
            <div @click="showDetails('usuarios')" class="animate-fade-in-up delay-400 cursor-pointer bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center justify-between hover:shadow-md transition-shadow duration-300 transform hover:-translate-y-1">
                <div class="flex flex-col gap-1">
                    <span class="text-sm font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Usuarios Registrados</span>
                    <span class="text-4xl font-extrabold text-gray-900 dark:text-white">{{ totalUsuarios.toLocaleString('es-AR') }}</span>
                </div>
                <div class="w-14 h-14 rounded-full bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
                    <i class="pi pi-users text-2xl"></i>
                </div>
            </div>
        </div>

        <!-- Charts Row -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <!-- Top 5 Noticias -->
            <div class="animate-fade-in-up delay-500 bg-white dark:bg-gray-800 p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col h-[450px]">
                <h3 class="text-lg font-bold text-gray-800 dark:text-gray-200 mb-6 flex items-center gap-2">
                    <i class="pi pi-chart-bar text-blue-500"></i>
                    Top 5 Noticias Más Leídas
                </h3>
                <div class="flex-1 relative w-full h-full">
                    <Chart type="bar" :data="topNoticiasData" :options="barOptions" class="w-full h-full" v-if="!loading" />
                    <div v-else class="w-full h-full flex items-center justify-center">
                        <i class="pi pi-spin pi-spinner text-3xl text-gray-400"></i>
                    </div>
                </div>
            </div>

            <!-- Vistas por Categoría -->
            <div class="animate-fade-in-up delay-600 bg-white dark:bg-gray-800 p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col h-[450px]">
                <h3 class="text-lg font-bold text-gray-800 dark:text-gray-200 mb-6 flex items-center gap-2">
                    <i class="pi pi-chart-pie text-purple-500"></i>
                    Tráfico por Categoría
                </h3>
                <div class="flex-1 relative w-full h-full flex justify-center">
                    <Chart type="doughnut" :data="categoriaData" :options="pieOptions" class="w-full h-full flex items-center justify-center" v-if="!loading" />
                    <div v-else class="w-full h-full flex items-center justify-center">
                        <i class="pi pi-spin pi-spinner text-3xl text-gray-400"></i>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Dialog Details -->
        <Dialog v-model:visible="detailDialog" modal :header="dialogTitle" :style="{ width: '50vw' }" :breakpoints="{ '960px': '75vw', '641px': '100vw' }">
            <DataTable :value="dialogData" paginator :rows="5" stripedRows showGridlines :rowHover="true" class="mt-4">
                <Column v-for="col of dialogColumns" :key="col.field" :field="col.field" :header="col.header" sortable></Column>
            </DataTable>
        </Dialog>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import Chart from 'primevue/chart'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import { useNoticiaStore } from '../../stores/noticia.store'
import { useUsuarioStore } from '../../stores/usuario.store'

const noticiaStore = useNoticiaStore()
const usuarioStore = useUsuarioStore()

const loading = ref(true)
const noticias = ref<any[]>([])
const categorias = ref<any[]>([])
const usuariosCount = ref(0)
const usuariosObj = ref<any[]>([])

const detailDialog = ref(false)
const dialogTitle = ref('')
const dialogData = ref<any[]>([])
const dialogColumns = ref<{field: string, header: string}[]>([])

const fetchData = async () => {
    loading.value = true
    try {
        const [noticiasData, categoriasData, usuariosData] = await Promise.all([
            noticiaStore.obtenerNoticias(),
            noticiaStore.obtenerCategorias(),
            usuarioStore.obtenerUsuarios()
        ])
        
        noticias.value = noticiasData || []
        categorias.value = categoriasData.obtenerCategorias || categoriasData || []
        usuariosObj.value = usuariosData || []
        usuariosCount.value = usuariosData?.length || 0
    } catch (error) {
        console.error("Error al cargar datos del dashboard:", error)
    } finally {
        loading.value = false
    }
}

onMounted(() => {
    fetchData()
})

// === CÁLCULO DE KPIs ===
const totalVistas = computed(() => {
    return noticias.value.reduce((acc, noti) => acc + (noti.vistas || 0), 0)
})

const totalNoticias = computed(() => {
    return noticias.value.length
})

const totalInteracciones = computed(() => {
    return noticias.value.reduce((acc, noti) => acc + (noti.likes || 0) + (noti.dislikes || 0), 0)
})

const totalUsuarios = computed(() => {
    return usuariosCount.value
})

// === CÁLCULO DE GRÁFICO: Top 5 Noticias ===
const topNoticiasData = computed(() => {
    // Clonar y ordenar por vistas descendente
    const sorted = [...noticias.value].sort((a, b) => (b.vistas || 0) - (a.vistas || 0)).slice(0, 5)
    
    // Truncar textos largos para que entren en el gráfico
    const labels = sorted.map(n => n.titulo.length > 25 ? n.titulo.substring(0, 25) + '...' : n.titulo)
    const data = sorted.map(n => n.vistas || 0)



    return {
        labels,
        datasets: [
            {
                label: 'Cantidad de Vistas',
                data,
                backgroundColor: [
                    'rgba(59, 130, 246, 0.7)',
                    'rgba(139, 92, 246, 0.7)',
                    'rgba(236, 72, 153, 0.7)',
                    'rgba(245, 158, 11, 0.7)',
                    'rgba(16, 185, 129, 0.7)'
                ],
                borderColor: [
                    'rgb(59, 130, 246)',
                    'rgb(139, 92, 246)',
                    'rgb(236, 72, 153)',
                    'rgb(245, 158, 11)',
                    'rgb(16, 185, 129)'
                ],
                borderWidth: 1,
                borderRadius: 6
            }
        ]
    }
})

// === CÁLCULO DE GRÁFICO: Vistas por Categoría ===
const categoriaData = computed(() => {
    // Agrupar vistas por id_categoria
    const vistasPorCategoria: Record<number, number> = {}
    noticias.value.forEach(noti => {
        const catId = noti.id_categoria || noti.categoria_id // Dependiendo de como venga de la API
        if (catId) {
            vistasPorCategoria[catId] = (vistasPorCategoria[catId] || 0) + (noti.vistas || 0)
        }
    })

    const labels: string[] = []
    const data: number[] = []

    // Mapear IDs a Nombres
    Object.keys(vistasPorCategoria).forEach(catIdStr => {
        const catId = parseInt(catIdStr)
        const cat = categorias.value.find(c => c.id_categoria === catId || c.id === catId)
        labels.push(cat ? cat.nombre : 'Sin Categoría')
        data.push(vistasPorCategoria[catId] || 0)
    })

    return {
        labels,
        datasets: [
            {
                data,
                backgroundColor: [
                    'rgba(99, 102, 241, 0.8)',
                    'rgba(16, 185, 129, 0.8)',
                    'rgba(245, 158, 11, 0.8)',
                    'rgba(239, 68, 68, 0.8)',
                    'rgba(139, 92, 246, 0.8)',
                    'rgba(20, 184, 166, 0.8)'
                ],
                hoverOffset: 6
            }
        ]
    }
})

// === OPCIONES DE GRÁFICOS (Responsive y Theming) ===
const barOptions = computed(() => {
    const documentStyle = getComputedStyle(document.documentElement)

    const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color')
    const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color')

    return {
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                titleFont: { size: 14, family: "'Inter', sans-serif" },
                bodyFont: { size: 14, family: "'Inter', sans-serif" },
                padding: 12,
                cornerRadius: 8
            }
        },
        scales: {
            x: {
                ticks: {
                    color: textColorSecondary,
                    font: { family: "'Inter', sans-serif" }
                },
                grid: {
                    color: surfaceBorder,
                    drawBorder: false
                }
            },
            y: {
                beginAtZero: true,
                ticks: {
                    color: textColorSecondary,
                    font: { family: "'Inter', sans-serif" }
                },
                grid: {
                    color: surfaceBorder,
                    drawBorder: false
                }
            }
        }
    }
})

const pieOptions = computed(() => {
    const documentStyle = getComputedStyle(document.documentElement)
    const textColor = documentStyle.getPropertyValue('--p-text-color')

    return {
        maintainAspectRatio: false,
        cutout: '65%',
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    color: textColor,
                    usePointStyle: true,
                    padding: 20,
                    font: { family: "'Inter', sans-serif" }
                }
            },
            tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                titleFont: { size: 14, family: "'Inter', sans-serif" },
                bodyFont: { size: 14, family: "'Inter', sans-serif" },
                padding: 12,
                cornerRadius: 8
            }
        }
    }
})

// === LOGIC FOR MODAL ===
const showDetails = (type: string) => {
    switch (type) {
        case 'vistas':
            dialogTitle.value = 'Detalle de Vistas por Noticia'
            dialogColumns.value = [
                { field: 'titulo', header: 'Título' },
                { field: 'vistas', header: 'Vistas' }
            ]
            dialogData.value = [...noticias.value].sort((a, b) => (b.vistas || 0) - (a.vistas || 0))
            break
        case 'interacciones':
            dialogTitle.value = 'Detalle de Interacciones'
            dialogColumns.value = [
                { field: 'titulo', header: 'Título' },
                { field: 'likes', header: 'Likes' },
                { field: 'dislikes', header: 'Dislikes' }
            ]
            dialogData.value = [...noticias.value].sort((a, b) => ((b.likes || 0) + (b.dislikes || 0)) - ((a.likes || 0) + (a.dislikes || 0)))
            break
        case 'publicaciones':
            dialogTitle.value = 'Listado de Publicaciones'
            dialogColumns.value = [
                { field: 'titulo', header: 'Título' },
                { field: 'by', header: 'Autor' },
                { field: 'createdAt', header: 'Fecha de Creación' }
            ]
            dialogData.value = noticias.value.map(n => ({
                ...n,
                createdAt: new Date(n.createdAt).toLocaleDateString('es-AR')
            }))
            break
        case 'usuarios':
            dialogTitle.value = 'Usuarios Registrados'
            dialogColumns.value = [
                { field: 'nombre', header: 'Nombre' },
                { field: 'email', header: 'Email' },
                { field: 'rol_id', header: 'ID Rol' }
            ]
            dialogData.value = usuariosObj.value
            break
    }
    detailDialog.value = true
}
</script>

<style scoped>
/* Transiciones suaves exclusivas del dashboard */
.transition-shadow {
    transition-property: box-shadow, transform;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Animaciones de entrada escalonadas (Staggered Fade-in) */
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.animate-fade-in-up {
    animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    opacity: 0;
}

.delay-100 { animation-delay: 100ms; }
.delay-200 { animation-delay: 200ms; }
.delay-300 { animation-delay: 300ms; }
.delay-400 { animation-delay: 400ms; }
.delay-500 { animation-delay: 500ms; }
.delay-600 { animation-delay: 600ms; }
</style>