<template>
  <div class="login-container">
    <div class="login-box">
      <div class="avater-warpper">
        <img src="../assets/logo.png" alt />
      </div>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="login-form">
        <el-form-item prop="username">
          <el-input prefix-icon="iconfont iconuser" v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" prefix-icon="iconfont iconpassword" v-model="ruleForm.password"></el-input>
        </el-form-item>
        <el-form-item class="text-right">
          <el-button type="primary" @click="submitForm()">立即创建</el-button>
          <el-button @click="resetForm()">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      ruleForm: {
        username: 'admin',
        password: '123456'
      },
      rules: {
        username: [
          { required: true, message: '请输入您的账户', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入您的密码', trigger: 'change' },
          { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm() {
      this.$refs.ruleForm.validate(async valid => {
        if (valid) {
          this.$http.post('login', this.ruleForm).then(({ data }) => {
            this.$message.success(data.meta.msg)
            window.sessionStorage.setItem('token', data.data.token)
            window.sessionStorage.setItem('state', JSON.stringify(data.data))
            this.$router.push('/home')
          })
        }
      })
    },
    resetForm() {
      this.$refs.ruleForm.resetFields()
    }
  }
}
</script>

<style lang="less" scoped>
.login-container {
  background-color: #2b4b6b;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-box {
    width: 450px;
    height: 300px;
    background-color: #fff;
    border-radius: 4px;
    position: relative;
    .avater-warpper {
      height: 130px;
      width: 130px;
      border: 1px solid #eeefff;
      border-radius: 50%;
      padding: 10px;
      box-shadow: 0 0 8px #eeeeff;
      position: absolute;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: #eeffff;
      img {
        height: 100%;
        width: 100%;
        border-radius: 50%;
        border: 1px solid #efffff;
      }
    }
    .login-form {
      position: absolute;
      bottom: 0;
      padding: 0 20px;
      width: 100%;
      box-sizing: border-box;
    }
  }
}
</style>
