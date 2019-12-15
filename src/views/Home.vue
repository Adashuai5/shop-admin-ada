<template>
  <el-container>
    <el-aside :width="isCollapse?'64px':'256px'">
      <div class="logo-wrapper">
        <router-link to="/home">
          <img src="../assets/logo.png" alt />
          <h1 v-show="!isCollapse">Ada 后台管理系统</h1>
        </router-link>
      </div>
      <el-menu
        background-color="#001529"
        text-color="#909399"
        active-text-color="#fff"
        unique-opened
        :collapse="isCollapse"
        :collapse-transition="false"
        router
        :default-active="$route.path"
      >
        <el-submenu :index="item.id+''" v-for="item in menuList" :key="item.id">
          <template slot="title">
            <i class="iconfont mr-10" :class="'icon'+ item.path"></i>
            <span class="title-text">{{item.authName}}</span>
          </template>
          <el-menu-item
            :index="'/'+ subItem.path"
            v-for="subItem in item.children"
            :key="subItem.id"
          >
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>{{subItem.authName}}</span>
            </template>
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <div class="swich el-icon-s-fold" @click="doSwitch" v-if="isCollapse === false"></div>
        <div class="swich el-icon-s-unfold" @click="doSwitch" v-else></div>
        <div>
          <el-button size="mini" plain @click="logout">退出</el-button>
        </div>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  data() {
    return {
      menuList: [],
      isCollapse: true,
      activePath: ''
    }
  },
  created() {
    this.getMenuList()
  },
  methods: {
    logout() {
      window.sessionStorage.clear('token')
      this.$router.push('/login')
    },
    getMenuList() {
      this.$http.get('menus').then(({ data: res }) => {
        this.menuList = res.data
      })
    },
    doSwitch() {
      this.isCollapse = !this.isCollapse
    }
  }
}
</script>
<style lang="less" scoped>
.el-header {
  height: 64px;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  display: flex;
  align-items: center;
  justify-content: space-between;
  .swich {
    margin-left: -20px;
    font-size: 20px;
    cursor: pointer;
    padding: 22px 24px;
    &:hover {
      background-color: #f0f2f5;
    }
  }
}

.el-aside {
  min-height: 100vh;
  box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);
  background: #001529;

  .logo-wrapper {
    background: #002140;
    height: 64px;
    padding-left: 16px;
    line-height: 64px;
    img {
      display: inline-block;
      vertical-align: middle;
      height: 32px;
    }
    h1 {
      color: #fff;
      display: inline-block;
      vertical-align: middle;
      font-size: 20px;
      margin: 0 0 0 16px;
      font-weight: 600;
    }
  }
}

.el-main {
  background: #f0f2f5;
  color: #333;
}
</style>
<style lang="less">
.el-menu {
  border-right: none;
  .el-submenu {
    :hover {
      background: #1890ff !important;
    }
    &:hover,
    &.is-active,
    &.is-open {
      .iconfont,
      .title-text {
        color: #fff !important;
      }
    }
  }
  .el-menu-item {
    &:hover {
      background: #1890ff !important;
    }
    &:hover {
      i,
      span {
        color: #fff !important;
      }
    }
    &.is-active {
      background: #1890ff !important;
    }
  }
}
</style>