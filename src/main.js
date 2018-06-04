import Vue from 'vue'
import App from './App.vue'
import FishtriprUI from './components'

Vue.config.productionTip = false

Vue.use(FishtriprUI)

new Vue({
  render: h => h(App),
}).$mount('#app');
