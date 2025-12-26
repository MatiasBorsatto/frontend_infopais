<template>
    <div id="cont-footer">
        <div id="cont-links">
            <div>
                <img src="/assets/logo_infopais_sin_fondo.png" alt="Logo InfoPais">

            </div>

            <div id="cont-redes">
                <p>Seguinos:</p>
                <a href=""><img src="/assets/facebook-logo.svg" alt=""></a>
                <a href=""><img src="/assets/instagram-logo.svg" alt=""></a>
            </div>
        </div>
        <Divider />

        <div class="categorias">
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
        <Divider />
        <div id="cont-derecho">
            <p>Todos Los Derechos Reservados © 2025 InfoPais</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import Divider from 'primevue/divider';

</script>

<style scoped>
#cont-footer {
    display: flex;
    justify-content: center;
    align-items: center;
    height: auto;
    background-color: rgb(206, 206, 206);
    flex-direction: column;
    position: relative;
    width: 100%;
    padding-top: 1rem;
    padding-bottom: 1rem;
}

hr {
    width: 80%;
}

#cont-links {
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: row;
    width: 100%;
    height: 100%;
}

#cont-links img {
    width: 15rem;
}

#cont-derecho {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
}

#cont-redes {
    display: flex;
    justify-content: center;
    align-items: center;
}

#cont-redes img {
    width: 3rem;
}

.categorias {
    display: flex;
    width: 100%;
    gap: 1rem;
    justify-content: center;
}
</style>