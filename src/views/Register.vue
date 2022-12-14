<template>
  <div style="width: 100%; height: 100vh; overflow: hidden">
    <div style="width: 400px; margin: 150px auto">
      <div>
        <h3 style="color:dodgerblue; font-size: 30px; text-align: center; padding-bottom: 30px">Sign Up</h3>
        <el-form :model="form"
                 :rules="rules"
                 ref="form"
                 size="large">
          <el-form-item prop="username">
            <el-input v-model="form.username">
              <template #prefix>
                <el-icon class="el-input__icon"><User /></el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="form.password" show-password>
              <template #prefix>
                <el-icon class="el-input__icon"><Lock /></el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="check">
            <el-input v-model="form.check" show-password>
              <template #prefix>
                <el-icon class="el-input__icon"><Lock /></el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button style="width: 100%" type="primary" @click="register">Sign up</el-button>
          </el-form-item>
        </el-form>

        Have account? <a href="\login">sign in</a>

      </div>
    </div>
  </div>
</template>

<script>
import request from "@/utils/request";

export default {
  name: "Login",
  data() {
    return {
      form: {},
      rules: {
        username: [
          { required: true, message: 'please input username', trigger: 'blur'},
        ],
        password: [
          { required: true, message: 'please input password', trigger: 'blur'},
        ],
        check: [
          { required: true, message: 'please input password again', trigger: 'blur'},
        ]
      },
    }
  },
  methods: {
    register() {
      if(this.form.password !== this.form.check) {
        this.$message({
          type: "error",
          message: "Passwords must match"
      })
        return
      }

      this.$refs['form'].validate((valid) => {
        if (valid) {
          request.put("http://localhost:9090/user", this.form).then(res => {
            console.log(res);
            if (res.code === '0') {
              this.$message({
                type: "success",
                message: "Successfully register. "
              })
              this.$router.push("/")
            } else {
              this.$message({
                type: "error",
                message: res.msg
              })
            }
          })
        }
      })
    }
  }
}
</script>

<style scoped>

</style>