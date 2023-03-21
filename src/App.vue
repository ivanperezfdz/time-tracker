<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'App',
});
</script>

<style lang="scss">
@import '@/assets/tailwind.scss';
@import url("https://use.fontawesome.com/releases/v5.15.3/css/all.css");
@import url('https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap');

body {
  font-family: 'Roboto', sans-serif;
}


</style>
