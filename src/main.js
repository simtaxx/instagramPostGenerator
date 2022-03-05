import Vue from 'vue'
import App from './App.vue'
import router from './router'

// Styles
import '@/assets/styles/reset.scss'
import '@/assets/styles/fonts.scss'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
