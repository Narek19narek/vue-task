<template>
  <div id="app">
    <div id="nav">
      <NavBar />
    </div>
    <div class="container-fluid">
      <router-view :key="$route.fullPath" />
    </div>
  </div>
</template>

<script>
import NavBar from "./components/navbar";

export default {
  components: {
    NavBar
  }
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: rgba(44, 62, 80, 0.7);
    }
  }
}
</style>
