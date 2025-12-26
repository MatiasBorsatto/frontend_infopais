import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config';
import Lara from '@primevue/themes/lara';
import { definePreset } from '@primevue/themes'
import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';
import {createPinia} from 'pinia'
import PiniaPluginPersistedState from 'pinia-plugin-persistedstate';
import AnimateOnScroll from 'primevue/animateonscroll';

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const CustomLara = definePreset(Lara, {
  semantic: {
    primary: {
      50: '{blue.50}',
      100: '{blue.100}',
      200: '{blue.200}',
      300: '{blue.300}',
      400: '{blue.400}',
      500: '{blue.500}',  // ACCIÓN PRINCIPAL
      600: '{blue.600}',
      700: '{blue.700}',
      800: '{blue.800}',
      900: '{blue.900}',
    }
  },
  components: {
    focusring: {
      color: '{blue.500}',
      shadow: '0 0 0 0.2rem #3b82f666'
    }
  }
});

const app = createApp(App);
const pinia = createPinia()
pinia.use(PiniaPluginPersistedState)

app.use(router)
app.use(PrimeVue, {
    theme: {
        preset: CustomLara,
        options: {
            darkModeSelector: 'none', // Desactivar el modo oscuro
            cssLayer: false
        }
    },
    locale: {
        firstDayOfWeek: 1,
        dayNames: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
        dayNamesShort: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"],
        dayNamesMin: ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sá"],
        monthNames: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
        monthNamesShort: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
        today: 'Hoy',
        clear: 'Limpiar',
        weekHeader: 'Sm',
        dateFormat: 'dd/mm/yy',
    }
})

app.use(ToastService)
app.component('Toast', Toast);
app.use(pinia)
app.use(VueSweetalert2);
app.directive('animateonscroll', AnimateOnScroll);

app.mount('#app')
