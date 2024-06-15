<template>
  <NavbarComponent/>
  <br>
  <HomePage/>
</template>

<script>
import HomePage from './components/HomePage.vue';
import NavbarComponent from './layout/NavbarComponent.vue';

export default {
  name: 'App',
  components: {
    HomePage,
    NavbarComponent
  } 
}
</script>

<style>
#app {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
