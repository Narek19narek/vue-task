<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand tag="li">
        <router-link :to="{name: 'home'}">Home</router-link>
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item tag="li">
            <router-link :to="{name: 'user'}">Users</router-link>
          </b-nav-item>
          <b-nav-item tag="li">
            <router-link :to="{name: 'tasks'}">Tasks</router-link>
          </b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item v-if="!loggedIn" tag="li">
            <router-link :to="{name: 'login'}">Login</router-link> | 
            <router-link :to="{name: 'register'}">Register</router-link>
          </b-nav-item>
          <b-nav-item v-if="loggedIn" tag="li">
            <router-link :to="{ name: 'logout' }">Logout</router-link>
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import httpClient from "./../httpClient";
import Login from "./auth/login";
export default {
  name: "NavBar",
  // components: {
  //     Login,
  // },
  data() {
    return {
      user: null
    };
  },
  mounted() {},
  created() {},
  computed: {
    loggedIn() {
      return this.$store.getters.loggedIn;
    }
  },
  watch: {}
};
</script>

<style scoped>
</style>