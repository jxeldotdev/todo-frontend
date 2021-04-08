import Vue from 'vue'
import App from './App.vue'
import '../node_modules/milligram/dist/milligram.css'

Vue.config.productionTip = false

new Vue({
  data: {},
  methods: {
    addTodo: function () {

    },

    completeTodo: function () {

    },
  },
  render: h => h(App),
}).$mount('#app')
