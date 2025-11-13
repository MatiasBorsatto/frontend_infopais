<template>
    <div>
        <div class="navbar-1">
            <div>secciones</div>
            <div>viernes, Octubre 5, 2025</div>
            <div class="navbar-1-derecha">
                <div>buscar</div>
                <router-link to="login">Login</router-link>
            </div>
        </div>
        <div class="navbar-2">
            <router-link to="/">
                <img src="../assets/logo_infopais.png" alt="Imagen Logo">
            </router-link>
        </div>
        <div class="navbar-3">
            <router-link to="/mundo">Mundo</router-link>
            <router-link to="/politica">Politica</router-link>
            <router-link to="/negocios">Negocios</router-link>
            <router-link to="/opinion">Opinion</router-link>
            <router-link to="/tecnologia">Tecnologia</router-link>
            <router-link to="/ciencia">Ciencia</router-link>
            <router-link to="/salud">Salud</router-link>
            <router-link to="/deportes">Deportes</router-link>
            <router-link to="/entretenimiento">Entretenimiento</router-link>
            <router-link to="/viajes">Viajes</router-link>
            <router-link to="/mas">Mas</router-link>
        </div>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
.navbar-1 {
    display: flex;
    justify-content: space-around;
    width: 100dvw;
    border-bottom: 1px solid var(--borde-suave);
    padding: .4rem 0 .4rem 0;
    font-weight: 300;
}

.navbar-1-derecha {
    display: flex;
    gap: 1rem;
}

.navbar-2 {
    display: flex;
    justify-content: center;
    width: 100%;
}

.navbar-2 img {
    width: 15rem;
    margin: 1rem 0rem 1rem 0rem;
}

.navbar-3 {
    display: flex;
    justify-content: center;
    gap: 2rem;
    margin: 0rem 0rem 1rem 0rem;
    padding: 5px;
    border-top: 1px solid var(--borde-suave);
    border-bottom: 1px solid var(--borde-suave);
}

.navbar-3 a {
    text-decoration: none;
    color: black;
}
</style>