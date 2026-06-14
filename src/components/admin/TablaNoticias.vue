<template>
    <div class="flex flex-col gap-6 w-full max-w-[1400px] mx-auto flex-1">
        <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2 shrink-0">Gestión de Noticias</h1>
        <div class="w-full bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col flex-1">
        <Toolbar class="mb-6 flex-shrink-0">
            <template #start>
                <Button label="Nueva" icon="pi pi-plus" class="mr-2" @click="openNew" />
                <Button label="Eliminar" icon="pi pi-trash" severity="danger" variant="outlined"
                    @click="confirmDeleteSelected" :disabled="!selectedNoticias || !selectedNoticias.length" />
            </template>
            <template #end>
                <Button label="Exportar" icon="pi pi-upload" severity="secondary" @click="exportCSV" />
            </template>
        </Toolbar>

        <div class="w-full">
            <DataTable ref="dt" :value="noticias" v-model:selection="selectedNoticias" dataKey="id_noticia"
                :paginator="true" :rows="10" :filters="filters"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                :rowsPerPageOptions="[5, 10, 25, 50, 100]"
                currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} noticias"
                stripedRows showGridlines :rowHover="true" size="large" scrollable
                class="w-full text-sm sm:text-base cursor-pointer" @row-click="viewNoticia($event.data)">

                <template #header>
                    <div class="flex flex-wrap gap-2 items-center justify-between">
                        <IconField>
                            <InputIcon>
                                <i class="pi pi-search" />
                            </InputIcon>
                            <InputText v-model="filters['global'].value" placeholder="Buscar..." />
                        </IconField>
                    </div>
                </template>

                <Column selectionMode="multiple" style="width: 3rem" :exportable="false"></Column>

                <Column field="id_noticia" header="ID" sortable style="min-width: 4rem"></Column>

                <Column field="titulo" header="Título" sortable style="min-width: 16rem; max-width: 24rem">
                    <template #body="slotProps">
                        <div class="overflow-hidden text-ellipsis whitespace-nowrap font-medium text-gray-900 dark:text-gray-100">
                            {{ slotProps.data.titulo }}
                        </div>
                    </template>
                </Column>

                <Column field="categoria_id" header="Categoría" sortable style="min-width: 10rem">
                    <template #body="slotProps">
                        <Tag :value="getCategoriaNombre(slotProps.data.id_categoria)" severity="info" rounded />
                    </template>
                </Column>

                <Column field="vistas" header="Vistas" sortable style="min-width: 8rem">
                    <template #body="slotProps">
                        <span class="flex items-center gap-2 font-bold text-blue-600 dark:text-blue-400">
                            <i class="pi pi-eye"></i>
                            {{ slotProps.data.vistas || 0 }}
                        </span>
                    </template>
                </Column>

                <Column field="likes" header="Likes" sortable style="min-width: 8rem">
                    <template #body="slotProps">
                        <span class="flex items-center gap-2 font-bold text-green-600 dark:text-green-400">
                            <i class="pi pi-thumbs-up-fill"></i>
                            {{ slotProps.data.likes || 0 }}
                        </span>
                    </template>
                </Column>

                <Column field="id_estado" header="Estado" sortable style="min-width: 6rem">
                    <template #body="slotProps">
                        <Tag :value="getEstadoLabel(slotProps.data.id_estado)"
                            :severity="getEstadoSeverity(slotProps.data.id_estado)" />
                    </template>
                </Column>

                <Column field="createdAt" header="Fecha Creación" sortable style="min-width: 12rem">
                    <template #body="slotProps">
                        <span>{{ formatDate(slotProps.data.fecha_creacion || '') }}</span>
                    </template>
                </Column>

                <Column header="Acciones" :exportable="false" style="min-width: 14rem">
                    <template #body="slotProps">
                        <Button icon="pi pi-eye" outlined rounded class="mr-2" severity="info"
                            @click.stop="viewNoticia(slotProps.data)" title="Ver detalle" />
                        <Button icon="pi pi-pencil" outlined rounded class="mr-2" severity="success"
                            @click.stop="editNoticia(slotProps.data)" title="Editar" />
                        <Button icon="pi pi-trash" outlined rounded severity="danger"
                            @click.stop="confirmDeleteNoticia(slotProps.data)" title="Eliminar" />
                    </template>
                </Column>
            </DataTable>
        </div>
        </div>
    </div>

    <!-- Dialog para VER noticia detallada -->
    <Dialog v-model:visible="viewNoticiaDialog" :style="{ width: '800px' }" header="Detalles Completos" :modal="true" :breakpoints="{ '960px': '75vw', '641px': '100vw' }" dismissableMask>
        <div class="flex flex-col gap-6 pb-4" v-if="noticiaToView">
            <!-- Header section -->
            <div class="flex flex-col gap-2 border-b border-gray-200 dark:border-gray-700 pb-4">
                <div class="flex justify-between items-start gap-4">
                    <h2 class="text-3xl font-black text-gray-900 dark:text-gray-100 leading-tight">{{ noticiaToView.titulo }}</h2>
                    <Tag :value="getEstadoLabel(noticiaToView.id_estado)" :severity="getEstadoSeverity(noticiaToView.id_estado)" class="shrink-0" />
                </div>
                <h3 v-if="noticiaToView.subtitulo" class="text-xl text-gray-500 font-medium italic">{{ noticiaToView.subtitulo }}</h3>
            </div>
            
            <!-- Metadata tags -->
            <div class="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                <span class="flex items-center gap-1"><i class="pi pi-user text-blue-500"></i> {{ noticiaToView.by || 'Desconocido' }}</span>
                <span class="flex items-center gap-1"><i class="pi pi-calendar text-orange-500"></i> {{ formatDate(noticiaToView.fecha_creacion || '') }}</span>
                <span class="flex items-center gap-1"><i class="pi pi-folder text-purple-500"></i> {{ getCategoriaNombre(noticiaToView.id_categoria as number) }}</span>
                <span class="flex items-center gap-1 font-bold text-blue-600"><i class="pi pi-eye"></i> {{ noticiaToView.vistas || 0 }} Vistas</span>
                <span class="flex items-center gap-1 font-bold text-green-600"><i class="pi pi-thumbs-up"></i> {{ noticiaToView.likes || 0 }}</span>
            </div>

            <!-- Imagen (si es URL) -->
            <div v-if="noticiaToView.multimedia" class="w-full rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 max-h-[400px] flex items-center justify-center">
                <img :src="noticiaToView.multimedia" :alt="noticiaToView.titulo" class="w-full h-full object-cover" />
            </div>

            <!-- Contenido HTML seguro -->
            <div v-if="noticiaToView.contenido" class="prose prose-blue max-w-none dark:prose-invert border-t border-gray-200 dark:border-gray-700 pt-6" v-html="noticiaToView.contenido"></div>
        </div>
        <template #footer>
            <div class="border-t border-gray-100 dark:border-gray-700 pt-4 w-full flex justify-end gap-2">
                <Button label="Cerrar" icon="pi pi-times" text @click="viewNoticiaDialog = false" />
                <Button label="Editar" icon="pi pi-pencil" @click="editFromView" severity="success" />
            </div>
        </template>
    </Dialog>

    <!-- Dialog para crear/editar noticia -->
    <Dialog v-model:visible="noticiaDialog" :style="{ width: '600px' }" :breakpoints="{ '960px': '75vw', '641px': '100vw' }" header="Detalles de Noticia" :modal="true">
        <div class="flex flex-col gap-6">
            <div>
                <label for="titulo" class="block font-bold mb-3">Título</label>
                <InputText id="titulo" v-model.trim="noticia.titulo" required="true" autofocus
                    :invalid="submitted && !noticia.titulo" fluid />
                <small v-if="submitted && !noticia.titulo" class="text-red-500">El título es requerido.</small>
            </div>

            <div>
                <label for="subtitulo" class="block font-bold mb-3">Subtítulo</label>
                <InputText id="subtitulo" v-model.trim="noticia.subtitulo" fluid />
            </div>

            <div>
                <label for="contenido" class="block font-bold mb-3">Contenido</label>
                <Editor id="contenido" required="true" v-model="noticia.contenido" editorStyle="height: 320px" />
            </div>

            <div>
                <label for="by" class="block font-bold mb-3">Autor</label>
                <InputText id="by" v-model.trim="noticia.by" fluid />
            </div>

            <div class="grid grid-cols-12 gap-4">
                <div class="col-span-12 md:col-span-6">
                    <label for="categoria" class="block font-bold mb-3">Categoría</label>
                    <Select id="categoria" v-model="noticia.id_categoria" :options="categorias" optionLabel="nombre"
                        optionValue="id_categoria" placeholder="Seleccione una Categoría" fluid />
                </div>
                <div class="col-span-12 md:col-span-6">
                    <label for="subcategoria" class="block font-bold mb-3">Subcategoría</label>
                    <Select id="subcategoria" v-model="noticia.id_subcategoria" :options="subcategorias"
                        optionLabel="nombre" optionValue="id_subcategoria" placeholder="Seleccione una Subcategoría"
                        fluid />
                </div>
                <div class="col-span-12">
                    <label for="estado" class="block font-bold mb-3">Estado</label>
                    <Select id="estado" v-model="noticia.id_estado" :options="estados" optionLabel="label"
                        optionValue="value" placeholder="Seleccione un Estado" fluid />
                </div>
            </div>

            <div class="mt-2">
                <label for="multimedia" class="block font-bold mb-3 text-gray-800 dark:text-gray-100">Imagen Principal (Se optimizará a WebP)</label>
                
                <div class="border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden bg-white dark:bg-gray-900 shadow-sm mb-4">
                    <FileUpload mode="advanced" name="imagen" accept="image/*" :maxFileSize="10000000" customUpload @select="onImageSelect" @clear="onImageClear" @remove="onImageClear" :auto="false" :showUploadButton="false" :showCancelButton="false" :pt="{ root: { class: 'border-none' } }">
                        <template #header="{ chooseCallback }">
                            <div class="flex justify-end p-2 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/20" v-if="!selectedImage">
                                <Button label="Explorar Archivos" icon="pi pi-images" rounded outlined size="small" @click="chooseCallback()" />
                            </div>
                            <div v-else class="hidden"></div>
                        </template>
                        <template #content="{ files, removeFileCallback }">
                            <div v-if="files.length > 0" class="p-4">
                                <div v-for="(file, index) of files" :key="file.name + file.type + file.size" class="flex items-center gap-4 p-4 border border-blue-100 dark:border-blue-900/50 bg-blue-50/50 dark:bg-blue-900/20 rounded-xl relative overflow-hidden group">
                                    <div class="absolute left-0 top-0 bottom-0 w-1 bg-blue-500"></div>
                                    <div class="w-20 h-20 shrink-0 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm bg-white">
                                        <img role="presentation" :alt="file.name" :src="(file as any).objectURL" class="w-full h-full object-cover" />
                                    </div>
                                    <div class="flex-1 flex flex-col gap-1 min-w-0">
                                        <span class="font-bold text-gray-800 dark:text-gray-100 truncate">{{ file.name }}</span>
                                        <div class="flex items-center gap-3">
                                            <span class="text-sm font-medium text-gray-500">{{ formatSize(file.size) }}</span>
                                            <Tag value="Lista para procesar" severity="success" rounded class="text-xs px-2 py-0.5" />
                                        </div>
                                    </div>
                                    <Button icon="pi pi-trash" @click="onRemoveTemplatingFile(removeFileCallback, index)" text rounded severity="danger" class="shrink-0 hover:bg-red-100 dark:hover:bg-red-900/30 w-12 h-12" />
                                </div>
                            </div>
                        </template>
                        <template #empty>
                            <div class="flex flex-col items-center justify-center p-10 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-800/30 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors m-4 pointer-events-none group relative overflow-hidden">
                                <div class="absolute inset-0 bg-blue-50 dark:bg-blue-900/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                                <div class="w-20 h-20 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                                    <i class="pi pi-cloud-upload text-4xl text-blue-500 dark:text-blue-400"></i>
                                </div>
                                <p class="m-0 text-xl font-bold text-gray-700 dark:text-gray-200">Arrastra tu imagen aquí</p>
                                <p class="mt-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Soporta JPG, PNG, WEBP (Max 10MB)</p>
                            </div>
                        </template>
                    </FileUpload>
                </div>

                <div class="relative flex items-center py-2">
                    <div class="flex-grow border-t border-gray-200 dark:border-gray-700"></div>
                    <span class="flex-shrink-0 mx-4 text-gray-400 text-sm font-medium uppercase tracking-widest">o mediante enlace</span>
                    <div class="flex-grow border-t border-gray-200 dark:border-gray-700"></div>
                </div>

                <div class="mt-2">
                    <IconField>
                        <InputIcon>
                            <i class="pi pi-link text-gray-400" />
                        </InputIcon>
                        <InputText id="multimedia" v-model.trim="noticia.multimedia" fluid placeholder="https://ejemplo.com/imagen.jpg" class="pl-10" />
                    </IconField>
                </div>
            </div>
        </div>

        <template #footer>
            <Button label="Cancelar" icon="pi pi-times" text @click="hideDialog" />
            <Button label="Guardar" icon="pi pi-check" @click="saveNoticia" />
        </template>
    </Dialog>

    <!-- Dialog para confirmar eliminación -->
    <Dialog v-model:visible="deleteNoticiaDialog" :style="{ width: '450px' }" :breakpoints="{ '641px': '90vw' }" header="Confirmar" :modal="true">
        <div class="flex items-center gap-4">
            <i class="pi pi-exclamation-triangle !text-3xl" />
            <span v-if="noticia">¿Está seguro que desea eliminar <b>{{ noticia.titulo }}</b>?</span>
        </div>
        <template #footer>
            <Button label="No" icon="pi pi-times" text @click="deleteNoticiaDialog = false" severity="secondary" />
            <Button label="Sí" icon="pi pi-check" @click="deleteNoticia" severity="danger" />
        </template>
    </Dialog>

    <!-- Dialog para confirmar eliminación múltiple -->
    <Dialog v-model:visible="deleteNoticiasDialog" :style="{ width: '450px' }" :breakpoints="{ '641px': '90vw' }" header="Confirmar" :modal="true">
        <div class="flex items-center gap-4">
            <i class="pi pi-exclamation-triangle !text-3xl" />
            <span>¿Está seguro que desea eliminar las noticias seleccionadas?</span>
        </div>
        <template #footer>
            <Button label="No" icon="pi pi-times" text @click="deleteNoticiasDialog = false" severity="secondary" />
            <Button label="Sí" icon="pi pi-check" text @click="deleteSelectedNoticias" severity="danger" />
        </template>
    </Dialog>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { FilterMatchMode } from '@primevue/core/api';
import { useToast } from 'primevue/usetoast';
import InputText from 'primevue/inputtext';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Dialog from 'primevue/dialog';
import Select from 'primevue/select';
import Toolbar from 'primevue/toolbar';
import Button from 'primevue/button';
import Tag from 'primevue/tag';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import Editor from 'primevue/editor';
import FileUpload from 'primevue/fileupload';
import { useNoticiaStore } from '../../stores/noticia.store.js'
import type { Categoria, Noticia, Subcategoria } from '../../types.js';

const toast = useToast();

const dt = ref();

const noticias = ref<Noticia[]>([]);

const categorias = ref<Categoria[]>([]);

const subcategorias = ref<Subcategoria[]>([]);

const noticiaDialog = ref(false);

const deleteNoticiaDialog = ref(false);

const deleteNoticiasDialog = ref(false);

const viewNoticiaDialog = ref(false);

const noticiaToView = ref<Noticia | null>(null);

const selectedImage = ref<File | null>(null);

const onImageSelect = (event: any) => {
    if (event.files && event.files.length > 0) {
        selectedImage.value = event.files[0];
    }
};

const onImageClear = () => {
    selectedImage.value = null;
};

const onRemoveTemplatingFile = (removeFileCallback: Function, index: number) => {
    removeFileCallback(index);
    selectedImage.value = null;
};

const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};



const noticia = ref<Noticia>({
    id_noticia: 0,
    titulo: '',
    subtitulo: '',
    contenido: '',
    by: '',
    id_categoria: 0,
    id_subcategoria: 0,
    multimedia: '',
    likes: 0,
    dislikes: 0,
    vistas: 0,
    id_estado: 1,
    slug: '',
});

const selectedNoticias = ref();

const filters = ref({
    'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
});

const submitted = ref(false);

const estados = ref([
    { label: 'Activo', value: 1 },
    { label: 'Inactivo', value: 0 },
    { label: 'Borrador', value: 2 }
]);

const noticiaStore = useNoticiaStore()

onMounted(async () => {
    try {
        // Cargar noticias
        const noticiasData = await noticiaStore.obtenerNoticias()
        noticias.value = noticiasData;

        // Cargar categorías
        const categoriasResponse = await noticiaStore.obtenerCategorias()
        // Ajusta según la estructura real de tu respuesta
        categorias.value = categoriasResponse.obtenerCategorias || categoriasResponse;

        // Cargar subcategorias
        const subcategoriasResponse = await noticiaStore.obtenerSubcategorias()
        subcategorias.value = subcategoriasResponse.obtenerSubcategorias || subcategoriasResponse;

        console.log('Noticias:', noticias.value);
        console.log('Categorías:', categorias.value);
        console.log('Subcategorías:', subcategorias.value);
    } catch (error) {
        console.error('Error al cargar datos:', error);
        toast.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudieron cargar los datos',
            life: 3000
        });
    }
});

const getCategoriaNombre = (id: number) => {
    console.log('Buscando categoría:', id);
    console.log('Categorías disponibles:', categorias.value);

    const categoria = categorias.value.find(c => c.id === id);
    return categoria ? categoria.nombre : 'Sin categoría';
};

const formatDate = (dateString: string | number | Date) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-AR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    });
};

const getEstadoLabel = (estadoId: number) => {
    const estado = estados.value.find(e => e.value === estadoId);
    return estado ? estado.label : 'Desconocido';
};

const getEstadoSeverity = (estadoId: number) => {
    switch (estadoId) {
        case 1:
            return 'success';
        case 0:
            return 'danger';
        case 2:
            return 'warn';
        default:
            return 'info';
    }
};

const openNew = () => {
    noticia.value = {
        id_noticia: 0,
        titulo: "",
        subtitulo: "",
        contenido: "",
        by: "",
        id_categoria: 0,
        id_subcategoria: 0,
        multimedia: "",
        likes: 0,
        dislikes: 0,
        vistas: 0,
        id_estado: 1,
        slug: ""
    };
    submitted.value = false;
    noticiaDialog.value = true;
};

const hideDialog = () => {
    noticiaDialog.value = false;
    submitted.value = false;
};


const saveNoticia = async () => {
    submitted.value = true;

    if (noticia.value.titulo?.trim()) {
        try {
            const formData = new FormData();
            formData.append('titulo', noticia.value.titulo);
            formData.append('subtitulo', noticia.value.subtitulo || '');
            formData.append('contenido', noticia.value.contenido || '');
            formData.append('by', noticia.value.by || '');
            formData.append('id_categoria', (noticia.value.id_categoria || 0).toString());
            formData.append('id_subcategoria', (noticia.value.id_subcategoria || 0).toString());
            formData.append('id_estado', (noticia.value.id_estado || 1).toString());
            formData.append('slug', noticia.value.slug || '');
            
            if (selectedImage.value) {
                formData.append('imagen', selectedImage.value);
            } else if (noticia.value.multimedia) {
                formData.append('multimedia', noticia.value.multimedia);
            }

            if (noticia.value.id_noticia) {
                formData.append('id_noticia', noticia.value.id_noticia.toString());
                await noticiaStore.actualizarNoticia(noticia.value.id_noticia, formData);
                
                const noticiasData = await noticiaStore.obtenerNoticias();
                noticias.value = noticiasData;

                toast.add({
                    severity: 'success',
                    summary: 'Éxito',
                    detail: 'Noticia Actualizada',
                    life: 3000
                });
            } else {
                await noticiaStore.guardarNoticia(formData);
                const noticiasData = await noticiaStore.obtenerNoticias();
                noticias.value = noticiasData;

                toast.add({
                    severity: 'success',
                    summary: 'Éxito',
                    detail: 'Noticia Creada',
                    life: 3000
                });
            }

            noticiaDialog.value = false;
            selectedImage.value = null;
            noticia.value = {
                id_noticia: 0,
                titulo: '',
                subtitulo: '',
                contenido: '',
                by: '',
                id_categoria: 0,
                id_subcategoria: 0,
                multimedia: '',
                likes: 0,
                dislikes: 0,
                vistas: 0,
                id_estado: 1,
                slug: '',
            };

        } catch (error) {
            console.error('Error al guardar noticia:', error);
            toast.add({
                severity: 'error',
                summary: 'Error',
                detail: 'No se pudo guardar la noticia',
                life: 3000
            });
        }
    }
};



const viewNoticia = (noticiaData: Noticia) => {
    noticiaToView.value = { ...noticiaData };
    viewNoticiaDialog.value = true;
};

const editFromView = () => {
    viewNoticiaDialog.value = false;
    if(noticiaToView.value) editNoticia(noticiaToView.value);
}

const editNoticia = (noticiaData: Noticia) => {
    noticia.value = { ...noticiaData };
    noticiaDialog.value = true;
};

const confirmDeleteNoticia = (noticiaData: Noticia) => {
    noticia.value = noticiaData;
    deleteNoticiaDialog.value = true;
};

const deleteNoticia = async () => {
    try {
        await noticiaStore.eliminarNoticia(noticia.value.id_noticia);
        noticias.value = noticias.value.filter(val => val.id_noticia !== noticia.value.id_noticia);
        deleteNoticiaDialog.value = false;
        noticia.value = {
            id_noticia: 0,
            titulo: '',
            subtitulo: '',
            contenido: '',
            by: '',
            id_categoria: 0,
            id_subcategoria: 0,
            multimedia: '',
            likes: 0,
            dislikes: 0,
            vistas: 0,
            id_estado: 1,
            slug: '',
        };
        toast.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Noticia Eliminada',
            life: 3000
        });
    } catch (error) {
        console.error('Error al eliminar noticia:', error);
        toast.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudo eliminar la noticia',
            life: 3000
        });
    }
};


const exportCSV = () => {
    dt.value.exportCSV();
};

const confirmDeleteSelected = () => {
    deleteNoticiasDialog.value = true;
};

const deleteSelectedNoticias = async () => {
    try {
        const deletePromises = selectedNoticias.value.map((n: { id_noticia: number; }) =>
            noticiaStore.eliminarNoticia(n.id_noticia)
        );
        await Promise.all(deletePromises);

        noticias.value = noticias.value.filter(val => !selectedNoticias.value.includes(val));
        deleteNoticiasDialog.value = false;
        selectedNoticias.value = null;
        toast.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Noticias Eliminadas',
            life: 3000
        });
    } catch (error) {
        console.error('Error al eliminar noticias:', error);
        toast.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudieron eliminar algunas noticias',
            life: 3000
        });
    }
};
</script>