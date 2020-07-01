<template>
  <el-container>
    <el-header>
      <AllPeriodsBar></AllPeriodsBar>
    </el-header>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>
  import AllPeriodsBar from '../../components/PeriodsBar/PeriodsBar'
  export default {
    components: {
      AllPeriodsBar
    }

  }
</script>

<style>

</style>
