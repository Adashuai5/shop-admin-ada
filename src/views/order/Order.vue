<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>订单管理</el-breadcrumb-item>
      <el-breadcrumb-item>订单列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row class="mb-20">
        <el-col :span="6">
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
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-table
            :data="ordersList"
            highlight-current-row
            border
            :height="tableHeight"
          >
            <el-table-column
              prop="order_number"
              label="订单编号"
              min-width="120"
            ></el-table-column>
            <el-table-column
              prop="order_price"
              label="订单价格"
              min-width="80"
            ></el-table-column>
            <el-table-column
              prop="is_send"
              label="发货状态"
              min-width="80"
            ></el-table-column>
            <el-table-column prop="create_time" label="下单时间" min-width="140"
              ><template slot-scope="scope">
                <div>
                  {{ scope.row.create_time | dataFormat }}
                </div>
              </template></el-table-column
            >
            <el-table-column label="支付状态" min-width="80">
              <template slot-scope="scope">
                <el-tag type="success" v-if="scope.row.pay_status === '1'"
                  >已付款</el-tag
                >
                <el-tag type="danger" v-else>未付款</el-tag>
              </template>
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              min-width="120"
              align="center"
            >
              <template slot-scope="scope">
                <el-button
                  @click="doEdit('edit', scope.row, '修改地址')"
                  size="mini"
                  icon="el-icon-edit"
                  type="primary"
                  :disabled="scope.row.is_send === '是'"
                ></el-button>
                <el-button
                  @click="showLogistics('location', scope.row, '查看物流')"
                  size="mini"
                  type="success"
                  icon="el-icon-location"
                  :disabled="scope.row.is_send === '否'"
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
      <edit-order
        :model="dialog.edit.data"
        @editEmit="editEmit('edit')"
        @close="dialog.edit.show = false"
      >
      </edit-order>
    </el-dialog>
    <el-dialog
      :title="dialog.location.title"
      :visible.sync="dialog.location.show"
      v-if="dialog.location.show"
      :close-on-click-modal="false"
      width="500px"
      ><el-timeline>
        <el-timeline-item
          v-for="(activity, index) in dialog.location.data"
          :key="index"
          :timestamp="activity.time"
        >
          {{ activity.context }}
        </el-timeline-item>
      </el-timeline>
    </el-dialog>
  </div>
</template>

<script>
import {
  getOrdersList,
  getOrderInfo,
  changeStatus,
  checkLogistics
} from '@/api/orders'

export default {
  name: 'orders',
  data() {
    return {
      params: {
        query: '',
        pagenum: 1,
        pagesize: 10
      },
      ordersList: [],
      dialog: {
        edit: {
          title: '',
          data: {},
          show: false
        },
        location: {
          title: '',
          data: {},
          show: false
        }
      }
    }
  },
  components: {
    'edit-order': () => import('./edit')
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      getOrdersList(this.params).then(({ data }) => {
        this.ordersList = data.data.goods
        this.pagination.total = data.data.total
      })
    },
    doEdit(obj, row, title) {
      this.dialog[obj].show = true
      this.dialog[obj].data = row
      this.dialog[obj].title = title
    },
    showLogistics(obj, row, title) {
      checkLogistics('1106975712662').then(res => {
        this.dialog[obj].show = true
        this.dialog[obj].data = res.data.data
        this.dialog[obj].title = title
      })
    },
    editEmit(obj) {
      this.dialog[obj].show = false
      this.getList()
    },
    changeStatus(row) {
      changeStatus({ id: row.id, mg_state: row.mg_state }).then(({ data }) => {
        this.$message.success(data.meta.msg)
      })
    }
  }
}
</script>
