<template></template>

<script>
export default {
  created() {
    this.$store.dispatch("destroyToken")
        .then(res => {
            this.$router.push({ name: "home" });
        })
        .catch(err => {
            console.log(err)
        })
  }
};
</script>