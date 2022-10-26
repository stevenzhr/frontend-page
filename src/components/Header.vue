<template>
  <div style="height: 50px; line-height: 50px; border-bottom: 1px solid #ccc; display: flex">
    <div style="width: 300px; padding-left: 30px; font-weight: bold; color: dodgerblue">Smart Device Manager</div>
    <div style="flex: 1"></div>
    <div style="width: 100px">
      <el-dropdown style="display: contents">
        <el-button type="primary">
          Admin<el-icon class="el-icon--right"></el-icon>
        </el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>Info</el-dropdown-item>
            <el-dropdown-item>Logout</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header"
}
</script>

<style scoped>

</style>