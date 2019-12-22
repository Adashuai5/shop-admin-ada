<template>
  <div class="edit-container">
    <el-tree
      ref="treeRef"
      :data="rightsTree"
      node-key="id"
      :default-checked-keys="checkedRights"
      :props="props"
      show-checkbox
      default-expand-all
    >
    </el-tree>
    <div class="text-center mt-20">
      <el-button @click="$emit('close')">取消</el-button>
      <el-button type="primary" @click="submitTree">提交</el-button>
    </div>
  </div>
</template>
<script>
import { setRolesRight } from '@/api/auth/roles'
import { getRightsTree } from '@/api/auth/rights'
import { deepClone } from '@/utils'

export default {
  props: {
    model: Object
  },
  watch: {
    model: {
      handler(val) {
        this.checkedRights = []
        this.getTreeId(deepClone(val), this.checkedRights)
        getRightsTree().then(res => {
          this.rightsTree = res.data.data
        })
      },
      immediate: true
    }
  },
  data() {
    return {
      props: {
        children: 'children',
        label: 'authName'
      },
      checkedRights: [],
      rightsTree: []
    }
  },
  methods: {
    getTreeId(node, arr) {
      if (!node.children) {
        return arr.push(node.id)
      } else {
        node.children.forEach(item => {
          this.getTreeId(item, arr)
        })
      }
    },
    submitTree() {
      const keys = [
        ...this.$refs.treeRef.getHalfCheckedKeys(),
        ...this.$refs.treeRef.getCheckedKeys()
      ].join(',')
      setRolesRight(this.model.id, { rids: keys }).then(res => {
        this.$message.success(res.data.meta.msg)
        this.$emit('editEmit')
      })
    }
  }
}
</script>

<style lang="less" scoped></style>
