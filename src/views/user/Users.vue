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
          <el-input placeholder="请输入内容" v-model="params.query">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="8">
          <el-button type="primary">添加用户</el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-table :data="userList" highlight-current-row border :height="tableHeight">
            <el-table-column prop="username" label="姓名" min-width="120"></el-table-column>
            <el-table-column prop="mobile" label="电话" min-width="120"></el-table-column>
            <el-table-column prop="email" label="邮箱" min-width="120"></el-table-column>
            <el-table-column prop="role_name" label="角色" min-width="120"></el-table-column>
            <el-table-column prop="create_time" label="创建时间" min-width="160"></el-table-column>
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
            <el-table-column fixed="right" label="操作" min-width="180" align="center">
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
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="params.pagenum"
            :page-sizes="[2, 5, 10, 50, 100]"
            :page-size="params.pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>
  </div>
</template>

<script>
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
      total: 3
    }
  },
  created() {
    this.getUserList()
    this.tableHeight = window.innerHeight - 268
  },
  methods: {
    getUserList() {
      this.$http
        .get('/users', {
          params: this.params
        })
        .then(({data}) => {
          this.userList = data.data.users
          this.total = data.data.total
        })
    },
    handleSizeChange(val) {
      this.params.pagesize = val
      this.getUserList()
    },
    handleCurrentChange(val) {
      this.params.pagenum = val
      this.getUserList()
    },
    handleClick(row) {
      console.log(row)
    },
    changeStatus(row) {}
  }
}
</script>

<style lang="less" scoped>
</style>

