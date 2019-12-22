<template>
  <div class="edit-container">
    <el-form
      :model="formData"
      ref="formData"
      label-width="140px"
      class="edit-form"
      :rules="rules"
    >
      <el-form-item label="用户名称">
        {{ model.username }}
      </el-form-item>
      <el-form-item label="当前角色"> {{ model.role_name }} </el-form-item
      ><el-form-item label="新的角色" prop="rid">
        <el-select v-model="formData.rid" placeholder="请选择">
          <el-option
            v-for="item in rolesList"
            :key="item.id"
            :label="item.roleName"
            :value="item.id"
          >
          </el-option>
        </el-select>
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
import { editUsersRoles } from '@/api/users'
import { getRolesList } from '@/api/auth/roles'

export default {
  props: {
    model: Object
  },
  data() {
    return {
      rolesList: [],
      formData: { rid: null },
      rules: {
        rid: [
          { required: true, message: '新的角色不可为空', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    getRolesList().then(({ data }) => {
      this.rolesList = data.data
    })
  },
  methods: {
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          editUsersRoles({ id: this.model.id, ...this.formData }).then(res => {
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
