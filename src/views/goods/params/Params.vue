<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>参数列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row :gutter="20" class="mb-20">
        <el-alert
          type="warning"
          title="注意：只允许为第三级分类设置相关参数！"
          show-icon
          :closable="false"
        ></el-alert>
      </el-row>
      <el-row :gutter="20" class="mb-20">
        <el-col :span="24">
          <span class="mr-10">选择商品分类：</span>
          <el-cascader
            filterable
            v-model="cat_id"
            :options="cateList"
            :props="{
              value: 'cat_id',
              label: 'cat_name'
            }"
            :show-all-levels="false"
            @change="handleChange"
          ></el-cascader>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-tabs v-model="activeSel" @tab-click="getList">
            <el-tab-pane
              label="动态参数"
              name="many"
              :disabled="!cat_id"
            ></el-tab-pane>
            <el-tab-pane
              label="静态参数"
              name="only"
              :disabled="!cat_id"
            ></el-tab-pane>
          </el-tabs>
        </el-col>
        <el-col :span="24" class="mb-10">
          <el-button type="primary" @click="doCreate" :disabled="!cat_id"
            >添加参数</el-button
          >
        </el-col>
        <el-col :span="24">
          <el-table
            :data="paramsList"
            highlight-current-row
            border
            :height="tableHeight"
          >
            <el-table-column type="expand">
              <template slot-scope="scope">
                <el-tag
                  class="mr-10"
                  v-for="(item, index) in scope.row.attr_vals"
                  :key="index"
                  closable
                  @close="doRemoveRight(scope.row, item)"
                >
                  {{ item }}</el-tag
                ><el-input
                  style="width: 120px;"
                  v-if="scope.row.inputVisible"
                  v-model="scope.row.inputValue"
                  ref="saveTagInput"
                  size="mini"
                  @keyup.enter.native="handleInputConfirm(scope.row)"
                  @blur="handleInputConfirm(scope.row)"
                >
                </el-input>
                <el-button v-else size="mini" @click="showInput(scope.row)"
                  >+ New Tag</el-button
                >
              </template>
            </el-table-column>
            <el-table-column
              prop="attr_name"
              label="分类参数名称"
              min-width="120"
            ></el-table-column
            ><el-table-column align="center" label="操作">
              <template slot-scope="scope">
                <el-button
                  @click="doEdit('edit', scope.row, '编辑参数')"
                  size="mini"
                  icon="el-icon-edit"
                  type="primary"
                ></el-button>
                <el-button
                  @click="doRemove(scope.row)"
                  size="mini"
                  type="danger"
                  icon="el-icon-delete"
                ></el-button> </template
            ></el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </el-card>

    <el-dialog
      :title="dialog.edit.title"
      :visible.sync="dialog.edit.show"
      v-if="dialog.edit.show"
      :close-on-click-modal="false"
      width="500px"
    >
      <edit-params
        :model="dialog.edit.data"
        @editEmit="editEmit('edit')"
        @close="dialog.edit.show = false"
      >
      </edit-params>
    </el-dialog>
  </div>
</template>

<script>
import { getParamsList, deleteParams, editParams } from '@/api/params'
import { getCateList } from '@/api/cate'

export default {
  name: 'users',
  data() {
    return {
      inputVisible: false,
      inputValue: '',
      activeSel: 'many',
      cat_id: null,
      cateList: [],
      paramsList: [],
      dialog: {
        edit: {
          title: '',
          data: {},
          show: false
        }
      }
    }
  },
  components: {
    'edit-params': () => import('./edit')
  },
  mounted() {
    getCateList().then(({ data }) => {
      this.cateList = data.data
    })
  },
  methods: {
    doRemoveRight(row, tag) {
      row.attr_vals.splice(row.attr_vals.indexOf(tag), 1)
      editParams({
        id: this.cat_id,
        attrId: row.attr_id,
        attr_name: row.attr_name,
        attr_sel: this.activeSel,
        attr_vals: row.attr_vals.join(' ')
      }).then(res => {
        if (res.data.meta.status === 200) {
          this.$message.success('参数删除成功！')
        }
      })
    },

    showInput(row) {
      row.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },

    handleInputConfirm(row) {
      let inputValue = row.inputValue
      if (inputValue) {
        row.attr_vals.push(inputValue)
      }
      row.inputVisible = false
      row.inputValue = ''

      editParams({
        id: this.cat_id,
        attrId: row.attr_id,
        attr_name: row.attr_name,
        attr_sel: this.activeSel,
        attr_vals: row.attr_vals.join(' ')
      }).then(res => {
        if (res.data.meta.status === 200) {
          this.$message.success('参数修改成功！')
        }
      })
    },

    handleChange(value) {
      if (value && value.length - 1 >= 0) {
        this.cat_id = value[value.length - 1]
        this.getList()
        value = null
      } else {
        this.cat_id = null
      }
    },
    getList() {
      getParamsList({ sel: this.activeSel, id: this.cat_id }).then(
        ({ data }) => {
          data.data.forEach(item => {
            item.attr_vals = item.attr_vals ? item.attr_vals.split(' ') : []
            item.inputVisible = false
            item.inputValue = ''
          })
          this.paramsList = data.data
        }
      )
    },
    doCreate() {
      this.dialog.edit.show = true
      this.dialog.edit.data = { attr_sel: this.activeSel, id: this.cat_id }
      this.dialog.edit.title = '创建参数'
    },
    doEdit(obj, row, title) {
      this.dialog[obj].show = true
      this.dialog[obj].data = {
        attr_sel: this.activeSel,
        id: this.cat_id,
        ...row
      }
      this.dialog[obj].title = title
    },
    doRemove(row) {
      this.$confirm('此操作将永久删除该参数, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteParams({ id: row.cat_id, attrid: row.attr_id }).then(res => {
          this.$message({
            type: 'success',
            message: res.data.meta.msg
          })
          this.getList()
        })
      })
    },
    editEmit(obj) {
      this.dialog[obj].show = false
      this.getList()
    }
  }
}
</script>
