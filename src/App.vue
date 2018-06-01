<template>
  <div id='app'>
    <img src='./assets/logo_dark_web_x2.svg' class='demo-logo'>
    <Demo msg='These are the common components written in Vue.js'/>
  </div>
</template>

<script>
import Demo from './components/Demo.vue';

export default {
  name: 'app',
  components: {
    Demo,
  }
}
</script>

<style lang='scss'>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;

  .demo-logo {
    width: 150px;
  }


}
</style>
