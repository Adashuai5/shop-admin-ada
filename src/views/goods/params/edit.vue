<template>
  <div class="edit-container">
    <el-form
      :model="formData"
      ref="formData"
      label-width="140px"
      class="edit-form"
      :rules="rules"
    >
      <el-form-item
        label="动态参数"
        prop="attr_name"
        v-if="formData.attr_sel === 'many'"
      >
        <el-input
          v-model="formData.attr_name"
          class="form-box-input"
        ></el-input>
      </el-form-item>
      <el-form-item label="静态参数" v-else prop="attr_name">
        <el-input
          v-model="formData.attr_name"
          class="form-box-input"
        ></el-input>
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
import { addParams, editParams } from '@/api/good/params'
import { deepClone } from '@/utils'

const INITDATA = {
  attr_name: ''
}
export default {
  props: {
    model: Object
  },
  watch: {
    model: {
      handler(val) {
        this.formData = deepClone({ ...INITDATA, ...val })
      },
      immediate: true
    }
  },
  data() {
    return {
      formData: {},
      rules: {
        attr_name: [
          { required: true, message: '参数名称不能为空', trigger: 'blur' }
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
          const handler = !this.model.attr_id ? addParams : editParams
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
