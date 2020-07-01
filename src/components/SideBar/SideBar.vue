<template>
  <el-container ref="homePage" :router="true" class="sideContainer" style="position: fixed">
    <el-aside class="sidebar" width="14vw" style="min-height: 95vh;">
      <el-menu :default-active="activeIndex" router
               text-color="#fff"
               active-text-color="#ffd04b"
               class="sidebar"
               @select="handleSelect">
          <el-menu-item
            style="text-align: left;padding-left: 4vw"
            v-for="(item,i) in sidebar"
            :key="i"
            :index="item.index"
            @click="`goto('item.index')`"
            class="sidebar"
          >
            <img src="../../icons/images/sidebar.png">
            {{item.name}}
          </el-menu-item>
      </el-menu>
    </el-aside>
  </el-container>
</template>

<script>
  export default {
    name: 'App',
    data() {
      return {
        activeIndex: '/',
        sidebar: [
          {
            index: '/bench',
            name: '财务管理'
          },{
            index: '/index',
            name: '我的项目'
          },{
            index: '/practiceIndex',
            name: '实施管理'
          },{
            index: '/allIndex',
            name: '所有项目'
          },{
            index: '/bench',
            name: '供应商管理'
          },{
            index: '/customerManagement',
            name: '客户管理'
          },{
            index: '/bench',
            name: '数据统计'
          },{
            index: '/userManagement',
            name: '人员管理'
          },{
            index: '/setting',
            name: '系统设置'
          },{
            index: '/login',
            name: '退出系统'
          },
        ]
      }
    },
    methods:{
      goto(path) {
        this.$router.push(path)
      },
      handleSelect (index) {
        this.activeIndex = index
      }
    },
    mounted(){
      // this.element.active=this.$route.fullPath
      this.activeIndex = this.$route.matched[0].path || '/'
    },
    watch: {
      '$route' () {
        this.handleSelect(this.activeIndex)
      }
    },
  }
</script>

<style scoped>
  .sidebar >>> .el-menu-item {
    text-align: center;
    background-color: rgb(51, 102, 153);
  }

  .sidebar >>> .el-menu-item:hover{
    background-color: rgb(102, 153, 204) !important;
  }
  .sidebar >>> .el-menu-item.is-active {
    background: rgb(102, 153, 204) !important;
  }
  .sideContainer >>> .el-aside {
    color: #333;
    padding-top: 10vh;
    background-color: rgb(51, 102, 153);
  }
</style>
<style>
  img {
    padding-right: 0.5vw;
    width: 19px;
    height: 19px;
  }
  body{
    margin: 0px;
    padding: 0px;
  }
  .sidebar {
    background-color: rgb(51, 102, 153);
    font-size: 1.8vh;
  }
</style>
