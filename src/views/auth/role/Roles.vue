<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row :gutter="20" class="mb-20">
        <el-col :span="24">
          <el-button type="primary" @click="doCreate">添加角色</el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-table
            :data="rolesList"
            highlight-current-row
            border
            :height="tableHeight + 52"
          >
            <el-table-column type="expand">
              <template slot-scope="scope">
                <el-row
                  :class="['bdbottom', index1 === 0 ? 'bdtop' : '', 'a-center']"
                  v-for="(item1, index1) in scope.row.children"
                  :key="index1"
                >
                  <el-col :span="6">
                    <el-tag
                      :closable="!(item1.children.length > 0)"
                      @close="doRemoveRight(scope.row, item1)"
                      >{{ item1.authName }}</el-tag
                    >
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <el-col :span="18"
                    ><el-row
                      :class="[index2 === 0 ? '' : 'bdtop', 'a-center']"
                      v-for="(item2, index2) in item1.children"
                      :key="index2"
                    >
                      <el-col :span="6">
                        <el-tag
                          type="success"
                          :closable="!(item2.children.length > 0)"
                          @close="doRemoveRight(scope.row, item2)"
                          >{{ item2.authName }}</el-tag
                        >
                        <i class="el-icon-caret-right"></i>
                      </el-col>
                      <el-col :span="18">
                        <el-tag
                          type="warning"
                          v-for="(item3, index3) in item2.children"
                          :key="index3"
                          closable
                          @close="doRemoveRight(scope.row, item3)"
                          >{{ item3.authName }}</el-tag
                        ></el-col
                      >
                    </el-row>
                  </el-col>
                </el-row>
              </template> </el-table-column
            ><el-table-column type="index"> </el-table-column>
            <el-table-column
              prop="roleName"
              label="角色名称"
              min-width="120"
            ></el-table-column>
            <el-table-column
              prop="roleDesc"
              label="角色描述"
              min-width="120"
            ></el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              min-width="180"
              align="center"
            >
              <template slot-scope="scope">
                <el-button
                  @click="doEdit('edit', scope.row, '编辑角色')"
                  size="mini"
                  icon="el-icon-edit"
                  type="primary"
                ></el-button>
                <el-button
                  @click="doRemove(scope.row)"
                  size="mini"
                  type="danger"
                  icon="el-icon-delete"
                  :disabled="scope.row.children.length > 0"
                ></el-button>
                <el-button
                  @click="doEdit('set', scope.row, '分配权限')"
                  size="mini"
                  type="warning"
                  icon="el-icon-setting"
                  >分配权限</el-button
                >
              </template>
            </el-table-column>
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
      <edit-role
        :model="dialog.edit.data"
        @editEmit="editEmit('edit')"
        @close="dialog.edit.show = false"
      >
      </edit-role>
    </el-dialog>

    <el-dialog
      :title="dialog.set.title"
      top="10vh"
      :visible.sync="dialog.set.show"
      v-if="dialog.set.show"
      :close-on-click-modal="false"
      width="500px"
    >
      <set-role
        :model="dialog.set.data"
        @editEmit="editEmit('set')"
        @close="dialog.set.show = false"
      >
      </set-role>
    </el-dialog>
  </div>
</template>

<script>
import { getRolesList, deleteRoles, removeRolesRight } from '@/api/auth/roles'

export default {
  name: 'roles',
  data() {
    return {
      params: {
        query: '',
        pagenum: 1,
        pagesize: 2
      },
      rolesList: [],
      total: 3,
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
    'edit-role': () => import('./edit'),
    'set-role': () => import('./set')
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      getRolesList(this.params).then(({ data }) => {
        this.rolesList = data.data
      })
    },
    doCreate() {
      this.dialog.edit.show = true
      this.dialog.edit.data = {}
      this.dialog.edit.title = '创建角色'
    },
    doEdit(obj, row, title) {
      this.dialog[obj].show = true
      this.dialog[obj].data = row
      this.dialog[obj].title = title
    },
    doRemoveRight(row, tag) {
      this.$confirm('是否确认取消该权限?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        removeRolesRight({ roleId: row.id, rightId: tag.id }).then(res => {
          this.$message({
            type: 'success',
            message: res.data.meta.msg
          })
          row.children = res.data.data
        })
      })
    },
    doRemove(row) {
      this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteRoles({ id: row.id }).then(res => {
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
<style lang="less" scoped>
.el-tag {
  margin: 10px;
}
.bdtop {
  border-top: 1px solid #eee;
}
.bdbottom {
  border-bottom: 1px solid #eee;
}
</style>
