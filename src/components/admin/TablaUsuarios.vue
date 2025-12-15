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
            <Column field="nombre" header="Usuario" :showFilterMenu="false" style="width: 20%" :sortable="true">
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

            <Column field="email" header="Email" :showFilterMenu="false" style="width: 20%" :sortable="true">
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
            <Column :exportable="false" style="min-width: 20%" :showFilterMenu="false">

                <template #filter>
                    <div style="display: flex; flex-direction: row; gap: 1rem;">
                        <CrearUsuario />
                        <RefreshButtonUsuarios :onRefresh="cargarUsuarios" />

                    </div>
                </template>
                <template #body="slotProps">
                    <Button icon="pi pi-pencil" variant="outlined" rounded class="mr-2"
                        @click="editUser(slotProps.data)" />
                    <Button icon="pi pi-trash" variant="outlined" rounded severity="danger"
                        @click="confirmDeleteUser(slotProps.data)" />
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

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { FilterMatchMode } from '@primevue/core/api';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import InputText from 'primevue/inputtext';
import Select from 'primevue/select';
import Tag from 'primevue/tag';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import CrearUsuario from './CrearUsuario.vue';
import { useUsuarioStore } from '../../stores/usuario.store.js'
import { useToast } from 'primevue/usetoast'
import RefreshButtonUsuarios from './RefreshButtonUsuarios.vue'
import type { UsuarioCrear } from '../../types.ts'
import type Usuario from '../../types.ts'
import { id } from 'zod/v4/locales';


const customers = ref();

const editingRows = ref([]);

const userDialog = ref(false);

const deleteUserDialog = ref(false);

const usuario = ref({
    id: 0,
    nombre: '',
    email: '',
    password: '',
    fecha_nac: '',
    rol_id: 0
});

const usuarioCrear = ref({})

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

const usuarioStore = useUsuarioStore()

const toast = useToast()


const cargarUsuarios = async () => {
    customers.value = await usuarioStore.obtenerUsuarios();
    console.log("Usuarios cargados:", customers.value);
    loading.value = false;
}

onMounted(async () => {
    try {
        cargarUsuarios()
    } catch (error) {
        console.error("Error al obtener usuarios:", error);
        loading.value = false;
    }
});

const onRowEditSave = async (event: any) => {
    let { newData, index } = event;
    customers.value[index] = newData;
    await usuarioStore.actualizarUsuario(newData.id_usuario, newData);
};

const editUser = (data: UsuarioCrear) => {
    usuario.value = {
        nombre: data.nombre,
        email: data.email,
        password: data.password,
        fecha_nac: data.fecha_nac || '',
        rol_id: data.rol_id || 1
    };
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
            if (usuario.value.id) {
                await usuarioStore.actualizarUsuario(usuario.value.id, usuario.value);
                const index = customers.value.findIndex((u: Usuario) => u.id === usuario.value.id);
                if (index !== -1) {
                    customers.value[index] = usuario.value;
                }
            }

            userDialog.value = false;
            usuario.value = {
                nombre: '',
                email: '',
                password: '',
                fecha_nac: '',
                rol_id: 1
            };
            password.value = "";
            password2.value = "";
        } catch (error) {
            console.error("Error al guardar usuario:", error);
        }
    }
};


const confirmDeleteUser = (data: any) => {
    usuario.value = data;
    deleteUserDialog.value = true;
};

const deleteUser = async () => {
    try {
        const responseEliminar = await usuarioStore.eliminarUsuario(usuario.value.id);
        customers.value = customers.value.filter((u: Usuario) => u.id !== usuario.value.id);

        console.log(responseEliminar)

        if (responseEliminar.mensaje === 'El usuario se elimino correctamente') {
            toast.add({
                detail: 'Usuario eliminado correctamente',
                life: 3000
            });

            deleteUserDialog.value = false;
            usuario.value = {
                id: 0,
                nombre: '',
                email: '',
                password: '',
                fecha_nac: '',
                rol_id: 1
            };
        } else {
            console.error('Error al eliminar usuario')
        }

    } catch (error) {
        console.error("Error al eliminar usuario:", error);
    }
};

const getSeverity = (rol_id: number) => {
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