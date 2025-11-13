<template>
    <div class="hidden">
        <vs-sidebar v-model="active" hover-expand absolute reduce open background="blue">
            <template #logo>
                <img src="../../assets/logo_min_sin_fondo.png" alt="Logo Infopais">
            </template>
            <template #header />
            <vs-sidebar-item id="home" to="/admin">
                <template #icon>
                    <vs-icon>
                        <vs-iconHomeBold />
                    </vs-icon>
                </template>
                Inicio
            </vs-sidebar-item>
            <vs-sidebar-item id="noticia-nueva" to="/admin/crear-noticia">
                <template #icon>
                    <vs-icon>
                        <vs-iconAddCircle />
                    </vs-icon>
                </template>
                Crear Noticia
            </vs-sidebar-item>
            <vs-sidebar-item id="market">
                <template #icon>
                    <vs-icon>
                        <vs-iconFolder2Bold />
                    </vs-icon>
                </template>
                Noticias
            </vs-sidebar-item>
            <vs-sidebar-item id="Music">
                <template #icon>
                    <vs-icon>
                        <vs-iconCategoryBold />
                    </vs-icon>
                </template>
                Categorias
            </vs-sidebar-item>


            <vs-sidebar-item id="donate" to="/admin/usuarios">
                <template #icon>
                    <vs-icon>
                        <vs-iconUserBold />
                    </vs-icon>
                </template>
                Usuarios
            </vs-sidebar-item>

            <template #footer>
                <vs-row justify="space-between">
                    <vs-avatar badge-color="primary" badge-position="top-right">
                        <vs-icon>
                            <vs-iconUser />
                        </vs-icon>

                        <template #badge> 0 </template>
                    </vs-avatar>

                    <!--
                    <vs-avatar>
                        <img src="/avatars/avatar-5.png" alt="" />
                    </vs-avatar>
                    -->
                </vs-row>
            </template>
        </vs-sidebar>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const active = ref('home')
</script>

<style scoped></style>