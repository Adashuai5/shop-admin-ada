
<template>
  <div class="container">
    <h1>Hi, {{userInfo.username}}</h1>
  </div>
</template>

<script>
export default {
  data() {
    return { userInfo: '' }
  },
  methods: {},
  created() {
    this.userInfo = JSON.parse(window.sessionStorage.getItem('state'))
  }
}
</script>

<style lang="less" scoped>
.container {
  background-color: #fff;
  height: 100%;
  h1 {
    padding: 20px;
  }
}
</style>
