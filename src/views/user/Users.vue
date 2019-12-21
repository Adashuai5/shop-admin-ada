<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input
            placeholder="搜索姓名"
            v-model="params.query"
            clearable
            @clear="getList"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getList"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="8">
          <el-button type="primary">添加用户</el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-table
            :data="userList"
            highlight-current-row
            border
            :height="tableHeight"
          >
            <el-table-column
              prop="username"
              label="姓名"
              min-width="120"
            ></el-table-column>
            <el-table-column
              prop="mobile"
              label="电话"
              min-width="120"
            ></el-table-column>
            <el-table-column
              prop="email"
              label="邮箱"
              min-width="120"
            ></el-table-column>
            <el-table-column
              prop="role_name"
              label="角色"
              min-width="120"
            ></el-table-column>
            <el-table-column
              prop="create_time"
              label="创建时间"
              min-width="160"
            ></el-table-column>
            <el-table-column label="状态" min-width="80">
              <template slot-scope="scope">
                <el-switch
                  v-model="scope.row.mg_state"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  @change="changeStatus(scope.row)"
                ></el-switch>
              </template>
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              min-width="180"
              align="center"
            >
              <template slot-scope="scope">
                <el-button
                  @click="handleClick(scope.row)"
                  size="mini"
                  icon="el-icon-edit"
                  type="primary"
                ></el-button>
                <el-button
                  @click="handleClick(scope.row)"
                  size="mini"
                  type="danger"
                  icon="el-icon-delete"
                ></el-button>
                <el-tooltip placement="top" content="分配角色" effect="dark">
                  <el-button
                    @click="handleClick(scope.row)"
                    size="mini"
                    type="warning"
                    icon="el-icon-setting"
                  ></el-button>
                </el-tooltip>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24" class="text-right">
          <el-pagination
            :current-page="params.pagenum"
            :page-sizes="[2, 5, 10, 50, 100]"
            :page-size="params.pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          ></el-pagination>
        </el-col>
      </el-row>
    </el-card>
    <el-dialog title="提示" :visible.sync="dialog.edit.show" width="30%">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialog.edit.show = false">取 消</el-button>
        <el-button type="primary" @click="dialog.edit.show = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getUsersList, changeType } from '@/api/users'

export default {
  name: 'users',
  data() {
    return {
      params: {
        query: '',
        pagenum: 1,
        pagesize: 2
      },
      tableHeight: '',
      userList: [],
      total: 3,
      dialog: {
        edit: {
          title: '',
          data: {},
          show: false
        }
      }
    }
  },
  created() {
    this.getList()
    this.tableHeight = window.innerHeight - 268
  },
  methods: {
    getList() {
      getUsersList(this.params).then(({ data }) => {
        this.userList = data.data.users
        this.total = data.data.total
      })
    },
    handleSizeChange(val) {
      this.params.pagesize = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.params.pagenum = val
      this.getList()
    },
    handleClick(row) {
      console.log(row)
    },
    changeStatus(row) {
      changeType({ id: row.id, mg_state: row.mg_state }).then(({ data }) => {
        this.$message.success(data.meta.msg)
      })
    }
  }
}
</script>
