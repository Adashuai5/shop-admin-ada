<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row :gutter="20" class="mb-20">
        <el-col :span="8">
          <el-input
            placeholder="请输入内容"
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
          <el-button type="primary" @click="doCreate">添加商品</el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-table
            :data="goodList"
            highlight-current-row
            border
            :height="tableHeight"
          >
            <el-table-column
              prop="goods_name"
              label="商品名称"
              min-width="320"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="goods_price"
              label="商品价格（元）"
              min-width="90"
            ></el-table-column>
            <el-table-column
              prop="goods_number"
              label="商品数量"
              min-width="80"
            ></el-table-column>
            <el-table-column
              prop="goods_weight"
              label="商品重量"
              min-width="80"
            ></el-table-column>
            <el-table-column prop="upd_time" label="更新时间" min-width="110">
              <template slot-scope="scope">
                <div>
                  {{ scope.row.upd_time | dataFormat }}
                </div>
              </template></el-table-column
            >
            <el-table-column
              fixed="right"
              label="操作"
              min-width="100"
              align="center"
            >
              <template slot-scope="scope">
                <el-button
                  @click="doEdit(scope.row)"
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
  </div>
</template>

<script>
import { getGoodsList,  deleteGoods } from '@/api/good/list.js'

export default {
  name: 'goods',
  data() {
    return {
      params: {
        query: '',
        pagenum: 1,
        pagesize: 10
      },
      goodList: []
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      getGoodsList(this.params).then(({ data }) => {
        this.goodList = data.data.goods
        this.pagination.total = data.data.total
      })
    },
    doCreate() {
      this.$router.push('/goods/add')
    },
    doEdit(row) {
      this.$router.push({
        path: '/goods/add',
        query: {
          id: row.goods_id
        }
      })
    },
    doRemove(row) {
      this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteGoods({ id: row.goods_id }).then(res => {
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
