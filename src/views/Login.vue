<template>
    <Toast />
    <div class="login-cont">
        <div class="login-content">
            <Form v-slot="formSlot" :resolver="resolver" :initialValues="initialValues" @submit="login"
                class="flex justify-center flex-col gap-4">
                <div class="flex flex-col gap-1">
                    <IftaLabel>
                        <InputText id="email" name="email" type="text" placeholder="Ej. pedrito@gmail.com" />
                        <label for="email">Ingrese su correo</label>
                    </IftaLabel>

                    <Message v-if="(formSlot?.states as any)?.email?.invalid" severity="error" size="small"
                        variant="simple">
                        {{ (formSlot.states as any).email.error?.message }}
                    </Message>
                </div>

                <div class="flex flex-col gap-1">
                    <IftaLabel>
                        <InputText name="password" type="password" placeholder="Ej. Pass123" />
                        <label for="email">Ingrese su contraseña</label>
                    </IftaLabel>
                    <Message v-if="(formSlot?.states as any)?.password?.invalid" severity="error" size="small"
                        variant="simple">
                        {{ (formSlot.states as any).password.error?.message }}
                    </Message>
                </div>

                <Button type="submit" severity="secondary" label="Ingresar" :loading="loading" />

                <p class="register">¿No tenes cuenta? <Router-link to="register"
                        class="register-link">Registrate</Router-link></p>

            </Form>
            <div style="display: flex; align-items: center;">
                <img src="/assets/logo_infopais_sin_fondo.png" alt="Logo Infopais">
            </div>
        </div>

    </div>


</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Form } from '@primevue/forms';
import IftaLabel from 'primevue/iftalabel';
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import Message from 'primevue/message'
import Toast from 'primevue/toast'
import AuthService from '../services/auth.service'
import { useToast } from 'primevue/usetoast'
import { zodResolver } from '@primevue/forms/resolvers/zod'
import { z } from 'zod'

const router = useRouter()
const toast = useToast()

const initialValues = ref({
    email: '',
    password: ''
})

const loading = ref(false);

const resolver = zodResolver(
    z.object({
        email: z.string().min(1, { message: 'Email requerido.' }).email({ message: 'Email inválido.' }),
        password: z.string().min(1, { message: 'Password requerida.' })
    })
)

const login = async (event: any) => {

    loading.value = true;

    const { values, valid } = event

    // Si el formulario no es válido, no continuar
    if (!valid) {
        toast.add({
            severity: 'warn',
            summary: 'Faltan datos',
            detail: 'Completa email y password correctamente.',
            life: 3000
        })
        return
    }

    const { email, password } = values

    try {
        const res = await AuthService.login({ email, password })

        console.log("Respuesta cruda del backend:", res)

        const data = res.data ?? res

        console.log("Datos procesados:", data)

        // Detectar correctamente el rol_id
        const rolId = data.rol || data.user?.rol || data.usuario?.rol

        loading.value = false;

        toast.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Inicio de sesión exitoso',
            life: 3000
        })

        router.push({ name: rolId == 2 ? 'admin' : 'inicio' })

    } catch (error: any) {
        console.error("Error al iniciar sesión:", error)
        const msg = error?.response?.data?.error || 'Error al iniciar sesión.'
        toast.add({
            severity: 'error',
            summary: 'Error',
            detail: msg,
            life: 3000
        })
        loading.value = false;

    }
}
</script>

<style scoped>
form {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    gap: 2rem;
    padding: 2rem;
}

button {
    width: 15rem;
}

input {
    width: 25rem;
}

.login-cont {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100dvh;
    width: 100dvw;
    background-color: rgb(228, 228, 228);
    animation: blur-in .5s linear both
}

@keyframes blur-in {
    0% {
        filter: blur(12px);
        opacity: 0
    }

    100% {
        filter: blur(0);
        opacity: 1
    }
}

.login-content {
    display: grid;
    grid-template-columns: 1fr .9fr;
    padding: 2rem;
    height: 30rem;
    background-color: #3b82f666;
    width: 80rem;
    border-radius: 2rem;
    box-shadow: 0rem 1rem .8rem rgb(180, 180, 180);
    border: 1px solid #0062ff66;
}

.register {
    color: #0000007a;
    transition: .5s;

}

.register-link:hover {
    color: black;
    transition: .3s;
}
</style>