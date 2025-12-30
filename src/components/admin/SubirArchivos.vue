<template>
    <file-pond ref="pond" allow-multiple="true" max-files="3" label-idle="Seleccione o arroje los archivos aqui..."
        accepted-file-types="image/jpeg, image/png" :files="archivos"
        server="http://localhost:3001/api/subirArchivos" />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import vueFilePond from 'vue-filepond';
import 'filepond/dist/filepond.min.css';
import type { FilePondFile } from 'filepond';

import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';

// Registrar FilePond con los plugins
const FilePond = vueFilePond(FilePondPluginFileValidateType, FilePondPluginImagePreview);


// Definir la variable reactiva para los archivos con un tipo más específico
const archivos = ref<FilePondFile[]>([]); // Usamos FilePondFile para tipar los archivos

// Referencia de la instancia de FilePond
const pond = ref<any>(null); // Tipado de pond como FilePond o null

// Método para manejar la inicialización de FilePond
const handleFilePondInit = () => {
    console.log('FilePond has initialized');
    if (pond.value) {
        pond.value.getFiles(); // Obtener los archivos de la instancia de FilePond
    }
};

// Inicializar FilePond cuando el componente esté montado
onMounted(() => {
    handleFilePondInit();
});
</script>
