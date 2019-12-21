<template>
  <div class="edit-container">
    <el-form
      :model="formData"
      ref="formData"
      label-width="140px"
      class="edit-form"
      :rules="rules"
    >
      <el-form-item label="用户名称" prop="username" v-if="!model.id">
        <el-input v-model="formData.username" class="form-box-input"></el-input>
      </el-form-item>
      <el-form-item label="用户名称" v-else>
        <el-input
          v-model="formData.username"
          class="form-box-input"
          disabled
        ></el-input>
      </el-form-item>
      <el-form-item label="用户密码" prop="password" v-if="!model.id">
        <el-input v-model="formData.password" class="form-box-input"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="formData.email" class="form-box-input"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="mobile">
        <el-input v-model="formData.mobile" class="form-box-input"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          @click="
            {
              $emit('close')
              resetForm('formData')
            }
          "
          >取消</el-button
        >
        <el-button type="primary" @click="submitForm('formData')"
          >提交</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { createUsers, editUsers } from '@/api/users'
import { checkEmail, checkMobile } from '@/utils'

const INITDATA = {
  username: '',
  password: '',
  email: '',
  mobile: ''
}
export default {
  props: {
    model: Object
  },
  watch: {
    model: {
      handler(val) {
        this.formData = { ...INITDATA, ...val }
      },
      immediate: true
    }
  },
  data() {
    return {
      formData: {},
      rules: {
        username: [
          { required: true, message: '请输入用户名称', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入用户密码', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const handler = !this.model.id ? createUsers : editUsers
          handler(this.formData).then(res => {
            this.$message.success(res.data.meta.msg)
            this.$emit('editEmit')
          })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped></style>
