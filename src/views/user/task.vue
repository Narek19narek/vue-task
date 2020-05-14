<template>
  <div>
    <div class="row justify-content-center mt-5">
      <div class="col-md-8 col">
        <table class="table">
          <thead>
            <tr>
              <th>No</th>
              <th>Title</th>
              <th>Description</th>
              <th>Status</th>
              <th>Developer</th>
            </tr>
          </thead>
          <tbody>
            <router-link
              v-for="(task, index) of tasks"
              :key="index"
              :to="{name: 'task', params: {id :task.id}}"
              tag="tr"
            >
              <!-- <tr v-for="(task, index) of tasks" :key="index" @click="openTask(task.id)"> -->
              <td scope="row">{{task.id}}</td>
              <td scope="row">{{task.title}}</td>
              <td scope="row">{{task.description}}</td>
              <td scope="row">{{task.status}}</td>
              <td scope="row" class="text-center">{{getDeveloper(task.assignee_id)}}</td>
              <!-- </tr> -->
            </router-link>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import httpClient from "../../httpClient";
export default {
  data() {
    return {
      tasks: [],
      developers: [],
      task: {
        id: null,
        title: "",
        description: ""
      }
    };
  },
  created() {
    httpClient
      .get("/developers")
      .then(res => {
        this.developers = res.data.developers;
      })
      .catch(err => {
        console.log(err);
      });
    httpClient
      .get("/tasks")
      .then(res => {
        this.tasks = res.data.tasks;
      })
      .catch(err => console.log(err));
  },
  methods: {
    getDeveloper(id) {
      const dev = this.developers.find(developer => {
        return id === developer.id;
      });
      if (dev) {
        return dev.name;
      } else {
        return "No assigneed";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>