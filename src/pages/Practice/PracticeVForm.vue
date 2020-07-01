<template>
  <el-table
    :header-cell-style="{background: 'rgb(234, 241, 249)'}"
    :data="tableData" style="width: 50%">
    <el-table-column fixed="left" label="周">
      <el-table-column
        label="日期"
        width="50">
        <template>
          <el-row>计划</el-row>
          <el-row>实际</el-row>
        </template>

      </el-table-column>
    </el-table-column> <el-table-column

    v-for="list in dateList"
    :label="list.label"
    :width="40"></el-table-column>

  </el-table>
</template>

<script>
  export default {}
</script>

<style>

</style>
