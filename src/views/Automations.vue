<template>
<!--  add automations  -->
  <div style="padding: 10px">
    <div id="add-new-automation" style="margin: 10px 0">
      <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-form-item label="When">
          <el-select v-model="form.primeDeviceId" placeholder="">
            <el-option
                v-for="item in device_list"
                :key="item.deviceId"
                :label="item.name"
                :value="item.deviceId"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select style="width: 100px" v-model="form.primeOperation" placeholder="">
            <el-option label="On" value="on" />
            <el-option label="Off" value="off" />
          </el-select>
        </el-form-item>

        <el-form-item label="then">
          <el-select v-model="form.drivenDeviceId" placeholder="">
            <el-option
                v-for="item in device_list"
                :key="item.deviceId"
                :label="item.name"
                :value="item.deviceId"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select style="width: 100px" v-model="form.drivenOperation" placeholder="">
            <el-option label="On" value="on" />
            <el-option label="Off" value="off" />
            <el-option label="Switch" value="switch" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">Add</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!--  automation table-->
    <div>
      <el-table :data="auto_list"
                border
                stripe
                style="width: 100%">
        <el-table-column prop="autoId" label="Automation Id" style="width: 250px"/>
        <el-table-column prop="primeDeviceName" label="Prime device" />
        <el-table-column prop="primeOperation" label="Prime operation" />
        <el-table-column prop="drivenDeviceName" label="Driven deviceId" />
        <el-table-column prop="drivenOperation" label="Driven operation" />
        <el-table-column label="Operations" width="200" align="center">
          <template #default = "scope">
            <el-popconfirm title="Are you sure to delete this?" @confirm="handleDelete(scope.row.autoId)">
              <template #reference>
                <el-button size="small" type="danger">Delete</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>

    </div>
  </div>

</template>

<script>
import request from "@/utils/request";

export default {
  name: "Automations",
  data() {
    return {
      form: {
        username: localStorage.getItem("username"),
      },
      region: '',
      device_list: [],
      auto_list: []
    }
  },
  created() {
    this.loadDeviceList()
    this.loadAutoList()
  },
  methods: {
    loadDeviceList() {
      request.get("http://localhost:9090/device?search=0&username=" + this.form.username).then(res => {
        this.device_list = res.data
      })
    },
    loadAutoList() {
      request.get("http://localhost:9090/auto", {
        params: {
          username: this.form.username
        }
      }).then(res => {
        this.auto_list = res.data
      })
    },
    onSubmit() {
      request.put("http://localhost:9090/auto", this.form).then(res => {
        if (res.code === '0') {
          this.$message({
            type: "success",
            message: "Successfully add automation. "
          })
        } else {
          this.$message({
            type: "error",
            message: res.msg
          })
        }
        this.loadAutoList()
      })
    },
    handleDelete(autoId) {
      request.delete("http://localhost:9090/auto/" + autoId).then(res => {
        if (res.code === '0') {
          this.$message({
            type: "success",
            message: "Successfully delete automation. "
          })
        } else {
          this.$message({
            type: "error",
            message: res.msg
          })
        }
        this.loadAutoList()
      })
    }
  }
}
</script>

<style scoped>

</style>