<template>
  <div id="app">
    <component :is="layout">
      <router-view />
    </component>
  </div>
</template>

<style lang="scss">
@import "~materialize-css/dist/css/materialize.min.css";
@import "assets/index.css";
</style>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

<script>

import Empty from '@/layouts/Empty.vue';
import LeftSidebar from '@/layouts/LeftSidebar.vue';

export default {
  computed: {
    layout() {
      return(this.$route.meta.layout || 'Empty');
    }
  },
  components: {
    Empty, LeftSidebar
  }
};
</script>
