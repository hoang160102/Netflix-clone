import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./input.css";
import store from "./state/store";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import MainContent from "./layout/MainContent.vue";
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives,
})

let app
const options = {
  position: "top-right",
  timeout: 1414,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: true,
  closeButton: "button",
  icon: true,
  rtl: false,
};
const auth = getAuth()
onAuthStateChanged(auth, () => {
  if (!app) {
    app = createApp(App)
    app.use(router);
    app.use(store);
    app.use(Toast, options);
    app.use(vuetify)
    app.component('main-content', MainContent)
    app.mount("#app");
  }
})
