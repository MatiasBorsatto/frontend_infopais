<template>
    <div class="center">
        <vs-table class="tabla">
            <template #thead>
                <vs-tr>
                    <vs-th> Nombre </vs-th>
                    <vs-th> Email </vs-th>
                    <vs-th> Id </vs-th>
                </vs-tr>
            </template>
            <template #tbody>
                <vs-tr v-for="(usuario, i) in users" :key="usuario.id" :data="usuario.nombre">
                    <vs-td>
                        {{ usuario.nombre }}
                    </vs-td>
                    <vs-td>
                        {{ usuario.email }}
                    </vs-td>
                    <vs-td>
                        {{ usuario.id }}
                    </vs-td>

                    <template #expand>
                        <div class="con-content">
                            <div>
                                <vs-avatar>
                                    <img :src="`/avatars/avatar-${i + 1}.png`" alt="" />
                                </vs-avatar>
                                <p>
                                    {{ usuario.nombre }}
                                </p>
                            </div>
                            <div>
                                <vs-button type="flat" icon>
                                    <i class="bx bx-lock-open-alt" />
                                </vs-button>
                                <vs-button type="flat" icon> Send Email </vs-button>
                                <vs-button type="border" color="danger">
                                    Remove User
                                </vs-button>
                            </div>
                        </div>
                    </template>
                </vs-tr>
            </template>
        </vs-table>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import usuarioService from '../../services/usuario.service.js'
import type { Usuario as ServiceUsuario } from '../../services/usuario.service.js'

let users = ref<ServiceUsuario[]>([])

onMounted(async () => {
    try {
        users.value = await usuarioService.obtenerUsuarios();
        console.log("Usuarios cargados:", users.value);
    } catch (error) {
        console.error("Error al obtener usuarios:", error);
    }
});


</script>


<style scoped>
.center {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
}

.tabla {
    display: flex;
    width: 85%;
    height: 80vh;
    overflow-y: auto;
}
</style>