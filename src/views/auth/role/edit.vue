<template>
  <div class="edit-container">
    <el-form
      :model="formData"
      ref="formData"
      label-width="140px"
      class="edit-form"
      :rules="rules"
    >
      <el-form-item label="角色名称" prop="roleName">
        <el-input v-model="formData.roleName" class="form-box-input"></el-input>
      </el-form-item>
      <el-form-item label="角色描述" prop="roleDesc">
        <el-input v-model="formData.roleDesc" class="form-box-input"></el-input>
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
import { createRoles, editRoles } from '@/api/auth/roles'

const INITDATA = {
  roleName: '',
  roleDesc: ''
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
        roleName: [
          { required: true, message: '请输入角色名称', trigger: 'blur' }
        ],
        roleDesc: [
          { required: true, message: '请输入角色描述', trigger: 'blur' }
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
          const handler = !this.model.id ? createRoles : editRoles
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
