<template>
  <div class="row justify-content-center mt-5">
    <b-form class="col-md-3 col-6" @submit.prevent="onSubmit">
      <b-form-group id="email_group" label="Email address:" label-for="email">
        <input
          class="form-control"
          id="email"
          v-model="form.email"
          type="email"
          required
          placeholder="Enter email"
        />
      </b-form-group>

      <b-form-group id="password_group" label="Your Password:" label-for="password">
        <input
          class="form-control"
          id="password"
          v-model="form.password"
          type="password"
          required
          placeholder="Enter password"
        />
      </b-form-group>
      <b-button class="w-100" type="submit" variant="primary">Login</b-button>
    </b-form>
  </div>
</template>

<script>
import httpClient from "../../httpClient";
export default {
  name: "login",
  data() {
    return {
      form: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    onSubmit() {
      this.$store
        .dispatch("retriveToken", { ...this.form })
        .then(res => {
          const role_id = res.data.role_id
          localStorage.setItem('role_id', role_id)
          this.$store.commit('setRoleId', role_id)
          this.$router.push({ name: "user" });
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>