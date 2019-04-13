<template>
  <div id="app">
    <router-view>
    </router-view>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld";
import BaseLayer from "./components/Baselayer";

export default {
  name: "App"
};
</script>

<style>
body {
  margin: 0;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.my-div-icon {
  background: red;
  border-radius: 50%;
  width: 30px;
  height: 30px;
}
</style>
