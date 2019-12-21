<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-table
        :data="rightsList"
        highlight-current-row
        border
        :height="tableHeight + 92"
      >
        <el-table-column
          type="index"
          width="50"
          align="center"
        ></el-table-column>
        <el-table-column prop="authName" label="权限名称" min-width="120">
        </el-table-column
        ><el-table-column prop="path" label="权限路径" min-width="120">
        </el-table-column>
        <el-table-column prop="level" label="权限等级" min-width="100">
          <template slot-scope="scope">
            <el-tag :type="tagList[scope.row.level]">{{
              tagNameList[scope.row.level]
            }}</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { getRightsList } from '@/api/auth/right'
export default {
  name: '',
  data() {
    return {
      rightsList: [],
      tagList: ['', 'success', 'info'],
      tagNameList: ['一级', '二级', '三级']
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      getRightsList().then(({ data: res }) => {
        this.rightsList = res.data
      })
    }
  }
}
</script>

<style lang="less" scoped></style>
