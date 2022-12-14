<template>
  <div style="padding: 10px">
<!--    utilities   -->
    <div style="margin: 10px 0">
      <el-button type="primary" @click="add">Add new device</el-button>
    </div>

<!--    search box   -->
    <div style="margin: 10px 0">
      <el-input v-model="search" placeholder="Please input Device ID" style="width: 20%" clearable></el-input>
      <el-button type="primary" style="margin-left: 5px" @click="load">Search</el-button>
    </div>

<!--    device table -->
    <div>
      <el-table :data="tableData"
                :cell-style="tableAddClass"
                border
                stripe
                style="width: 100%">
        <el-table-column prop="deviceId" label="Device ID" />
        <el-table-column prop="name" label="Name" />
        <el-table-column prop="type" label="Type" />
        <el-table-column prop="status" label="Status" />
        <el-table-column label="Operations" width="200" align="center">
          <template #default = "scope">
            <el-button size="small" @click="handleEdit(scope.row)">On/Off</el-button>
            <el-popconfirm title="Are you sure to delete this?" @confirm="handleDelete(scope.row.deviceId)">
              <template #reference>
                <el-button size="small" type="danger">Delete</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </div>

<!--    add device pop out form-->
    <el-dialog
        v-model="dialogVisible"
        title="Tips"
        width="30%">
      <el-form :model="form" label-width="120px">
        <el-form-item label="device ID:">
          <el-input v-model="form.deviceId" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="name:">
          <el-input v-model="form.name" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="type:">
          <el-input v-model="form.type" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="status:">
          <el-input v-model="form.status" style="width: 80%"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="save">Add device</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>

import request from "@/utils/request";

export default {
  name: 'HomeView',
  components: {
  },
  data() {
    return {
      form: {},
      dialogVisible: false,
      search: '',
      tableData: [],
      username: localStorage.getItem("username")
    }
  },
  created() {
    this.load()
  },
  methods: {
    load() {
      request.get("http://localhost:9090/device", {
      params: {
        search: this.search,
        username: this.username
      }
      }).then(res => {
        this.tableData = res.data
      })
    },
    add() {
      this.dialogVisible = true
      this.form = {}
    },
    save() {
      this.form.username = this.username
      request.post("http://localhost:9090/device", this.form).then(res => {
        if (res.code === '0') {
          this.$message({
            type: "success",
            message: "Successfully add new device. "
          })
        } else {
          this.$message({
            type: "error",
            message: res.msg
          })
        }
        this.load()
      })

      this.dialogVisible = false
    },
    handleEdit(row) {
      this.form.device = JSON.parse(JSON.stringify(row))
      if (this.form.device.status === "on")
        this.form.device.status = "off";
      else
        this.form.device.status = "on"
      this.form.username = this.username
      request.put("http://localhost:9090/device", this.form).then(res => {
        if (res.code === '0') {
          this.$message({
            type: "success",
            message: "Device has been switch " + this.form.status
          })
        } else {
          this.$message({
            type: "error",
            message: res.msg
          })
        }
        this.load()
      })

    },
    handleDelete(deviceId) {
      request.delete("http://localhost:9090/device/" + deviceId).then(res => {
        if (res.code === '0') {
          this.$message({
            type: "success",
            message: "Successfully delete device. "
          })
        } else {
          this.$message({
            type: "error",
            message: res.msg
          })
        }
        this.load()
      })
    },
    tableAddClass({row, column, rowIndex, columnIndex}) {
      if (row.status === 'off') {
        return {'color': 'red'}
      }
      return {'color': 'green'}
    }
  }
}
</script>
