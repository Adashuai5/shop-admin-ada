<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item> </el-breadcrumb
    ><el-card>
      <el-row :gutter="20" class="mb-20">
        <el-col :span="24">
          <el-button type="primary" @click="doCreate()">添加分类</el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-table
            :data="cateList"
            highlight-current-row
            row-key="cat_id"
            border
            :height="tableHeight"
            :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
          >
            <el-table-column
              prop="cat_name"
              label="分类名称"
              min-width="100"
            ></el-table-column
            ><el-table-column prop="cat_deleted" label="是否有效" min-width="60"
              ><template slot-scope="scope">
                <i
                  class="el-icon-error"
                  v-if="scope.row.cat_deleted"
                  style="color: #F56C6C;"
                ></i>
                <i
                  class="el-icon-success"
                  v-else
                  style="color: #67C23A;"
                ></i></template
            ></el-table-column>
            <el-table-column
              prop="cat_level"
              label="分类当前层级"
              min-width="60"
            >
              <template slot-scope="scope">
                <el-tag :type="tagList[scope.row.cat_level]">{{
                  tagNameList[scope.row.cat_level]
                }}</el-tag>
              </template>
            </el-table-column>
            ><el-table-column
              fixed="right"
              label="操作"
              min-width="100"
              align="center"
            >
              <template slot-scope="scope">
                <el-button
                  @click="doEdit('edit', scope.row, '编辑分类')"
                  size="mini"
                  icon="el-icon-edit"
                  type="primary"
                ></el-button>
                <el-button
                  @click="doRemove(scope.row)"
                  size="mini"
                  type="danger"
                  icon="el-icon-delete"
                ></el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24" class="text-right">
          <el-pagination
            :current-page="params.pagenum"
            :page-sizes="pageSizeType"
            :page-size="params.pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pagination.total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          ></el-pagination>
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
      <edit-cate
        :model="dialog.edit.data"
        :type="dialog.edit.type"
        @editEmit="editEmit('edit')"
        @close="dialog.edit.show = false"
      >
      </edit-cate>
    </el-dialog>
  </div>
</template>

<script>
import { getCateList, deleteCate } from '@/api/good/cate'

export default {
  data() {
    return {
      params: {
        pagenum: 1,
        pagesize: 2
      },
      cateList: [],
      tagList: ['', 'success', 'info'],
      tagNameList: ['一级', '二级', '三级'],
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
    'edit-cate': () => import('./edit')
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      getCateList(this.params).then(({ data }) => {
        this.cateList = data.data.result
        this.pagination.total = data.data.total
      })
    },
    doCreate() {
      getCateList({ type: 2 }).then(res => {
        this.dialog.edit.show = true
        console.log(res.data.data)
        this.dialog.edit.data = res.data.data
        this.dialog.edit.title = '添加分类'
        this.dialog.edit.type = 'create'
      })
    },
    doEdit(obj, row, title) {
      this.dialog[obj].show = true
      this.dialog[obj].data = row
      this.dialog[obj].title = title
    },
    doRemove(row) {
      this.$confirm('此操作将永久删除该分类, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteCate({ id: row.cat_id }).then(res => {
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

<style lang="less" scoped></style>
