<template>
    <form @submit.prevent="crear">
        <div class="center content-inputs">
            <vs-input v-model="titulo" color="primary" placeholder="Título" label-float style="width: 600px" />
            <vs-input v-model="subtitulo" color="primary" placeholder="Subtítulo" label-float style="width: 600px" />
            <vs-input v-model="by" color="primary" placeholder="Autor" label-float style="width: 600px" />
            <vs-input v-model="contenido" color="primary" placeholder="Contenido" label-float style="width: 600px" />
            <vs-select v-model="categoria" label="Categorías" label-float class="select-extend"
                :placeholder="'Seleccioná una categoría'">
                <template #default>
                    <vs-option v-for="c in categoriaCont" :key="c.id_categoria" :value="c.nombre">
                        {{ c.nombre }}
                    </vs-option>
                </template>
            </vs-select>


            <vs-select v-model="subcategoria" label="Subcategorías" label-float class="select-extend">
                <vs-option v-for="sc in subcategoriaCont" :key="sc.id_subcategoria" :value="sc.nombre">
                    {{ sc.nombre }}
                </vs-option>
            </vs-select>


            <vs-input v-model="multimedia" color="primary" placeholder="URL Multimedia" label-float
                style="width: 600px" />
        </div>

        <vs-button :active="active === 0">Guardar</vs-button>
    </form>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import noticiaService, { type Noticia } from '../../services/noticia.service'

// Estado de inputs
const active = ref<number>(0)
const titulo = ref('')
const subtitulo = ref('')
const by = ref('')
const contenido = ref('')

// Lista de categorías accesible en template
const categoriaCont = ref<any[]>([])
const subcategoriaCont = ref<any[]>([])

onMounted(async () => {
    const categorias = await noticiaService.obtenerCategorias()
    console.log(categorias)
    categoriaCont.value = categorias.obtenerCategorias

    const subcategorias = await noticiaService.obtenerSubcategorias()
    console.log(subcategorias)
    subcategoriaCont.value = subcategorias.obtenerSubcategorias
})


const categoria = ref<number | string | null>(null)

const subcategoria = ref<number | string | null>(null)
const multimedia = ref('')

// Crear noticia
const crear = async () => {
    // Validación simple
    if (!titulo.value || !contenido.value || !categoria.value) {
        alert('Por favor completá los campos obligatorios.')
        return
    }

    try {

        if (typeof categoria.value === 'string') {
            const cat = categoriaCont.value.find(c => c.nombre === categoria.value)
            if (cat) categoria.value = cat.id_categoria
        }

        if (typeof subcategoria.value === 'string') {
            const subcat = subcategoriaCont.value.find(sc => sc.nombre === subcategoria.value)
            if (subcat) subcategoria.value = subcat.id_subcategoria
        }

        const noticia = {
            titulo: titulo.value,
            subtitulo: subtitulo.value,
            by: by.value,
            contenido: contenido.value,
            categoria_id: categoria.value,
            subcategoria_id: subcategoria.value,
            multimedia: multimedia.value
        }

        console.log("Este es:", noticia)

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

<style>
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

/* Forzar mismo ancho que los inputs */
:deep(.select-extend) {
    width: 600px !important;
    max-width: 100%;
    display: flex;
    justify-content: center;
}

/* Nivel interno del componente (donde está el verdadero ancho) */
:deep(.select-extend .vs-select) {
    width: 100% !important;
}

/* El contenedor del contenido del select */
:deep(.select-extend .vs-select-content) {
    width: 100% !important;
}

.vs-input,
.vs-input-content {
    width: 600px !important;
    max-width: 100%;
}

/* 🔹 Selects de Vuesax */
.vs-select,
.vs-select-content {
    width: 600px !important;
    max-width: 100%;
    display: block;
}

/* 🔹 Opcional: centrado del botón */
.vs-button {
    margin-top: 1rem;
}
</style>
