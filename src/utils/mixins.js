export default {
  install(Vue) {
    Vue.mixin({
      data() {
        return {
          pagination: {
            total: 0
          },
          pageSizeType: [2, 5, 10, 50, 100]
        }
      },
      methods: {
        handleSizeChange(val) {
          this.params.pagesize = val
          this.getList()
        },
        handleCurrentChange(val) {
          this.params.pagenum = val
          this.getList()
        },
        toPercent(x, y) {
          if (Number(y)) {
            let newNumber = ((Number(x) / Number(y)) * 100).toFixed(2)
            return (newNumber += '%')
          } else {
            return '0.00%'
          }
        },
        toFixedTwo(x, y) {
          if (typeof y === 'undefined') {
            return Number(x).toFixed(2)
          } else if (Number(y)) {
            let newNumber = (Number(x) / Number(y)).toFixed(2)
            return newNumber
          } else {
            return '0.00'
          }
        }
      }
    })
  }
}
