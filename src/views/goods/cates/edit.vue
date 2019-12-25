<template>
  <div class="edit-container">
    <el-form
      :model="formData"
      ref="formData"
      label-width="140px"
      class="edit-form"
      :rules="rules"
    >
      <el-form-item label="分类名称" prop="cat_name">
        <el-input v-model="formData.cat_name" class="form-box-input"></el-input>
      </el-form-item>
      <el-form-item label="父级分类" v-if="type"
        ><el-cascader
          v-model="formData.cat_pid"
          :options="model"
          :props="{
            value: 'cat_id',
            label: 'cat_name',
            emitPath: false,
            checkStrictly: true
          }"
          @change="handleChange"
        ></el-cascader>
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
import { createCate, editCate, getCateInfo } from '@/api/cate'

export default {
  props: {
    model: [Object, Array],
    type: String
  },
  watch: {
    model: {
      handler(val) {
        this.formData =
          this.type !== 'create'
            ? { cat_name: '', id: val.cat_id }
            : { cat_name: '', cat_pid: 0, cat_level: 0 }
      },
      immediate: true
    }
  },
  data() {
    return {
      formData: {},
      rules: {
        cat_name: [
          { required: true, message: '分类名称不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleChange(value) {
      if (value) {
        getCateInfo(value).then(({ data }) => {
          this.formData.cat_level = data.data.cat_level + 1
        })
      } else {
        this.formData.cat_pid = 0
        this.formData.cat_level = 0
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const handler = this.type === 'create' ? createCate : editCate
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
