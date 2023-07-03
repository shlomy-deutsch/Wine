import './assets/main.css'
import store from './components/Store/store.js'

import { createApp } from 'vue'
import App from './App.vue'
const app = createApp(App)
app.use(store)
createApp(App).mount('#app')
