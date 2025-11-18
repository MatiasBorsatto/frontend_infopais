<template>
    <div class="card" style="width: 100%; height: 100%;">
        <DataTable v-model:editingRows="editingRows" v-model:filters="filters" :value="customers" paginator :rows="10"
            editMode="row" dataKey="id" @row-edit-save="onRowEditSave" filterDisplay="row" :loading="loading"
            :globalFilterFields="['nombre', 'rol_id']" :pt="{
                column: {
                    bodycell: ({ state }) => ({
                        style: state['d_editing'] && 'padding-top: 0.75rem; padding-bottom: 0.75rem'
                    })
                }
            }"
            style="width: 100%; height: 100%; display: flex; flex-direction: column; justify-content: space-between;">

            <template #empty> No se encontraron usuarios. </template>
            <template #loading> Cargando usuarios. Por favor espere. </template>

            <Column field="id_usuario" header="ID" :showFilterMenu="false" style="width: 5%" :sortable="true">
                <template #body="{ data, field }">
                    <div class="flex items-center gap-2">
                        <span>{{ data[field] }}</span>
                    </div>
                </template>
                <template #editor="{ data, field }">
                    <InputText v-model="data[field]" fluid />
                </template>
            </Column>

            <!-- Columna Usuario con filtro y edición -->
            <Column field="nombre" header="Usuario" :showFilterMenu="false" style="width: 25%" :sortable="true">
                <template #body="{ data, field }">
                    <div class="flex items-center gap-2">
                        <span>{{ data[field] }}</span>
                    </div>
                </template>
                <template #editor="{ data, field }">
                    <InputText v-model="data[field]" fluid />
                </template>
                <template #filter="{ filterModel, filterCallback }">
                    <InputText v-model="filterModel.value" type="text" @input="filterCallback()"
                        placeholder="Buscar por nombre" class="p-column-filter" />
                </template>
            </Column>

            <Column field="email" header="Email" :showFilterMenu="false" style="width: 30%" :sortable="true">
                <template #body="{ data, field }">
                    <div class="flex items-center gap-2">
                        <span>{{ data[field] }}</span>
                    </div>
                </template>
                <template #editor="{ data, field }">
                    <InputText v-model="data[field]" fluid />
                </template>
            </Column>

            <Column field="fecha_nac" header="Fecha de Nacimiento" :showFilterMenu="false" style="width: 30%"
                :sortable="true">
                <template #body="{ data, field }">
                    <div class="flex items-center gap-2">
                        <span>{{ data[field] }}</span>
                    </div>
                </template>
                <template #editor="{ data, field }">
                    <InputText v-model="data[field]" fluid />
                </template>
            </Column>

            <!-- Columna Rol con filtro y edición -->
            <Column field="rol_id" header="Rol" :showFilterMenu="false" style="width: 15%" :sortable="true">
                <template #body="{ data }">
                    <Tag :value="data.rol_id === 2 ? 'Admin' : 'Estandar'" :severity="getSeverity(data.rol_id)" />
                </template>
                <template #editor="{ data, field }">
                    <Select v-model="data[field]" :options="statuses" optionLabel="label" optionValue="value"
                        placeholder="Seleccionar Rol" fluid>
                        <template #option="slotProps">
                            <Tag :value="slotProps.option.label" :severity="getSeverity(slotProps.option.value)" />
                        </template>
                    </Select>
                </template>
                <template #filter="{ filterModel, filterCallback }">
                    <Select v-model="filterModel.value" @change="filterCallback()" :options="statuses"
                        optionLabel="label" optionValue="value" placeholder="Seleccionar Rol" class="p-column-filter"
                        :showClear="true" />
                </template>
            </Column>

            <!-- Columna de edición -->
            <Column :exportable="false" style="min-width: 10%">
                <template #body="slotProps">
                    <Button icon="pi pi-pencil" variant="outlined" rounded class="mr-2"
                        @click="editUser(slotProps.data)" />
                    <Button icon="pi pi-trash" variant="outlined" rounded severity="danger"
                        @click="confirmDeleteUser(slotProps.data)" />
                </template>
            </Column>

            <Column>
                <template #filter>
                    <CrearUsuario />
                </template>
            </Column>

        </DataTable>
    </div>

    <!-- Diálogo para editar usuario -->
    <Dialog v-model:visible="userDialog" :style="{ width: '450px' }" header="Detalles del Usuario" :modal="true">
        <div class="flex flex-col gap-6">
            <div>
                <label for="nombre" class="block font-bold mb-3">Nombre de Usuario</label>
                <InputText id="nombre" v-model.trim="usuario.nombre" required="true" autofocus
                    :invalid="submitted && !usuario.nombre" fluid />
                <small v-if="submitted && !usuario.nombre" class="text-red-500">El nombre es requerido.</small>
            </div>

            <div>
                <label for="email" class="block font-bold mb-3">Email</label>
                <InputText id="email" v-model.trim="usuario.email" required="true" autofocus
                    :invalid="submitted && !usuario.email" fluid />
                <small v-if="submitted && !usuario.email" class="text-red-500">El email es requerido.</small>
            </div>

            <div>
                <label for="password" class="block font-bold mb-3">Nueva contraseña</label>
                <InputText id="password" v-model.trim="password" required="true" autofocus
                    :invalid="submitted && password != password2" fluid />
                <small v-if="submitted && !password" class="text-red-500">El email es requerido.</small>
            </div>

            <div>
                <label for="password2" class="block font-bold mb-3">Confirmar contraseña nueva</label>
                <InputText id="password2" v-model.trim="password2" required="true" autofocus
                    :invalid="submitted && password != password2" fluid />
                <small v-if="submitted && !password" class="text-red-500">Las contraseñas con coinciden.</small>
            </div>


            <div>
                <label for="rol" class="block font-bold mb-3">Rol</label>
                <Select id="rol" v-model="usuario.rol_id" :options="statuses" optionLabel="label" optionValue="value"
                    placeholder="Seleccionar Rol" fluid>
                    <template #option="slotProps">
                        <Tag :value="slotProps.option.label" :severity="getSeverity(slotProps.option.value)" />
                    </template>
                </Select>
            </div>
        </div>

        <template #footer>
            <Button label="Cancelar" icon="pi pi-times" text @click="hideDialog" />
            <Button label="Guardar" icon="pi pi-check" @click="saveUser" />
        </template>
    </Dialog>

    <!-- Diálogo de confirmación para eliminar usuario -->
    <Dialog v-model:visible="deleteUserDialog" :style="{ width: '450px' }" header="Confirmar" :modal="true">
        <div class="flex items-center gap-4">
            <i class="pi pi-exclamation-triangle !text-3xl" />
            <span v-if="usuario">¿Está seguro que desea eliminar a <b>{{ usuario.nombre }}</b>?</span>
        </div>
        <template #footer>
            <Button label="No" icon="pi pi-times" text @click="deleteUserDialog = false" severity="secondary"
                variant="text" />
            <Button label="Sí" icon="pi pi-check" @click="deleteUser" severity="danger" />
        </template>
    </Dialog>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { FilterMatchMode } from '@primevue/core/api';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import InputText from 'primevue/inputtext';
import Select from 'primevue/select';
import Tag from 'primevue/tag';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import usuarioService from '../../services/usuario.service';
import CrearUsuario from '../admin/CrearUsuario.vue';

const customers = ref();
const editingRows = ref([]);
const userDialog = ref(false);
const deleteUserDialog = ref(false);
const usuario = ref({});
const password = ref('')
const password2 = ref('')
const submitted = ref(false);

const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    nombre: { value: null, matchMode: FilterMatchMode.CONTAINS },
    rol_id: { value: null, matchMode: FilterMatchMode.EQUALS },
});

const statuses = ref([
    { label: 'Admin', value: 2 },
    { label: 'Estandar', value: 1 }
]);

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

const onRowEditSave = async (event) => {
    let { newData, index } = event;
    customers.value[index] = newData;
    await usuarioService.actualizarUsuario(newData.id_usuario, newData);
};

const editUser = (data) => {
    usuario.value = { ...data };
    userDialog.value = true;
};

const hideDialog = () => {
    userDialog.value = false;
    submitted.value = false;
};

const saveUser = async () => {
    submitted.value = true;

    if (password.value !== password2.value) {
        console.log("Las contraseñas no coinciden");
        return;
    }

    usuario.value.password = password.value;

    console.log('El password es', usuario.value.password);

    if (usuario.value.nombre?.trim()) {
        try {
            if (usuario.value.id_usuario) {
                await usuarioService.actualizarUsuario(usuario.value.id_usuario, usuario.value);
                const index = customers.value.findIndex(u => u.id_usuario === usuario.value.id_usuario);
                if (index !== -1) {
                    customers.value[index] = usuario.value;
                }
            }

            userDialog.value = false;
            usuario.value = {};
            password.value = "";
            password2.value = "";
        } catch (error) {
            console.error("Error al guardar usuario:", error);
        }
    }
};


const confirmDeleteUser = (data) => {
    usuario.value = data;
    deleteUserDialog.value = true;
};

const deleteUser = async () => {
    try {
        await usuarioService.eliminarUsuario(usuario.value.id_usuario);
        customers.value = customers.value.filter(u => u.id_usuario !== usuario.value.id_usuario);
        deleteUserDialog.value = false;
        usuario.value = {};
    } catch (error) {
        console.error("Error al eliminar usuario:", error);
    }
};

const getSeverity = (rol_id) => {
    switch (rol_id) {
        case 2:
            return 'danger';
        case 1:
            return 'success';
        default:
            return 'info';
    }
};
</script>