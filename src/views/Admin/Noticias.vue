<template>
    <div class="flex flex-col gap-6 w-full max-w-4xl mx-auto">
        <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Crear Nueva Noticia</h1>
        
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 md:p-8">
            <Toast />
            <Form :initialValues="initialValues" :resolver="resolver" @submit="onFormSubmit"
                class="flex flex-col gap-5 w-full">

                <!-- Título -->
                <FormField v-slot="$field" name="titulo" class="flex flex-col gap-1.5">
                    <label class="font-semibold text-sm text-gray-700 dark:text-gray-300">Título de la noticia</label>
                    <InputText type="text" placeholder="Ej: Histórico acuerdo comercial..." class="w-full" />
                    <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">
                        {{ $field.error?.message }}
                    </Message>
                </FormField>

                <!-- Subtítulo -->
                <FormField v-slot="$field" name="subtitulo" class="flex flex-col gap-1.5">
                    <label class="font-semibold text-sm text-gray-700 dark:text-gray-300">Bajada / Subtítulo</label>
                    <InputText type="text" placeholder="Breve resumen de la noticia..." class="w-full" />
                    <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">
                        {{ $field.error?.message }}
                    </Message>
                </FormField>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <!-- Autor -->
                    <FormField v-slot="$field" name="by" class="flex flex-col gap-1.5">
                        <label class="font-semibold text-sm text-gray-700 dark:text-gray-300">Autor</label>
                        <InputText type="text" placeholder="Ej: Juan Pérez" class="w-full" />
                        <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">
                            {{ $field.error?.message }}
                        </Message>
                    </FormField>

                    <!-- URL Multimedia -->
                    <FormField v-slot="$field" name="multimedia" class="flex flex-col gap-1.5">
                        <label class="font-semibold text-sm text-gray-700 dark:text-gray-300">URL de Imagen Principal</label>
                        <InputText type="text" placeholder="https://ejemplo.com/imagen.jpg" class="w-full" />
                        <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">
                            {{ $field.error?.message }}
                        </Message>
                    </FormField>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <!-- Categoría -->
                    <FormField v-slot="$field" name="categoria" class="flex flex-col gap-1.5">
                        <label class="font-semibold text-sm text-gray-700 dark:text-gray-300">Categoría</label>
                        <Select :options="categoriaCont" optionLabel="nombre" optionValue="id_categoria"
                            placeholder="Seleccioná una categoría" class="w-full" />
                        <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">
                            {{ $field.error?.message }}
                        </Message>
                    </FormField>

                    <!-- Subcategoría -->
                    <FormField v-slot="$field" name="subcategoria" class="flex flex-col gap-1.5">
                        <label class="font-semibold text-sm text-gray-700 dark:text-gray-300">Subcategoría (Opcional)</label>
                        <Select :options="subcategoriaCont" optionLabel="nombre" optionValue="id_subcategoria"
                            placeholder="Seleccioná una subcategoría" class="w-full" />
                        <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">
                            {{ $field.error?.message }}
                        </Message>
                    </FormField>
                </div>

                <!-- Contenido -->
                <FormField v-slot="$field" name="contenido" class="flex flex-col gap-1.5 mt-2">
                    <label class="font-semibold text-sm text-gray-700 dark:text-gray-300">Cuerpo de la noticia</label>
                    <Textarea placeholder="Escribe el contenido aquí..." rows="10" class="w-full" />
                    <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">
                        {{ $field.error?.message }}
                    </Message>
                </FormField>

                <div class="flex justify-end mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                    <Button type="submit" severity="primary" label="Publicar Noticia" icon="pi pi-check" />
                </div>
            </Form>
        </div>
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
    multimedia: '',
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
        categoriaCont.value = categorias

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
            multimedia: values.multimedia,
            slug: values.slug
        }

        await noticiaService.guardarNoticia(noticia);

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
/* Estilos puramente con Tailwind */
</style>