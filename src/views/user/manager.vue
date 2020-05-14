<template>
  <div class="manager">
    <div class="row mx-5">
      <div class="col-md-3 col-6">
        <div class="my-3">
          <b-button variant="primary" class="mx-3" @click="createDeveloper">Create Developer</b-button>
        </div>
        <div class="my-3">
          <b-button variant="primary" class="mx-3" @click="createTask">Create Task</b-button>
        </div>
        <div class="my-3">
          <b-button variant="primary" class="mx-3" @click="changePassword">Change Password</b-button>
        </div>
      </div>
      <div class="col-md-4 col-12 my-3">
        <RegisterForm v-show="devCreat" />
        <CreateTaskForm v-show="taskCreat" />
        <ChangePasswordForm v-show="passChange" />
      </div>
    </div>
  </div>
</template>

<script>
import RegisterForm from "../../components/form/registerForm";
import ChangePasswordForm from "../../components/form/changePasswordForm";
import CreateTaskForm from "../../components/form/createTaskForm";
export default {
  name: "manager",
  components: {
    RegisterForm,
    ChangePasswordForm,
    CreateTaskForm
  },
  data() {
    return {
      user: {},
      devCreat: false,
      passChange: false,
      taskCreat: false
    };
  },
  created() {
    this.$store
      .dispatch("getUser")
      .then(res => {
        this.user = res.data;
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    createDeveloper() {
      this.passChange = false;
      this.taskCreat = false;
      this.devCreat = !this.devCreat;
    },

    createTask() {
      this.passChange = false;
      this.devCreat = false;
      this.taskCreat = !this.taskCreat;
    },

    changePassword() {
      this.devCreat = false;
      this.taskCreat = false;
      this.passChange = !this.passChange;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>