<template>
  <div id="app">
    <el-container v-if="$route.meta.keepAlive" ref="homepage">
      <el-header>
        <Header></Header>
      </el-header>
      <el-container>
        <el-aside width="14vw">
          <keep-alive>
            <SideBar/>
          </keep-alive>
        </el-aside>
        <el-main style="background-color: #F6F6F6">
          <div class="bodyMain" style="min-height: 88vh">
            <router-view/>
          </div>
        </el-main>
      </el-container>
    </el-container>

    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
  import SideBar from './components/SideBar/SideBar'
  import Header from './components/Header/Header'

  export default {
    components: {
      SideBar,
      Header
    }

  }
</script>

<style>
  .bodyMain {
    min-height: 650px;
    margin-top: 1vh;
    margin-left: 1vh;
  }
</style>
