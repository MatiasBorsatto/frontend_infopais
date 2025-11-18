<template>
    <div>
        <div class="card">
            <Toolbar class="mb-6">
                <template #start>
                    <Button label="Nueva" icon="pi pi-plus" class="mr-2" @click="openNew" />
                    <Button label="Eliminar" icon="pi pi-trash" severity="danger" variant="outlined"
                        @click="confirmDeleteSelected" :disabled="!selectedNoticias || !selectedNoticias.length" />
                </template>
                <template #end>
                    <Button label="Exportar" icon="pi pi-upload" severity="secondary" @click="exportCSV($event)" />
                </template>
            </Toolbar>

            <DataTable ref="dt" v-model:selection="selectedNoticias" :value="noticias" dataKey="id_noticia"
                :paginator="true" :rows="10" :filters="filters"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                :rowsPerPageOptions="[5, 10, 25]"
                currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} noticias">

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

                <Column field="titulo" header="Título" sortable style="min-width: 20rem"></Column>

                <Column field="subtitulo" header="Subtítulo" sortable style="min-width: 20rem"></Column>

                <Column field="by" header="Autor" sortable style="min-width: 12rem"></Column>

                <Column field="categoria_id" header="Categoría" sortable style="min-width: 10rem"></Column>

                <Column field="multimedia" header="Multimedia" sortable style="min-width: 10rem"></Column>

                <Column field="likes" header="Likes" sortable style="min-width: 8rem">
                    <template #body="slotProps">
                        <span class="flex items-center gap-2">
                            <i class="pi pi-heart"></i>
                            {{ slotProps.data.likes }}
                        </span>
                    </template>
                </Column>

                <Column field="dislikes" header="Dislikes" sortable style="min-width: 8rem">
                    <template #body="slotProps">
                        <span class="flex items-center gap-2">
                            <i class="pi pi-heart-fill" style="transform: rotate(180deg)"></i>
                            {{ slotProps.data.dislikes }}
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
                    <Textarea id="contenido" v-model="noticia.contenido" required="true" rows="5" cols="20" fluid />
                </div>

                <div>
                    <label for="by" class="block font-bold mb-3">Autor</label>
                    <InputText id="by" v-model.trim="noticia.by" fluid />
                </div>

                <div class="grid grid-cols-12 gap-4">
                    <div class="col-span-6">
                        <label for="categoria" class="block font-bold mb-3">Categoría</label>
                        <InputNumber id="categoria" v-model="noticia.categoria_id" fluid />
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
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { FilterMatchMode } from '@primevue/core/api';
import { useToast } from 'primevue/usetoast';
import InputText from 'primevue/inputtext';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';
import Row from 'primevue/row';
import Dialog from 'primevue/dialog';
import Select from 'primevue/select';

import InputNumber from 'primevue/inputnumber';


import Textarea from 'primevue/textarea';

import Button from 'primevue/button';

// Importa tu servicio de noticias
// import { NoticiasService } from '@/services/NoticiasService';

const toast = useToast();
const dt = ref();
const noticias = ref([]);
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

onMounted(() => {
    // Reemplaza esto con tu llamada real al backend
    // NoticiasService.getNoticias().then((data) => (noticias.value = data));

    // Datos de ejemplo basados en tu estructura
    noticias.value = [
        {
            id_noticia: 5,
            titulo: 'que onda este titulo?',
            subtitulo: 'y este subtitulo',
            by: 'Matias Borsatto',
            contenido: 'test',
            categoria_id: 3,
            multimedia: 'test',
            subcategoria_id: 1,
            estado_id: 1,
            likes: 0,
            dislikes: 0,
            createdAt: '2025-11-13T18:35:01.617Z',
            updatedAt: '2025-11-13T18:35:01.617Z',
            usuario_id: null,
            vistas: 0
        }
    ];
});

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
        likes: 0,
        dislikes: 0,
        vistas: 0,
        estado_id: 1
    };
    submitted.value = false;
    noticiaDialog.value = true;
};

const hideDialog = () => {
    noticiaDialog.value = false;
    submitted.value = false;
};

const saveNoticia = () => {
    submitted.value = true;

    if (noticia?.value.titulo?.trim()) {
        if (noticia.value.id_noticia) {
            // Actualizar noticia existente
            const index = findIndexById(noticia.value.id_noticia);
            noticias.value[index] = noticia.value;
            toast.add({
                severity: 'success',
                summary: 'Éxito',
                detail: 'Noticia Actualizada',
                life: 3000
            });
        } else {
            // Crear nueva noticia
            noticia.value.id_noticia = createId();
            noticia.value.createdAt = new Date().toISOString();
            noticia.value.updatedAt = new Date().toISOString();
            noticias.value.push(noticia.value);
            toast.add({
                severity: 'success',
                summary: 'Éxito',
                detail: 'Noticia Creada',
                life: 3000
            });
        }

        noticiaDialog.value = false;
        noticia.value = {};
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

const deleteNoticia = () => {
    noticias.value = noticias.value.filter(val => val.id_noticia !== noticia.value.id_noticia);
    deleteNoticiaDialog.value = false;
    noticia.value = {};
    toast.add({
        severity: 'success',
        summary: 'Éxito',
        detail: 'Noticia Eliminada',
        life: 3000
    });
};

const findIndexById = (id) => {
    return noticias.value.findIndex(noticia => noticia.id_noticia === id);
};

const createId = () => {
    // En producción, el ID debería venir del backend
    return Math.floor(Math.random() * 10000);
};

const exportCSV = () => {
    dt.value.exportCSV();
};

const confirmDeleteSelected = () => {
    deleteNoticiasDialog.value = true;
};

const deleteSelectedNoticias = () => {
    noticias.value = noticias.value.filter(val => !selectedNoticias.value.includes(val));
    deleteNoticiasDialog.value = false;
    selectedNoticias.value = null;
    toast.add({
        severity: 'success',
        summary: 'Éxito',
        detail: 'Noticias Eliminadas',
        life: 3000
    });
};
</script>