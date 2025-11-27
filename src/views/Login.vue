<template>
    <Toast />
    <Form v-slot="formSlot" :resolver="resolver" :initialValues="initialValues" @submit="login"
        class="flex justify-center flex-col gap-4">
        <div class="flex flex-col gap-1">
            <InputText name="email" type="text" placeholder="email" />
            <Message v-if="(formSlot?.states as any)?.email?.invalid" severity="error" size="small" variant="simple">
                {{ (formSlot.states as any).email.error?.message }}
            </Message>
        </div>

        <div class="flex flex-col gap-1">
            <InputText name="password" type="password" placeholder="password" />
            <Message v-if="(formSlot?.states as any)?.password?.invalid" severity="error" size="small" variant="simple">
                {{ (formSlot.states as any).password.error?.message }}
            </Message>
        </div>

        <Button type="submit" severity="secondary" label="Submit" />
    </Form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Form from '@primevue/forms/form'
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

const resolver = zodResolver(
    z.object({
        email: z.string().min(1, { message: 'Email requerido.' }).email({ message: 'Email inválido.' }),
        password: z.string().min(1, { message: 'Password requerida.' })
    })
)

const login = async (event: any) => {
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
    height: calc(100vh - 10rem);
    padding: 2rem;
}
</style>