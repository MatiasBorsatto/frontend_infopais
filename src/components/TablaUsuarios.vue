<template>
    <div class="card" style="width: 100%; height: 100%;">
        <DataTable v-model:filters="filters" :value="customers" paginator :rows="10" dataKey="id" filterDisplay="row"
            :loading="loading" :globalFilterFields="['nombre', 'status']">

            <template #header>
                <div class="flex justify-end">
                    <IconField>
                        <InputIcon>
                            <i class="pi pi-search" />
                        </InputIcon>
                        <InputText v-model="filters['global'].value" placeholder="Búsqueda general" />
                    </IconField>
                </div>
            </template>

            <template #empty> No se encontraron usuarios. </template>
            <template #loading> Cargando usuarios. Por favor espere. </template>

            <!-- Columna Usuario con filtro -->
            <Column field="nombre" header="Usuario" filterField="nombre" :showFilterMenu="false"
                style="min-width: 14rem">
                <template #body="{ data }">
                    <div class="flex items-center gap-2">
                        <span>{{ data.nombre }}</span>
                    </div>
                </template>
                <template #filter="{ filterModel, filterCallback }">
                    <InputText v-model="filterModel.value" type="text" @input="filterCallback()"
                        placeholder="Buscar por nombre" class="p-column-filter" />
                </template>
            </Column>

            <!-- Columna Status con filtro dropdown -->
            <!-- Columna Status con filtro dropdown -->
            <Column field="rol_id" header="Rol" filterField="rol_id" :showFilterMenu="false" style="min-width: 12rem">
                <template #body="{ data }">
                    <Tag :value="data.rol_id === 2 ? 'Admin' : 'Estandar'" />
                </template>

                <template #filter="{ filterModel, filterCallback }">
                    <Select v-model="filterModel.value" @change="filterCallback()" :options="statuses"
                        optionLabel="label" optionValue="value" placeholder="Seleccionar Rol" class="p-column-filter"
                        :showClear="true" />
                </template>
            </Column>
            <Column :rowEditor="true" style="width: 10%; min-width: 8rem" bodyStyle="text-align:center"></Column>

        </DataTable>
    </div>
</template>

<script setup>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import InputText from 'primevue/inputtext';
import Select from 'primevue/select';
import Checkbox from 'primevue/checkbox';
import Tag from 'primevue/tag';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';

import usuarioService from '../services/usuario.service';

import { ref, onMounted } from 'vue';
import { FilterMatchMode } from '@primevue/core/api';

const customers = ref();
const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    nombre: { value: null, matchMode: FilterMatchMode.CONTAINS },
    rol_id: { value: null, matchMode: FilterMatchMode.EQUALS },
});

const statuses = ref([{ label: 'Admin', value: 2 }, { label: 'Estandar', value: 1 }]);
const loading = ref(true);

onMounted(async () => {
    try {
        customers.value = await usuarioService.obtenerUsuarios();
        console.log("Usuarios cargados:", customers.value);
        loading.value = false;
    } catch (error) {
        console.error("Error al obtener usuarios:", error);
        loading.value = false;
    }
});

const getSeverity = (status) => {
    switch (status) {
        case 'Admin':
            return 'danger';
        case 'Estandar':
            return 'success';
        default:
            return 'info';
    }
};
</script>