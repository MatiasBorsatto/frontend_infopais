<template>
    <div class="card flex flex-col h-screen">
        <Toolbar class="mb-6 flex-shrink-0">
            <template #start>
                <Button label="Nueva" icon="pi pi-plus" class="mr-2" @click="openNew" />
                <Button label="Eliminar" icon="pi pi-trash" severity="danger" variant="outlined"
                    @click="confirmDeleteSelected" :disabled="!selectedNoticias || !selectedNoticias.length" />
            </template>
            <template #end>
                <Button label="Exportar" icon="pi pi-upload" severity="secondary" @click="exportCSV($event)" />
            </template>
        </Toolbar>

        <div class="flex-1 overflow-hidden">
            <DataTable ref="dt" v-model:selection="selectedNoticias" :value="noticias" dataKey="id_noticia"
                :paginator="true" :rows="10" :filters="filters"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                :rowsPerPageOptions="[5, 10, 25]"
                currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} noticias" scrollable
                scrollHeight="flex" class="h-full flex flex-col">

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

                <Column field="id_noticia" header="ID" sortable style="min-width: 8rem"></Column>

                <Column field="titulo" header="Título" sortable style="min-width: 12rem; max-width: 15rem">
                    <template #body="slotProps">
                        <div class="overflow-hidden text-ellipsis whitespace-nowrap">
                            {{ slotProps.data.titulo }}
                        </div>
                    </template>
                </Column>

                <Column field="subtitulo" header="Subtítulo" sortable style="min-width: 12rem; max-width: 15rem">
                    <template #body="slotProps">
                        <div class="overflow-hidden text-ellipsis whitespace-nowrap">
                            {{ slotProps.data.subtitulo }}
                        </div>
                    </template>
                </Column>

                <Column field="contenido" header="Contenido" sortable style="min-width: 12rem; max-width: 15rem">
                    <template #body="slotProps">
                        <div class="overflow-hidden text-ellipsis whitespace-nowrap">
                            {{ slotProps.data.contenido }}
                        </div>
                    </template>
                </Column>

                <Column field="by" header="Autor" sortable style="min-width: 12rem"></Column>

                <Column field="categoria_id" header="Categoría" sortable style="min-width: 10rem">
                    <template #body="slotProps">
                        {{ getCategoriaNombre(slotProps.data.categoria_id) }}
                    </template>
                </Column>

                <Column field="subcategoria_id" header="Subcategoría" sortable style="min-width: 10rem">
                    <template #body="slotProps">
                        {{ getSubcategoriaNombre(slotProps.data.subcategoria_id) }}
                    </template>
                </Column>

                <Column field="multimedia" header="Multimedia" sortable style="min-width: 10rem; max-width: 12rem">
                    <template #body="slotProps">
                        <div class="overflow-hidden text-ellipsis whitespace-nowrap">
                            {{ slotProps.data.multimedia }}
                        </div>
                    </template>
                </Column>

                <Column field="likes" header="Likes" sortable style="min-width: 8rem">
                    <template #body="slotProps">
                        <span class="flex items-center gap-2">
                            <i class="pi pi-thumbs-up-fill"></i>
                            {{ slotProps.data.likes }}
                        </span>
                    </template>
                </Column>

                <Column field="dislikes" header="Dislikes" sortable style="min-width: 8rem">
                    <template #body="slotProps">
                        <span class="flex items-center gap-2">
                            <i class="pi pi-thumbs-down-fill"></i>
                            {{ slotProps.data.dislikes }}
                        </span>
                    </template>
                </Column>

                <Column field="slug" header="Slug" style="min-width: 8rem">
                    <template #body="slotProps">
                        <span class="flex items-center gap-2">
                            {{ slotProps.data.slug }}
                        </span>
                    </template>
                </Column>

                <Column field="estado_id" header="Estado" sortable style="min-width: 10rem">
                    <template #body="slotProps">
                        <Tag :value="getEstadoLabel(slotProps.data.estado_id)"
                            :severity="getEstadoSeverity(slotProps.data.estado_id)" />
                    </template>
                </Column>

                <Column field="createdAt" header="Fecha Creación" sortable style="min-width: 12rem">
                    <template #body="slotProps">
                        {{ formatDate(slotProps.data.createdAt) }}
                    </template>
                </Column>

                <Column header="Acciones" :exportable="false" style="min-width: 12rem">
                    <template #body="slotProps">
                        <Button icon="pi pi-pencil" outlined rounded class="mr-2"
                            @click="editNoticia(slotProps.data)" />
                        <Button icon="pi pi-trash" outlined rounded severity="danger"
                            @click="confirmDeleteNoticia(slotProps.data)" />
                    </template>
                </Column>
            </DataTable>
        </div>
    </div>

    <!-- Dialog para crear/editar noticia -->
    <Dialog v-model:visible="noticiaDialog" :style="{ width: '600px' }" header="Detalles de Noticia" :modal="true">
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
                <div class="col-span-6">
                    <label for="categoria" class="block font-bold mb-3">Categoría</label>
                    <Select id="categoria" v-model="noticia.categoria_id" :options="categorias" optionLabel="nombre"
                        optionValue="id_categoria" placeholder="Seleccione una Categoría" fluid />
                </div>
                <div class="col-span-6">
                    <label for="subcategoria" class="block font-bold mb-3">Subcategoría</label>
                    <Select id="subcategoria" v-model="noticia.subcategoria_id" :options="subcategorias"
                        optionLabel="nombre" optionValue="id_subcategoria" placeholder="Seleccione una Subcategoría"
                        fluid />
                </div>
                <div class="col-span-6">
                    <label for="estado" class="block font-bold mb-3">Estado</label>
                    <Select id="estado" v-model="noticia.estado_id" :options="estados" optionLabel="label"
                        optionValue="value" placeholder="Seleccione un Estado" fluid />
                </div>
            </div>

            <div>
                <label for="multimedia" class="block font-bold mb-3">Multimedia</label>
                <InputText id="multimedia" v-model.trim="noticia.multimedia" fluid />
            </div>
        </div>

        <template #footer>
            <Button label="Cancelar" icon="pi pi-times" text @click="hideDialog" />
            <Button label="Guardar" icon="pi pi-check" @click="saveNoticia" />
        </template>
    </Dialog>

    <!-- Dialog para confirmar eliminación -->
    <Dialog v-model:visible="deleteNoticiaDialog" :style="{ width: '450px' }" header="Confirmar" :modal="true">
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
    <Dialog v-model:visible="deleteNoticiasDialog" :style="{ width: '450px' }" header="Confirmar" :modal="true">
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

<script setup>
import { ref, onMounted } from 'vue';
import { FilterMatchMode } from '@primevue/core/api';
import { useToast } from 'primevue/usetoast';
import InputText from 'primevue/inputtext';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Dialog from 'primevue/dialog';
import Select from 'primevue/select';
import Toolbar from 'primevue/toolbar';
import Textarea from 'primevue/textarea';
import Button from 'primevue/button';
import Tag from 'primevue/tag';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import Editor from 'primevue/editor';
import { useNoticiaStore } from '../../stores/noticia.store.js'

const toast = useToast();

const dt = ref();

const noticias = ref([]);

const categorias = ref([]);

const subcategorias = ref([]);

const noticiaDialog = ref(false);

const deleteNoticiaDialog = ref(false);

const deleteNoticiasDialog = ref(false);

const noticia = ref({});

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

const getCategoriaNombre = (categoriaId) => {
    console.log('Buscando categoría:', categoriaId);
    console.log('Categorías disponibles:', categorias.value);

    const categoria = categorias.value.find(c => c.id_categoria === categoriaId);
    return categoria ? categoria.nombre : 'Sin categoría';
};

const getSubcategoriaNombre = (subcategoriaId) => {
    console.log('Buscando subcategoría:', subcategoriaId);
    console.log('Subcategorías disponibles:', subcategorias.value);

    const subcategoria = subcategorias.value.find(c => c.id_subcategoria === subcategoriaId);
    return subcategoria ? subcategoria.nombre : 'Sin subcategoría';
};

const formatDate = (dateString) => {
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

const getEstadoLabel = (estadoId) => {
    const estado = estados.value.find(e => e.value === estadoId);
    return estado ? estado.label : 'Desconocido';
};

const getEstadoSeverity = (estadoId) => {
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
        titulo: "",
        subtitulo: "",
        contenido: "",
        by: "",
        categoria_id: null,
        subcategoria_id: null,
        multimedia: "",
        likes: 0,
        dislikes: 0,
        vistas: 0,
        estado_id: 1,
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
            if (noticia.value.id_noticia) {
                await noticiaStore.actualizarNoticia(noticia.value.id_noticia, noticia.value);
                const index = findIndexById(noticia.value.id_noticia);
                noticias.value[index] = noticia.value;

                toast.add({
                    severity: 'success',
                    summary: 'Éxito',
                    detail: 'Noticia Actualizada',
                    life: 3000
                });
            } else {
                const nuevaNoticia = await noticiaStore.guardarNoticia(noticia.value);
                noticias.value.push(nuevaNoticia);

                toast.add({
                    severity: 'success',
                    summary: 'Éxito',
                    detail: 'Noticia Creada',
                    life: 3000
                });
            }

            noticiaDialog.value = false;
            noticia.value = {};

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



const editNoticia = (noticiaData) => {
    noticia.value = { ...noticiaData };
    noticiaDialog.value = true;
};

const confirmDeleteNoticia = (noticiaData) => {
    noticia.value = noticiaData;
    deleteNoticiaDialog.value = true;
};

const deleteNoticia = async () => {
    try {
        await noticiaStore.eliminarNoticia(noticia.value.id_noticia);
        noticias.value = noticias.value.filter(val => val.id_noticia !== noticia.value.id_noticia);
        deleteNoticiaDialog.value = false;
        noticia.value = {};
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

const findIndexById = (id) => {
    return noticias.value.findIndex(noticia => noticia.id_noticia === id);
};

const exportCSV = () => {
    dt.value.exportCSV();
};

const confirmDeleteSelected = () => {
    deleteNoticiasDialog.value = true;
};

const deleteSelectedNoticias = async () => {
    try {
        const deletePromises = selectedNoticias.value.map(n =>
            noticiaService.eliminarNoticia(n.id_noticia)
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