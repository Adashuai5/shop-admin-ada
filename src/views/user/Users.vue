<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row :gutter="20" class="mb-20">
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
          <el-button type="primary" @click="doCreate">添加用户</el-button>
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
                  @click="doEdit('edit', scope.row, '编辑用户')"
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
                <el-tooltip placement="bottom" content="分配角色" effect="dark">
                  <el-button
                    @click="doEdit('set', scope.row, '分配角色')"
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
      <edit-user
        :model="dialog.edit.data"
        @editEmit="editEmit('edit')"
        @close="dialog.edit.show = false"
      >
      </edit-user>
    </el-dialog>
    <el-dialog
      :title="dialog.set.title"
      :visible.sync="dialog.set.show"
      v-if="dialog.set.show"
      :close-on-click-modal="false"
      width="500px"
    >
      <set-user
        :model="dialog.set.data"
        @editEmit="editEmit('set')"
        @close="dialog.set.show = false"
      >
      </set-user>
    </el-dialog>
  </div>
</template>

<script>
import {
  getUsersList,
  getUsersInfo,
  changeType,
  deleteUsers
} from '@/api/users'

export default {
  name: 'users',
  data() {
    return {
      params: {
        query: '',
        pagenum: 1,
        pagesize: 2
      },
      userList: [],
      dialog: {
        edit: {
          title: '',
          data: {},
          show: false
        },
        set: {
          title: '',
          data: {},
          show: false
        }
      }
    }
  },
  components: {
    'edit-user': () => import('./edit'),
    'set-user': () => import('./set')
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      getUsersList(this.params).then(({ data }) => {
        this.userList = data.data.users
        this.pagination.total = data.data.total
      })
    },
    doCreate() {
      this.dialog.edit.show = true
      this.dialog.edit.data = {}
      this.dialog.edit.title = '创建用户'
    },
    doEdit(obj, row, title) {
      getUsersInfo(row.id).then(res => {
        this.dialog[obj].show = true
        this.dialog[obj].data = row
        this.dialog[obj].title = title
      })
    },
    doRemove(row) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteUsers({ id: row.id }).then(res => {
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
    },
    changeStatus(row) {
      changeType({ id: row.id, mg_state: row.mg_state }).then(({ data }) => {
        this.$message.success(data.meta.msg)
      })
    }
  }
}
</script>
