<template>
    <div>
        <div class="navbar-1">
            <div>secciones</div>
            <div>viernes, Octubre 5, 2025</div>
            <div class="navbar-1-derecha">
                <div>buscar</div>
                <div>Log In</div>
            </div>
        </div>
        <div class="navbar-2">
            <a href="index.html">
                <img src="../assets/logo_infopais.png" alt="Imagen Logo">
            </a>
        </div>
        <div class="navbar-3">
            <router-link to="/mundo">Mundo</router-link>
            <a href="#">Politica</a>
            <a href="#">Negocios</a>
            <a href="#">Opinion</a>
            <a href="#">Tecnologia</a>
            <a href="#">Ciencia</a>
            <a href="#">Salud</a>
            <a href="#">Deportes</a>
            <a href="#">Entretenimiento</a>
            <a href="#">Viajes</a>
            <a href="#">Mas</a>
        </div>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
.navbar-1 {
    display: flex;
    justify-content: space-around;
    width: 100%;
    border-bottom: 1px solid var(--borde-suave);
    padding: .4rem 0 .4rem 0;
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