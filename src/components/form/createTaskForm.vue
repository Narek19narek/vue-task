<template>
  <div>
    <b-alert
      :show="dismissCountDown"
      dismissible
      variant="success"
      @dismissed="dismissCountDown=0"
      @dismiss-count-down="countDownChanged"
    >{{ message }}</b-alert>
    <b-form @submit.prevent="onSubmit">
      <b-form-group id="title_group" label="Task title:" label-for="task_title">
        <input
          class="form-control"
          id="task_title"
          v-model="form.title"
          type="text"
          required
          placeholder="Enter title"
        />
      </b-form-group>
      <b-form-group id="description_group" label="Description:" label-for="task_description">
        <textarea
          class="form-control"
          id="task_description"
          v-model="form.description"
          required
          placeholder="Enter text"
          cols="30"
          rows="5"
        />
      </b-form-group>
      <b-button class="w-100" type="submit" variant="primary">Create</b-button>
    </b-form>
  </div>
</template>

<script>
import httpClient from "../../httpClient";
export default {
  data() {
    return {
      form: {
        title: "",
        description: ""
      },
      message: "",
      dismissSecs: 5,
      dismissCountDown: 0
    };
  },
  methods: {
    onSubmit() {
      httpClient
        .post("/tasks", { ...this.form })
        .then(res => {
          this.form.title = "";
          this.form.description = "";
          this.message = res.data.message;
          this.dismissCountDown = this.dismissSecs;
        })
        .catch(err => {
          console.log(err);
        });
    },
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>