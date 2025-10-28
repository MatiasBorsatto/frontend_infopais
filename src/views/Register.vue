<template>
    <form @submit.prevent="register">
        <label for="">Nombre</label>
        <input type="text" v-model="nombre">

        <label for="">Fecha de Nacimiento</label>
        <input type="date" v-model="fechaNac">

        <label for="">email</label>
        <input type="email" v-model="email">

        <label for="">Contraseña</label>
        <input type="password" v-model="password">

        <button type="submit">Registrarse</button>
    </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import authService from '../services/auth.service';

const nombre = ref('')
const fechaNac = ref('')
const email = ref('')
const password = ref('')

const register = async () => {
    try {
        const datosUser = {
            nombre: nombre.value,
            fecha_nacimiento: fechaNac.value,
            email: email.value,
            password: password.value
        }
        const register = await authService.register(datosUser)

        if (register.ok) {
            alert(register);
        } else {
            alert(`Error: ${register.message || "Credenciales incorrectas"}`);
        }
    } catch (error: any) {
        console.error(error.response.data.error);
        alert(error.response.data.error);
    }


}
</script>

<style scoped></style>