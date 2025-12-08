<template>
    <div>
        <Button label="Crear Usuario" @click="visible = true" style="width: 10rem;" />

        <Dialog v-model:visible="visible" header="Crear Usuario">
            <div class="flex flex-column gap-3" style=" width: 25rem; display: flex;
        flex-direction: column;" :validar="validacion">

                <span class="text-surface-500 block">Ingrese los datos:</span>

                <div class="flex items-center gap-2">
                    <label class="w-28 font-semibold">Nombre</label>
                    <InputText v-model="nombre" class="flex-auto" />
                </div>

                <div class="flex items-center gap-2">
                    <label class="w-28 font-semibold">Email</label>
                    <InputText v-model="email" class="flex-auto" />
                </div>

                <div class="flex items-center gap-2">
                    <label class="w-28 font-semibold">Contraseña</label>
                    <InputText v-model="password" class="flex-auto" />
                </div>

                <div class="flex items-center gap-2">
                    <label class="w-28 font-semibold">Rol</label>
                    <Select v-model="rol" :options="roles" optionLabel="name" placeholder="Elegir rol"
                        class="w-full md:w-56" />
                </div>


                <div class="flex justify-end gap-2 mt-4">
                    <Button label="Cancelar" severity="secondary" @click="visible = false" />
                    <Button label="Guardar" @click="guardarUsuario" />
                </div>

            </div>
        </Dialog>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Select from 'primevue/select';
import usuarioService from '../../services/usuario.service';
import authService from '../../services/auth.service';
import { useUsuarioStore } from '../../stores/usuario.store.js'
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'
import { zodResolver } from '@primevue/forms/resolvers/zod'
import { z } from 'zod'


const visible = ref(false);
const nombre = ref('');
const email = ref('');
const password = ref('');
const rol = ref();

const toast = useToast()

const roles = ref([
    { name: 'Admin', rol_id: 2 },
    { name: 'Estandar', rol_id: 1 },
]);

const usuarioStore = useUsuarioStore()

const props = defineProps({
    onRefresh: {
        type: Function,
        required: true
    }
})

const guardarUsuario = async () => {
    try {

        const usuario = {
            nombre: nombre.value,
            email: email.value,
            password: password.value,
            rol_id: rol.value?.rol_id,
            fecha_nac: '01/01/1001'
        };


        const response = await usuarioStore.guardarUsuario(usuario)


        visible.value = false;

        toast.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Usuario creado correctamente',
            life: 3000
        })

        //await props.onRefresh()

        console.log("Usuario creado:", usuario);

    } catch (error) {

        console.log("La respuesta es", error)

        visible.value = true;

        toast.add({
            severity: 'error',
            summary: 'Error',
            detail: error.response?.data?.error || 'Error al crear usuario',
            life: 3000
        });
    }

}

const validacion = z.object({
    nombre: z.string().min(1, "El nombre es obligatorio."),
    email: z.string().email("Debe ser un email válido."),
    password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres."),
    rol: z.object({
        name: z.string(),
        rol_id: z.number(),
    }, "Debes seleccionar un rol")
});

</script>
