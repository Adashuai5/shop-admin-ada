<template>
  <div class="edit-container">
    <el-form
      :model="formData"
      ref="formData"
      label-width="100px"
      class="demo-ruleForm"
      :rules="rules"
    >
      <el-form-item label="年龄" prop="age">
        <el-input
          type="age"
          v-model.number="formData.age"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('formData')"
          >提交</el-button
        >
        <el-button @click="dialog.edit.show = false">取 消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { createUsers } from '@/api/users'
export default {
  data() {
    return {
      formData: {
        age: ''
      },
      rules: [
        { required: true, message: '年龄不能为空' },
        { type: 'number', message: '年龄必须为数字值' }
      ]
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang="less" scoped></style>
