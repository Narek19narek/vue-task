<template>
  <div class="row justify-content-center mt-5">
    <b-form @submit.prevent="onSubmit" class="col-md-3 col-6">
      <b-form-group id="name_group" label="Your nmae:" label-for="name">
        <input
          class="form-control"
          id="name"
          v-model="form.name"
          type="text"
          required
          placeholder="Enter name"
        />
      </b-form-group>
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
          name="password"
          required
          placeholder="Enter password"
        />
      </b-form-group>

      <b-form-group
        id="password_confirmation_group"
        label="Your Password:"
        label-for="password_confirmation"
      >
        <input
          class="form-control"
          id="password_confirmation"
          v-model="form.password_confirmation"
          type="password"
          name="password_confirmation"
          required
          placeholder="Enter password"
        />
      </b-form-group>
      <b-button class="w-100" type="submit" variant="primary">Register</b-button>
    </b-form>
  </div>
</template>

<script>
import httpClient from "../../httpClient";
export default {
  name: "register",
  data() {
    return {
      form: {
        name: "",
        email: "",
        password: null,
				password_confirmation: null,
				user_type: 1
      }
    };
  },
  methods: {
    onSubmit() {
      this.$store
        .dispatch("register", { ...this.form })
        .then(res => {
          this.$router.push({ name: "login" });
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>