<template>
  <div style="height: 50px; line-height: 50px; border-bottom: 1px solid #ccc; display: flex">
    <div style="width: 300px; padding-left: 30px; font-weight: bold; color: dodgerblue">Smart Device Manager</div>
    <div style="flex: 1"></div>
    <div style="width: 100px">
      <el-dropdown style="display: contents">
        <el-button type="primary">
          {{ username }}<el-icon><ArrowDown /></el-icon>
        </el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click = test()>Info</el-dropdown-item>
            <el-dropdown-item @click = logout()>Logout</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>


<script>
import router from "@/router";

export default {
  name: "Header",
  data() {
    return {
      username: localStorage.getItem("username")
    }
  },
  methods: {
    logout() {
      localStorage.removeItem("username");
      router.push('/login');
    },
    test() {
      console.log(localStorage.getItem("username"))
    }
  }
}
</script>

<style scoped>

</style>