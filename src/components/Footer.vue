<template>
    <div id="cont-footer">
        <div id="cont-links">
            <div>
                <img src="../assets/logo_infopais_sin_fondo.png" alt="Logo InfoPais">

            </div>

            <div id="cont-redes">
                <p>Seguinos:</p>
                <a href=""><img src="../assets/facebook-logo.svg" alt=""></a>
                <a href=""><img src="../assets/instagram-logo.svg" alt=""></a>
            </div>
        </div>
        <hr>
        <div id="cont-derecho">
            <p>Todos Los Derechos Reservados © 2025 InfoPais</p>
        </div>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
#cont-footer {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 10rem;
    background-color: rgb(206, 206, 206);
    flex-direction: column;
    position: relative;
    width: 100%;
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
    width: 5rem;
}
</style>