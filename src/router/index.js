import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

const files = require.context('./../components', false, /\.vue$/)

var routes = [{
  path: '/',
  name: 'HelloWorld',
  component: HelloWorld
}, {
  path: '*',
  redirect: '/',
  // hidden: true
}]
files.keys().forEach(key => {
  let name = key.split('/').pop().split('.').shift();
  let component = files(key).default
  let p = {
    path: `/${name}`,
    name,
    component
  }
  routes.push(p);
});

export default new Router({
  routes
})
