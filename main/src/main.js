import Vue from 'vue'
import App from './App.vue'
import { registerMicroApps, start, setDefaultMountApp } from 'qiankun'
import microApps from './micro-app'

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')

registerMicroApps(microApps, {
  beforeLoad: app => {
    console.log('before load app.name====>>>>> %c%s', 'color: orange;font-weight:bold;', app.name)
  },
  beforeMount: [
    app => {
      console.log('[LifeCycle] before mount %c%s', 'color: red;font-weight:bold;', app.name)
    }
  ],
  afterMount: [
    app => {
      console.log('[LifeCycle] after mount %c%s', 'color: red;font-weight:bold;', app.name)
    }
  ],
  afterUnmount: [
    app => {
      console.log('[LifeCycle] after unmount %c%s', 'color: red;font-weight:bold;', app.name)
    }
  ]
})
setDefaultMountApp('/sub-vue')
start()
