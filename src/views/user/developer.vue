<template>
  <div class="container">
    <div class="row mt-4">
      <div class="col">
        <table class="table">
          <caption>My Tasks</caption>
          <tbody>
            <tr>
              <th>Id</th>
              <th>Title</th>
              <th>Description</th>
              <th>Status</th>
            </tr>
            <router-link
              v-for="(task, index) of tasksFiltred"
              :key="index"
              :to="{name: 'task', params: {id :task.id}}"
              tag="tr"
            >
              <!-- <tr v-for="(task, index) of tasks" :key="index" @click="openTask(task.id)"> -->
              <td scope="row">{{task.id}}</td>
              <td scope="row">{{task.title}}</td>
              <td scope="row">{{task.description}}</td>
              <td scope="row">{{task.status}}</td>
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
  name: "Developer",
  data() {
    return {
      user: {},
      tasks: []
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
    httpClient
      .get("/tasks")
      .then(res => {
        this.tasks = res.data.tasks;
      })
      .catch(err => console.log(err));
  },
  computed: {
    tasksFiltred() {
      if (this.tasks.length) {
        return this.tasks.filter(task => task.assignee_id == this.user.id);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
caption {
  caption-side: top;
  text-align: center;
}
</style>