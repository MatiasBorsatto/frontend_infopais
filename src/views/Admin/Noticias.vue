<template>
    <div class="card flex justify-center">
        <Toast />
        <Form :initialValues="initialValues" :resolver="resolver" @submit="onFormSubmit"
            class="flex flex-col gap-4 w-full max-w-2xl p-6">

            <!-- Título -->
            <FormField v-slot="$field" name="titulo" class="flex flex-col gap-1">
                <label class="font-medium text-gray-700">Título</label>
                <InputText type="text" placeholder="Título" />
                <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">
                    {{ $field.error?.message }}
                </Message>
            </FormField>

            <!-- Subtítulo -->
            <FormField v-slot="$field" name="subtitulo" class="flex flex-col gap-1">
                <label class="font-medium text-gray-700">Subtítulo</label>
                <InputText type="text" placeholder="Subtítulo" />
                <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">
                    {{ $field.error?.message }}
                </Message>
            </FormField>

            <!-- Autor -->
            <FormField v-slot="$field" name="by" class="flex flex-col gap-1">
                <label class="font-medium text-gray-700">Autor</label>
                <InputText type="text" placeholder="Autor" />
                <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">
                    {{ $field.error?.message }}
                </Message>
            </FormField>

            <!-- Contenido -->
            <FormField v-slot="$field" name="contenido" class="flex flex-col gap-1">
                <label class="font-medium text-gray-700">Contenido</label>
                <Textarea placeholder="Contenido" rows="5" />
                <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">
                    {{ $field.error?.message }}
                </Message>
            </FormField>

            <!-- Categoría -->
            <FormField v-slot="$field" name="categoria" class="flex flex-col gap-1">
                <label class="font-medium text-gray-700">Categoría</label>
                <Select :options="categoriaCont" optionLabel="nombre" optionValue="id_categoria"
                    placeholder="Seleccioná una categoría" class="w-full" />
                <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">
                    {{ $field.error?.message }}
                </Message>
            </FormField>

            <!-- Subcategoría -->
            <FormField v-slot="$field" name="subcategoria" class="flex flex-col gap-1">
                <label class="font-medium text-gray-700">Subcategoría</label>
                <Select :options="subcategoriaCont" optionLabel="nombre" optionValue="id_subcategoria"
                    placeholder="Seleccioná una subcategoría" class="w-full" />
                <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">
                    {{ $field.error?.message }}
                </Message>
            </FormField>

            <!-- URL Multimedia -->
            <subir-archivos />

            <Button type="submit" severity="secondary" label="Guardar" class="mt-4" />
        </Form>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, reactive } from 'vue'
import { zodResolver } from '@primevue/forms/resolvers/zod'
import { z } from 'zod'
import { useToast } from 'primevue/usetoast'
import Form from '@primevue/forms/form'
import FormField from '@primevue/forms/formfield'
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import Select from 'primevue/select'
import Button from 'primevue/button'
import Message from 'primevue/message'
import Toast from 'primevue/toast'
import noticiaService from '../../services/noticia.service'
// @ts-ignore: no declaration file for .vue modules
import SubirArchivos from '../../components/admin/SubirArchivos.vue'

const toast = useToast()

// Interfaz para tipar los valores del formulario
interface NoticiaForm {
    titulo: string
    subtitulo: string
    by: string
    contenido: string
    categoria: number | null
    subcategoria: number | null
    multimedia: string
}

// Estado de categorías y subcategorías
const categoriaCont = ref<any[]>([])
const subcategoriaCont = ref<any[]>([])

// Valores iniciales del formulario con tipo
const initialValues = reactive<NoticiaForm>({
    titulo: '',
    subtitulo: '',
    by: '',
    contenido: '',
    categoria: null,
    subcategoria: null,
    multimedia: ''
})

// Validación con Zod
const resolver = zodResolver(
    z.object({
        titulo: z.string().min(1, { message: 'El título es obligatorio.' }),
        subtitulo: z.string().optional(),
        by: z.string().optional(),
        contenido: z.string().min(1, { message: 'El contenido es obligatorio.' }),
        categoria: z.number().nullable().refine(val => val !== null, {
            message: 'Debes seleccionar una categoría.'
        }),
        subcategoria: z.number().nullable().optional(),
        multimedia: z.string().url({ message: 'Debe ser una URL válida.' }).or(z.literal('')).optional()
    })
)

// Cargar categorías y subcategorías
onMounted(async () => {
    try {
        const categorias = await noticiaService.obtenerCategorias()
        categoriaCont.value = categorias.obtenerCategorias

        const subcategorias = await noticiaService.obtenerSubcategorias()
        subcategoriaCont.value = subcategorias.obtenerSubcategorias
    } catch (error) {
        console.error('Error al cargar categorías:', error)
        toast.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudieron cargar las categorías.',
            life: 3000
        })
    }
})

// Envío del formulario
const onFormSubmit = async ({ valid, values }: any) => {
    if (!valid) {
        toast.add({
            severity: 'warn',
            summary: 'Formulario incompleto',
            detail: 'Por favor completá los campos obligatorios.',
            life: 3000
        })
        return
    }

    try {
        const noticia = {
            titulo: values.titulo,
            subtitulo: values.subtitulo,
            by: values.by,
            contenido: values.contenido,
            categoria_id: values.categoria,
            subcategoria_id: values.subcategoria,
            multimedia: values.multimedia
        }

        console.log('Noticia a enviar:', noticia);

        const respuesta = await noticiaService.guardarNoticia(noticia);

        console.log('Noticia creada correctamente:', respuesta);

        toast.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Noticia creada con éxito',
            life: 3000
        });
        // Limpiar el formulario con tipado correcto
        (Object.keys(initialValues) as Array<keyof NoticiaForm>).forEach((key) => {
            if (key === 'categoria' || key === 'subcategoria') {
                initialValues[key] = null
            } else {
                initialValues[key] = '' as any
            }
        })

    } catch (error: any) {
        console.error('Error al crear la noticia:', error)
        toast.add({
            severity: 'error',
            summary: 'Error',
            detail: error?.response?.data?.error || 'Hubo un error al crear la noticia.',
            life: 3000
        })
    }
}
</script>

<style scoped>
.card {
    padding: 2rem;
    background: white;
    border-radius: 0.5rem;
    overflow-y: auto;
}

label {
    margin-bottom: 0.25rem;
}
</style>