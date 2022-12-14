<template>
  <div>
    <el-menu
        style="width: 200px; min-height: calc(100vh - 50px);"
        default-active="Devices"
        router
        class="el-menu-vertical-demo">
      <el-menu-item index="Devices">
        <el-icon><Menu /></el-icon>
        <span>Device List</span>
      </el-menu-item>
      <el-menu-item index="Automations">
        <el-icon><setting /></el-icon>
        <span>Automations</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "Aside"
}
</script>

<style scoped>

</style>