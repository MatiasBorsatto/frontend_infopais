<template>
    <form @submit.prevent="login">
        <div class="center content-inputs">
            <vs-input v-model="email" type="email" placeholder="Email" required />
        </div>

        <div class="center content-inputs">
            <vs-input v-model="password" type="password" placeholder="Contraseña" required />
        </div>

        <vs-button> Ingresar </vs-button>
    </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import AuthService from '../services/auth.service'

const email = ref('')
const password = ref('')
const router = useRouter()

const login = async () => {
    if (!email.value || !password.value) {
        alert('Por favor completa todos los campos.')
        return
    }

    try {
        const res = await AuthService.login({
            email: email.value,
            password: password.value
        })

        console.log("Respuesta cruda del backend:", res)

        // ⚙️ Si usás axios, probablemente el dato esté en res.data
        const data = res.data ? res.data : res

        console.log("Datos procesados:", data)

        // Guarda token si existe
        if (data.token) {
            localStorage.setItem('token', data.token)
        }

        if (data.message) {
            alert(data.message)
        }

        // Detectar correctamente el rol_id sin importar el tipo
        const rolId = data.rol || data.user?.rol || data.usuario?.rol

        if (rolId == 2) {
            router.push({ name: 'admin' })
        } else {
            router.push({ name: 'inicio' })
        }

    } catch (error: any) {
        console.error("Error al iniciar sesión:", error)
        const msg = error?.response?.data?.error || 'Error al iniciar sesión.'
        alert(msg)
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
