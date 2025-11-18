<template>
    <div class="card flex justify-center">
        <Form v-slot="$form" :resolver="resolver" :initialValues="initialValues" @submit="onFormSubmit"
            class="flex flex-col gap-4 w-full sm:w-96">

            <h2 class="text-2xl font-bold text-center mb-2">Registro</h2>

            <!-- Campo Nombre -->
            <div class="flex flex-col gap-1">
                <label for="nombre" class="font-semibold text-sm">Nombre</label>
                <InputText id="nombre" name="nombre" v-model="nombre" type="text" placeholder="Ingresa tu nombre"
                    fluid />
                <Message v-if="$form.nombre?.invalid" severity="error" size="small" variant="simple">
                    {{ $form.nombre.error?.message }}
                </Message>
            </div>

            <!-- Campo Fecha de Nacimiento -->
            <div class="flex flex-col gap-1">
                <label for="fechaNac" class="font-semibold text-sm">Fecha de Nacimiento</label>
                <InputText id="fechaNac" name="fechaNac" v-model="fechaNac" type="date" fluid />
                <Message v-if="$form.fechaNac?.invalid" severity="error" size="small" variant="simple">
                    {{ $form.fechaNac.error?.message }}
                </Message>
            </div>

            <!-- Campo Email -->
            <div class="flex flex-col gap-1">
                <label for="email" class="font-semibold text-sm">Email</label>
                <InputText id="email" name="email" v-model="email" type="email" placeholder="tu@email.com" fluid />
                <Message v-if="$form.email?.invalid" severity="error" size="small" variant="simple">
                    {{ $form.email.error?.message }}
                </Message>
            </div>

            <!-- Campo Password -->
            <div class="flex flex-col gap-1">
                <label for="password" class="font-semibold text-sm">Contraseña</label>
                <Password id="password" name="password" v-model="password" placeholder="Contraseña" :feedback="false"
                    toggleMask fluid />
                <Message v-if="$form.password?.invalid" severity="error" size="small" variant="simple">
                    {{ $form.password.error?.message }}
                </Message>
            </div>

            <Button type="submit" severity="secondary" label="Registrarse" class="mt-2" />
        </Form>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import authService from '../services/auth.service';
import router from '../router';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Button from 'primevue/button';
import Message from 'primevue/message';
import { Form } from '@primevue/forms';
import { zodResolver } from '@primevue/forms/resolvers/zod';
import { useToast } from "primevue/usetoast";
import { z } from 'zod';

const nombre = ref('');
const fechaNac = ref('');
const email = ref('');
const password = ref('');

const toast = useToast();

const initialValues = ref({
    nombre: '',
    fechaNac: '',
    email: '',
    password: ''
});

const resolver = ref(zodResolver(
    z.object({
        nombre: z.string().min(1, { message: 'El nombre es requerido.' }),
        fechaNac: z.string().min(1, { message: 'La fecha de nacimiento es requerida.' }),
        email: z.string().min(1, { message: 'El email es requerido.' }).email({ message: 'Email inválido.' }),
        password: z.string().min(6, { message: 'La contraseña debe tener al menos 6 caracteres.' })
    })
));

const onFormSubmit = async ({ valid }: { valid: boolean }) => {
    if (valid) {
        try {
            const datosUser = {
                nombre: nombre.value,
                fecha_nac: fechaNac.value,
                email: email.value,
                password: password.value
            };


            const register = await authService.register(datosUser);

            console.log(register)

            if (register.mensaje === "Usuario registrado correctamente") {
                toast.add({
                    severity: 'success',
                    summary: 'Registro exitoso',
                    detail: 'Usuario registrado correctamente',
                    life: 3000
                });
                router.push({ name: "login" });
            }

            if (register.error) {
                toast.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: register.message || "Error al registrar usuario",
                    life: 3000
                });
            }


        } catch (error: any) {
            console.error(error.response?.data?.error);
            toast.add({
                severity: 'error',
                summary: 'Error',
                detail: error.response?.data?.error || 'Error al registrar',
                life: 3000
            });
        }
    }
}

</script>

<style scoped>
.card {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: calc(100dvh - 10rem);
    padding: 2rem 1rem;
}
</style>