<template>
    <section>
        <form @submit.prevent="login">
            <div class="cont-email">
                <label for="email">Email</label>
                <input type="email" name="email" id="email" v-model="email">
            </div>

            <div class="cont-password">
                <label for="password">Contraseña</label>
                <input type="password" name="password" v-model="password">
            </div>

            <button type="submit">Ingresar</button>
            <p>No tenes cuenta? </p><router-link to="/register">Registrate aca!</router-link>
        </form>
    </section>


</template>

<script setup lang="ts">
import { ref } from 'vue';
import AuthService from "../services/authService";
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')

const router = useRouter()

const login = async () => {
    try {

        const data = await AuthService.login({ email: email.value, password: password.value })
        console.log("Respuesta del backend:", data);

        console.log(data)

        if (data) {
            alert(data.message);
            localStorage.setItem('token', data.token)
        }

        router.push({ name: 'inicio' })
    } catch (error: any) {
        console.error(error.response.data.error);
        alert(error.response.data.error);
    }
};


</script>

<style scoped>
section {
    height: 100dvh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

form {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 20rem;
    padding: 2rem;
}
</style>