<template>
  <el-container>
    <el-main class="project" style="background-color: white">
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
