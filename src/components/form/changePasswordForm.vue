<template>
  <div>
    <b-alert
      :show="successCountDown"
      dismissible
      variant="success"
      @dismissed="successCountDown=0"
      @dismiss-count-down="countDownChanged"
    >{{message}}</b-alert>
    <b-form @submit.prevent="onSubmit">
      <b-form-group id="old_password_group" label="Old password:" label-for="old_password">
        <b-form-input
          class="form-control"
          id="old_password"
          v-model="form.old_password"
          type="password"
          :state="oldPass"
          aria-describedby="input-invalid-oldPassword"
          required
          placeholder="Enter old password"
          @keyup="oldPassChange"
        ></b-form-input>
        <b-form-invalid-feedback id="input-invalid-oldPassword">{{oldPassError}}</b-form-invalid-feedback>
      </b-form-group>
      <b-form-group id="new_password_group" label="New password:" label-for="new_password">
        <b-form-input
          class="form-control"
          id="new_password"
          v-model="form.new_password"
          type="password"
          :state="newPass"
          required
          placeholder="Enter new password"
          @keyup="newPassChange"
        ></b-form-input>
      </b-form-group>
      <b-form-group
        id="password_confirmation_group"
        label="Confirm new password:"
        label-for="new_password_confirmation"
      >
        <b-form-input
          class="form-control"
          id="new_password_confirmation"
          v-model="form.password_confirmation"
          type="password"
          :state="confPass"
          required
          placeholder="Enter password"
          @keyup="confPassChange"
        ></b-form-input>
      </b-form-group>
      <b-button class="w-100" type="submit" variant="primary">Change</b-button>
    </b-form>
  </div>
</template>

<script>
export default {
  // computed: {
  //   chechkConfirm() {
  //     return this.form.new_password === this.form.password_confirmation;
  //   }
  // },
  data() {
    return {
      form: {
        old_password: null,
        new_password: null,
        password_confirmation: null
      },
      oldPass: null,
      newPass: null,
      confPass: null,
      oldPassError: null,
      message: "",
      successSecs: 5,
      successCountDown: 0
    };
  },
  methods: {
    onSubmit() {
      if (this.confPass) {
        this.$store
          .dispatch("changePassword", { ...this.form })
          .then(res => {
            this.successCountDown = this.successSecs
            this.message = res.data.message
            this.form.old_password = null;
            this.form.new_password = null;
            this.form.password_confirmation = null;
            this.newPass = null;
            this.confPass = null;
          })
          .catch(err => {
            if (err.response) {
              this.oldPass = false;
              this.oldPassError = err.response.data.errors.old_password[0];
            }
          });
      }
    },
    oldPassChange() {
      this.oldPass = null;
    },
    newPassChange() {
      if (this.form.new_password) {
        if (this.form.new_password.length < 8) {
          this.newPass = false;
        } else {
          this.newPass = true;
        }
        if (this.form.password_confirmation) {
          this.confPass =
            this.form.password_confirmation === this.form.new_password;
        }
      }
    },
    confPassChange() {
      if (this.form.password_confirmation) {
        this.confPass =
          this.form.password_confirmation === this.form.new_password;
      } else {
        this.confPass = null;
      }
    },
    countDownChanged(successCountDown) {
      this.successCountDown = successCountDown;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>