<template>
  <div class="user">
    <router-view></router-view>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "user",
  data() {
    return {
      user: null
    };
  },
  created() {
    if (this.$store.getters.RoleIsManager) {
      this.$router.push({ name: "manager" }).catch(err => {});
    } else {
      this.$router.push({ name: "developer" }).catch(err => {});
    }
  }
};
</script>
