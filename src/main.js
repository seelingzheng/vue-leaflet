// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

//引入样式文件
import 'leaflet/dist/leaflet.css'


//引入Leaflet对象 挂载到Vue上，便于全局使用，也可以单独页面中单独引用
import * as L from 'leaflet'

import '../static/libs/path/leaflet.textpath'
import '../static/libs/path/L.Path.DashFlow'
import '../static/libs/leaflet-fill-pattern/leaflet-polygon.fillPattern'
import '../static/libs/leaflet-fill-pattern/Leaflet.RoughCanvas'


Vue.L = Vue.prototype.$L = L
import "./../static/libs/leaflet-extra-marker/leaflet-extra-markers";
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
