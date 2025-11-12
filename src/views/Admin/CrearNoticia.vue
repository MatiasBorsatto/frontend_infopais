<template>
    <form @submit.prevent="crear">
        <div class="center content-inputs">
            <vs-input v-model="titulo" color="primary" placeholder="Título" label-float style="width: 600px" />
            <vs-input v-model="subtitulo" color="primary" placeholder="Subtítulo" label-float style="width: 600px" />
            <vs-input v-model="by" color="primary" placeholder="Autor" label-float style="width: 600px" />
            <vs-input v-model="contenido" color="primary" placeholder="Contenido" label-float style="width: 600px" />
            <vs-input v-model="categoria" color="primary" placeholder="Categoría" label-float style="width: 600px" />
            <vs-input v-model="subcategoria" color="primary" placeholder="Subcategoría" label-float
                style="width: 600px" />
            <vs-input v-model="multimedia" color="primary" placeholder="URL Multimedia" label-float
                style="width: 600px" />
        </div>

        <vs-button :active="active === 0" type="submit">Guardar</vs-button>
    </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import noticiaService from '../../services/noticia.service'

// Estado de inputs
const active = ref<number>(0)
const titulo = ref('')
const subtitulo = ref('')
const by = ref('')
const contenido = ref('')
const categoria = ref('')
const subcategoria = ref('')
const multimedia = ref('')

// Crear noticia
const crear = async () => {
    // Validación simple
    if (!titulo.value || !contenido.value || !categoria.value) {
        alert('Por favor completá los campos obligatorios.')
        return
    }

    try {
        const noticia = {
            titulo: titulo.value,
            subtitulo: subtitulo.value,
            by: by.value,
            contenido: contenido.value,
            categoria: categoria.value,
            subcategoria: subcategoria.value,
            multimedia: multimedia.value
        }

        const respuesta = await noticiaService.guardarNoticia(noticia)

        console.log('Noticia creada correctamente:', respuesta)
        alert('✅ Noticia creada con éxito')

        // Limpia el formulario
        titulo.value = ''
        subtitulo.value = ''
        by.value = ''
        contenido.value = ''
        categoria.value = ''
        subcategoria.value = ''
        multimedia.value = ''
    } catch (error: any) {
        console.error('❌ Error al crear la noticia:', error)
        alert(error?.response?.data?.error || 'Hubo un error al crear la noticia.')
    }
}
</script>

<style scoped>
form {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 2rem;
    margin: 0;
    width: 100%;
}

.content-inputs {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin: 0;
    gap: 1rem;
}
</style>
