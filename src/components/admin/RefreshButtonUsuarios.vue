<template>
    <div class="card flex justify-center">
        <Button type="button" icon="pi pi-refresh" :loading="loading" @click="load" severity="secondary" />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Button from 'primevue/button'
import { useToast } from 'primevue/usetoast'

const toast = useToast()

// Recibir la función
const props = defineProps({
    onRefresh: {
        type: Function,
        required: true
    }
})

const loading = ref(false)

const load = async () => {
    loading.value = true

    await props.onRefresh()  // 👈 Ejecuta la función del padre

    toast.add({
        severity: 'success',
        summary: 'Éxito',
        detail: 'Usuarios recargados correctamente',
        life: 3000
    })

    loading.value = false
}
</script>
