<template>
  <el-container>
    <el-header>
      <PeriodsBar></PeriodsBar>
    </el-header>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>
  import PeriodsBar from '../../components/PeriodsBar/PeriodsBar'
  export default {
    components: {
      PeriodsBar
    }

  }
</script>

<style>

</style>
