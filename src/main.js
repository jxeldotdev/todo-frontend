import Vue from 'vue'
import App from './App.vue'
import '../node_modules/milligram/dist/milligram.css'

Vue.config.productionTip = false

new Vue({
  data: {
    todos: [
      {
        id: 'example-uuid-changeme',
        name: 'Example',
        notes: 'Example notes',
        completed: false
      },
    ]
  },
  render: h => h(App),
}).$mount('#app')
