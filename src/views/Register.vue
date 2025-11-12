<template>
    <div id="cont-login">
        <form @submit.prevent="register">
            <div class="center content-inputs">
                <vs-input v-model="nombre" label="Nombre" placeholder="Ingrese su nombre" />
            </div>

            <vs-input v-model="fechaNac" type="date" label="Fecha de Nacimiento" />

            <div class="center content-inputs">
                <vs-input v-model="email" label="Correo" placeholder="Ingrese un correo" />
            </div>

            <div class="center content-inputs">
                <vs-input v-model="password" :type="inputType" :progress="getProgress" label="Contraseña" label-float
                    icon-after @click-icon="hasVisiblePassword = !hasVisiblePassword">
                    <template #icon>
                        <VsIconEye v-if="!hasVisiblePassword" />
                        <VsIconEyeSlash v-else />
                    </template>

                    <template v-if="getProgress >= 100" #message-success>
                        Secure password
                    </template>
                </vs-input>
            </div>


            <vs-button :active="active == 0" @click="active = 0"> Registrarse </vs-button>
        </form>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import authService from '../services/auth.service';
import router from '../router';

const nombre = ref('')
const fechaNac = ref('')
const email = ref('')
const password = ref('')

const active = ref<number>(0)

// Validaciones de password
const value = ref('')
const hasVisiblePassword = ref(false)

const inputType = computed(() =>
    hasVisiblePassword.value ? 'text' : 'password'
)

const getProgress = computed(() => {
    let progress = 0
    // at least one number
    if (/\d/.test(password.value)) {
        progress += 20
    }
    // at least one capital letter
    if (/(.*[A-Z].*)/.test(password.value)) {
        progress += 20
    }
    // at menons a lowercase
    if (/(.*[a-z].*)/.test(password.value)) {
        progress += 20
    }
    // more than 5 digits
    if (value.value.length >= 6) {
        progress += 20
    }
    // at least one special character
    if (/[^A-Za-z0-9]/.test(password.value)) {
        progress += 20
    }
    return progress
})

const register = async () => {
    try {
        const datosUser = {
            nombre: nombre.value,
            fecha_nac: fechaNac.value,
            email: email.value,
            password: password.value
        }
        const register = await authService.register(datosUser)

        if (register.mensaje === "Usuario registrado correctamente") {
            router.push({ name: "login" })
        } else {
            alert(`Error: ${register.message || "Credenciales incorrectas"}`);
        }
    } catch (error: any) {
        console.error(error.response.data.error);
        alert(error.response.data.error);
    }


}
</script>

<style scoped>
form {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 1rem;
    height: calc(100dvh - 10rem);
}
</style>