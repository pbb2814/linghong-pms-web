<template>
  <el-container>
    <el-main class="project" style="background-color: white">
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
