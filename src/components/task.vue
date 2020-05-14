<template>
  <div class="container">
    <b-alert
      v-for="(msg, id) of messages"
      :key="id"
      :show="dismissCountDown"
      dismissible
      :variant="message_type"
      @dismissed="dismissCountDown=0"
      @dismiss-count-down="countDownChanged"
    >{{ msg }}</b-alert>
    <div class="row" v-if="task">
      <div class="col-md-6">
        <div>
          <div class="my-3">
            <b-form-group class="mb-0" label="Title:" label-for="title">
              <b-form-input
                :disabled="!role_id"
                lazy-formatter
                :formatter="role_id ? updateTask : null"
                v-model="task.title"
                size="lg"
                id="title"
                placeholder="Enter task title"
              ></b-form-input>
            </b-form-group>
          </div>
          <div class="my-3">
            <div
              v-b-tooltip.hover="role_id ? 'Click to edit' : 'Description'"
              class="cursor-pointer"
              v-show="!edit_desc"
              @click.prevent="editDesc"
            >
              <label class="mb-0" for>Description:</label>
              <p class="my-2">{{ task.description }}</p>
            </div>
            <div v-show="edit_desc">
              <b-form-group class="mb-0" label="Description:" label-for="description">
                <b-form-textarea
                  id="description"
                  v-model="task.description"
                  placeholder="Enter description"
                  lazy-formatter
                  :formatter="updateTask"
                  rows="5"
                ></b-form-textarea>
                <div class="my-3 text-right">
                  <b-button variant="success" class="success">Save</b-button>
                </div>
              </b-form-group>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-6 col">
        <div v-if="role_id">
          <div class="my-3">
            <b-button variant="primary" class="mx-3" @click="assign">Assign Developer</b-button>
          </div>
          <div v-show="assignDev">
            <b-form-group label="Developers">
              <b-form-radio
                v-for="(developer, index) of developers"
                v-model="task.assignee_id"
                name="developer"
                :value="developer.id"
                :key="index"
              >{{developer.name}}</b-form-radio>
            </b-form-group>
          </div>
        </div>
        <div v-if="role_id || user_id == task.assignee_id">
          <div class="my-3">
            <b-button variant="primary" class="mx-3" @click="changeStatus">Change Status</b-button>
          </div>
          <div v-show="change_status">
            <b-form-group>
              <b-form-radio
                v-for="(option, index) of optionsFiltered"
                v-model="selectedStatus"
                name="status"
                :disabled="!task.assignee_id"
                :value="option.value"
                :key="index"
              >{{option.text}}</b-form-radio>
            </b-form-group>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import httpClient from "../httpClient";
export default {
  props: ["id"],
  data() {
    return {
      task: {
        id: null,
        title: "",
        description: "",
        creator_id: null,
        status: null,
        assignee_id: null
      },
      selectedStatus: null,
      developers: null,
      options: [
        { value: "created", text: "Created" },
        { value: "assigned", text: "Assigned" },
        { value: "inProgress", text: "In Progress" },
        { value: "done", text: "Done" }
      ],
      assignDev: false,
      change_status: false,
      user_id: this.$store.getters.UserId,
      role_id: this.$store.getters.RoleIsManager,
      edit_desc: false,
      messages: [],
      dismissSecs: 5,
      dismissCountDown: 0,
      message_type: "success"
    };
  },
  beforeMount() {
    httpClient
      .get(`tasks/${this.id}`)
      .then(res => {
        this.task = res.data.task;
        this.selectedStatus = this.task.status;
      })
      .catch(err => {
        console.log(err);
      });
    httpClient
      .get("/developers")
      .then(res => {
        this.developers = res.data.developers;
      })
      .catch(err => {
        console.log(err);
      });
  },
  created() {},
  methods: {
    assign() {
      this.assignDev = !this.assignDev;
      this.change_status = false;
    },
    changeStatus() {
      this.change_status = !this.change_status;
      this.assignDev = false;
    },
    editDesc() {
      if (this.role_id) {
        this.edit_desc = true;
        setTimeout(function() {
          document.getElementById("description").focus();
        }, 0);
      }
    },
    updateTask(val) {
      if (this.role_id) {
        httpClient
          .put(`tasks/${this.id}`, { ...this.task })
          .then(res => {
            this.messages = [];
            const msg = res.data.message;
            if (msg) {
              this.messages.push(res.data.message);
              this.message_type = "success";
              this.dismissCountDown = this.dismissSecs;              
            }
          })
          .catch(err => {
            this.messages = [];
            this.message_type = "danger";
            this.dismissCountDown = this.dismissSecs;
            const errors = err.response.data.errors;
            Object.values(errors).forEach(value => {
              this.messages.push(value[0]);
            });
          });
        this.edit_desc = false;
        return val;
      }
    },
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
    getDeveloperId(id) {
      const dev = this.developers.find(developer => {
        return id === developer.id;
      });
      if (dev) {
        return dev.name;
      } else {
        return "No assigneed";
      }
    }
  },
  watch: {
    "task.assignee_id": function(val) {
      if (val)
        httpClient
          .post("assign-task", { user_id: val, task_id: this.id })
          .then(res => {
            this.task = res.data.task;
          })
          .catch(err => {
            console.log(err);
          });
    },
    selectedStatus: function(val) {
      if (val === this.task.status) return;
      httpClient
        .post("change-task-status", { status: val, task_id: this.id })
        .then(res => {
          // this.task = res.data.task;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  computed: {
    optionsFiltered() {
      if (this.role_id) {
        return this.options;
      } else {
        return this.options.filter((item, key) => key >= 1);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.cursor-pointer {
  cursor: pointer;
}
input[disabled] {
  background: transparent;
  padding: 0;
  border: none;
}
</style>