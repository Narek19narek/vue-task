<template>
  <div>
    <b-alert
      :show="alertCountDown"
      dismissible
      :variant="messageVariant"
      @dismissed="alertCountDown=0"
      @dismiss-count-down="countDownChanged"
    >
      <p v-for="(msg, key) in message" v-bind:key="key" class="my-1">{{msg[0]}}</p>
    </b-alert>
    <b-form @submit.prevent="onSubmit">
      <b-form-group id="name_group" label="Developer nmae:" label-for="name">
        <input
          class="form-control"
          id="name"
          v-model="form.name"
          type="text"
          required
          placeholder="Enter name"
        />
      </b-form-group>
      <b-form-group id="email_group" label="Developer email address:" label-for="email">
        <input
          class="form-control"
          id="email"
          v-model="form.email"
          type="email"
          required
          placeholder="Enter email"
        />
      </b-form-group>
      <b-form-group id="password_group" label="Developer Password:" label-for="password">
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
        label="Confirm Password:"
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
      <b-button class="w-100" type="submit" variant="primary">Create</b-button>
    </b-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: "",
        email: "",
        password: null,
        password_confirmation: null,
        user_type: 0
      },
      message: "",
      alertSecs: 5,
      alertCountDown: 0,
      messageVariant: ""
    };
  },
  methods: {
    onSubmit() {
      this.$store
        .dispatch("register", { ...this.form })
        .then(res => {
          this.form.name = "";
          this.form.email = "";
          this.form.password = "";
          this.form.password_confirmation = "";
          this.messageVariant = "success";
          this.message = {msg: ["Successfully created developer!"]};
          this.alertCountDown = this.alertSecs;
        })
        .catch(err => {
          console.log(err.response.data.errors);
          this.messageVariant = "danger"; 
          this.message = err.response ? err.response.data.errors : '';
          this.alertCountDown = this.alertSecs;
        });
    },
    countDownChanged(alertCountDown) {
      this.alertCountDown = alertCountDown;
    }
  }
};
</script>