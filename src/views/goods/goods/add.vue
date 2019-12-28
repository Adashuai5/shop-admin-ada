<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加商品</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row class="mb-20">
        <el-alert
          center
          type="info"
          title="注意：只允许为第 三级分类设置相关参数！"
          show-icon
          :closable="false"
        ></el-alert>
      </el-row>
      <el-row class="mb-20">
        <el-steps
          align-center
          :active="activeIndex - 0"
          finish-status="success"
        >
          <el-step
            :title="item"
            v-for="(item, index) in stepList"
            :key="index"
          ></el-step>
          <el-step title="完成"></el-step>
        </el-steps>
      </el-row>
      <el-row>
        <el-form
          :model="formData"
          ref="formData"
          label-width="100px"
          :rules="rules"
          label-position="top"
        >
          <el-tabs
            tab-position="left"
            v-model="activeIndex"
            :before-leave="beforeTabLeave"
            @tab-click="clickTab"
          >
            <el-tab-pane
              :label="item"
              v-for="(item, index) in stepList"
              :key="index"
              :name="index + ''"
            >
              <el-col v-if="activeIndex === '0'">
                <el-form-item label="商品名称" prop="goods_name">
                  <el-input v-model="formData.goods_name"></el-input>
                </el-form-item>
                <el-form-item label="商品价格" prop="goods_price">
                  <el-input
                    type="number"
                    v-model="formData.goods_price"
                  ></el-input>
                </el-form-item>
                <el-form-item label="商品重量" prop="goods_weight">
                  <el-input
                    type="number"
                    v-model="formData.goods_weight"
                  ></el-input>
                </el-form-item>
                <el-form-item label="商品数量" prop="goods_number">
                  <el-input
                    type="number"
                    v-model="formData.goods_number"
                  ></el-input>
                </el-form-item>
                <el-form-item label="商品分类" prop="goods_cat"
                  ><el-cascader
                    filterable
                    v-model="formData.goods_cat"
                    :options="cateList"
                    :props="{
                      value: 'cat_id',
                      label: 'cat_name'
                    }"
                    :show-all-levels="false"
                    @change="handleChange"
                  ></el-cascader>
                </el-form-item>
              </el-col>
              <el-col v-if="activeIndex === '1'">
                <el-form-item
                  :label="item.attr_name"
                  v-for="item in manyTableList"
                  :key="item.attr_id"
                  ><el-checkbox-group v-model="item.attr_vals">
                    <el-checkbox
                      border
                      :label="label"
                      v-for="(label, value) in item.attr_vals"
                      :key="value"
                    ></el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
              </el-col>
              <el-col v-if="activeIndex === '2'">
                <el-form-item
                  :label="item.attr_name"
                  v-for="item in onlyTableList"
                  :key="item.attr_id"
                  ><el-input v-model="item.attr_vals"></el-input>
                </el-form-item>
              </el-col>
              <el-col v-if="activeIndex === '3'">
                <el-form-item
                  ><el-upload
                    :action="uploadURL"
                    :headers="headers"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :on-success="handleSuccess"
                    list-type="picture"
                  >
                    <el-button size="small" type="primary">点击上传</el-button>
                  </el-upload>
                </el-form-item>
              </el-col>
              <el-col v-if="activeIndex === '4'">
                <el-form-item
                  ><quill-editor
                    :content="formData.goods_introduce"
                    @change="onEditorChange($event)"
                  >
                  </quill-editor>
                </el-form-item>
                <el-form-item
                  ><el-button type="primary" @click="submitForm('formData')"
                    >添加</el-button
                  >
                </el-form-item>
              </el-col>
            </el-tab-pane>
          </el-tabs>
        </el-form>
      </el-row>
    </el-card>
    <el-dialog
      :title="dialog.title"
      :visible.sync="dialog.show"
      v-if="dialog.show"
      :close-on-click-modal="false"
      top="10vh"
      width="50%"
    >
      <img :src="dialog.data" alt="" style="width: 100%;" />
    </el-dialog>
  </div>
</template>

<script>
import { getGoodsInfo, createGoods, editGoods } from '@/api/good/list.js'
import { getCateList } from '@/api/good/cate'
import { getParamsList } from '@/api/good/params'
import { deepClone } from '@/utils'

const INITDATA = {
  goods_name: '',
  goods_price: 0,
  goods_weight: 0,
  goods_number: 0,
  goods_cat: [],
  attrs: [],
  pics: [],
  goods_introduce: ''
}
export default {
  data() {
    return {
      uploadURL: 'http://127.0.0.1:8888/api/private/v1/upload',
      headers: {
        Authorization: window.sessionStorage.getItem('token')
      },
      nowId: '',
      cateList: [],
      manyTableList: [],
      onlyTableList: [],
      content: '',
      formData: {},
      dialog: { show: false, data: '', title: '查看图片' },
      rules: {
        goods_name: [
          { required: true, message: '请输入商品名称', trigger: 'blur' }
        ],
        goods_price: [
          { required: true, message: '请输入商品价格', trigger: 'blur' }
        ],
        goods_weight: [
          { required: true, message: '请输入商品重量', trigger: 'blur' }
        ],
        goods_number: [
          { required: true, message: '请输入商品数量', trigger: 'blur' }
        ]
      },
      activeIndex: '0',
      stepList: ['基本信息', '商品参数', '商品属性', '商品图片', '商品内容']
    }
  },
  mounted() {
    this.nowId = this.$route.query.id - 0 || ''
    getCateList().then(({ data }) => {
      this.cateList = data.data
    })
    if (this.nowId) {
      getGoodsInfo(this.nowId).then(({ data }) => {
        this.formData = deepClone(data.data)
        this.formData.goods_cat = Array.from(
          this.formData.goods_cat.split(','),
          x => x * 1
        )
        console.log(this.formData)
      })
    } else {
      this.formData = deepClone(INITDATA)
    }
  },
  methods: {
    onEditorChange({ quill, html, text }) {
      this.content = html
    },
    handleSuccess(file) {
      this.formData.pics.push({ pic: file.data.tmp_path })
    },
    handleRemove(file) {
      const i = this.formData.pics.findIndex(item => {
        item.pic === file.response.data.tmp_path
      })
      this.formData.pics.splice(i, 1)
    },
    handlePreview(file) {
      this.dialog.show = true
      this.dialog.data = file.response.data.url
    },
    clickTab() {
      if (this.activeIndex === '1') {
        getParamsList({
          sel: 'many',
          id: this.formData.goods_cat[this.formData.goods_cat.length - 1]
        }).then(({ data }) => {
          data.data.forEach(item => {
            item.attr_vals = item.attr_vals ? item.attr_vals.split(' ') : []
          })
          this.manyTableList = data.data
        })
      } else if (this.activeIndex === '2') {
        getParamsList({
          sel: 'only',
          id: this.formData.goods_cat[this.formData.goods_cat.length - 1]
        }).then(({ data }) => {
          data.data.forEach(item => {
            item.attr_vals = item.attr_vals ? item.attr_vals.split(' ') : []
          })
          this.onlyTableList = data.data
        })
      }
    },
    beforeTabLeave(activeName, oldActiveName) {
      if (oldActiveName === '0' && this.formData.goods_cat.length - 1 < 0) {
        this.$message.error('请先选择商品分类')
        return false
      }
    },
    handleChange(value) {
      if (value && value.length - 1 < 0) {
        this.formData.goods_cat = []
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    submitForm(formName) {
      const lData = deepClone(this.formData)
      lData.goods_introduce = this.content
      lData.goods_cat = lData.goods_cat.join(',')
      this.manyTableList.forEach(item => {
        const newInfo = {
          attr_id: item.attr_id,
          attr_value: item.attr_vals.join(',')
        }
        lData.attrs.push(newInfo)
      })
      this.onlyTableList.forEach(item => {
        const newInfo = {
          attr_id: item.attr_id,
          attr_value: item.attr_vals.join(',')
        }
        lData.attrs.push(newInfo)
      })
      this.$refs[formName].validate(valid => {
        if (valid) {
          const handler = !this.nowId ? createGoods : editGoods
          handler(lData).then(res => {
            this.$message.success(res.data.meta.msg)
            this.$emit('editEmit')
          })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.el-checkbox {
  margin: 0 10px 0 0 !important;
}
</style>
