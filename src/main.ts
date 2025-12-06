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
      shadow: '0 0 0 0.2rem rgba(59,130,246,0.4)'
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
    }
})
app.use(ToastService)
app.component('Toast', Toast);
app.use(pinia)
app.use(VueSweetalert2);

app.mount('#app')
