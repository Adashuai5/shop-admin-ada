<template>
  <div class="edit-container">
    <el-form
      :model="formData"
      ref="formData"
      label-width="140px"
      class="edit-form"
      :rules="rules"
    >
      <el-form-item label="省市区/县" prop="address1">
        <el-cascader
          class="form-box-input"
          filterable
          v-model="formData.address1"
          :options="cityData"
        ></el-cascader>
      </el-form-item>
      <el-form-item label="详细地址" prop="address2">
        <el-input v-model="formData.address2" class="form-box-input"></el-input>
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
import cityData from '@/utils/citydata.js'

const INITDATA = {
  address1: '',
  address2: ''
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
      cityData,
      rules: {
        address1: [
          { required: true, message: '请输入省市区/县', trigger: 'blur' }
        ],
        address2: [
          { required: true, message: '请输入详细地址', trigger: 'blur' }
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
          this.$message.error('无操作权限')
          this.$emit('editEmit')
        }
      })
    }
  }
}
</script>

<style lang="less" scoped></style>
