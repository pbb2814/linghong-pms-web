<template>
  <el-container style="background-color:#FFF;margin: 10px">
    <el-header style="background-color:#fff;padding-left: 0;display: table">
      <el-input placeholder="请输入项目名称" v-model="keyword" @input="change($event)"
                style="margin: 10px;float: left;width: 200px"></el-input>
      <el-input placeholder="请输入搜索完成范围" v-model="searchStart" @change="GetImplementList(1,100)"
                style="margin: 10px 10px 10px 40px;float: left;width: 200px"></el-input>
      <i class="el-icon-minus" style="float: left;margin: 20px 10px 10px 10px;display: table-cell"></i>
      <el-input placeholder="请输入搜索完成范围" v-model="searchEnd" @change="GetImplementList(1,100)"
                style="margin: 10px 10px 10px 10px;float: left;width: 200px"></el-input>
      <el-button @click="GetImplementList(1,100)"
                 style=" background-color: rgb(102, 153, 204);color:#FFF;float: left;margin: 10px">搜索
      </el-button>
    </el-header>
    <el-main>
      <el-table
        v-loading="loading"
        :header-cell-style="{background: 'rgb(234, 241, 249)'}"
        :data="currentData"
        style="width: 100%;text-align:center">
        <el-table-column

          v-for="list in tableHeader"
          :label="list.label"
          :prop="list.props"
          :width="list.width">

        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">

            <el-button type="text" @click="handleClick(scope.row)"
                       size="mini">查看
            </el-button>
          </template>
        </el-table-column>

      </el-table>
    </el-main>
    <el-footer>
      <el-pagination
        style="float: inherit"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="pageSize"
        layout="prev, pager, next, jumper"
        :total="tableData.length">
      </el-pagination>
    </el-footer>
  </el-container>
</template>

<script>
  export default {
    name: 'Practice',

    data() {
      return {
        loading: false,
        currentPage: 1,
        pageSize: 5,
        keyword: '',
        stage: 6,
        searchStart: '',
        searchEnd: '',
        tableHeader: [{
          label: '序号',
          props: 'id',
          width: 60
        }, {
          label: '项目名称',
          props: 'name',
          width: 200
        }, {
          label: '客户名称',
          props: 'customerName',
          width: 150
        }, {
          label: '项目负责人',
          props: 'stageLeader',
          width: 150
        }, {
          label: '计划工量',
          props: 'workload',
          width: 80
        }, {
          label: '完成比例',
          props: 'completeRate',
          width: 100
        }, {
          label: '完成日期',
          props: 'finishDate',
          width: 180
        }],
        tableData: []
        /*--tableData: [{
          num: 1,
          PName: "智慧校园统一信息推送应用平台",
          CName: "李某某",
          prcp: "某某某",
          PTime: 50,
          pct: "50%",
          date: "2019-10-05"
        }, {
          num: 1,
          PName: "智慧校园统一信息推送应用平台",
          CName: "李某某",
          prcp: "某某某",
          PTime: 50,
          pct: "50%",
          date: "2019-10-04"
        }, {
          num: 1,
          PName: "智慧校园统一信息推送应用平台",
          CName: "李某某",
          prcp: "某某某",
          PTime: 50,
          pct: "50%",
          date: "2019-10-03"
        }, {
          num: 1,
          PName: "智慧校园统一信息推送应用平台",
          CName: "李某某",
          prcp: "某某某",
          PTime: 50,
          pct: "50%",
          date: "2019-10-02"
        }, {
          num: 1,
          PName: "智慧校园统一信息推送应用平台",
          CName: "李某某",
          prcp: "某某某",
          PTime: 50,
          pct: "50%",
          date: "2019-10-01"
        }, {
          num: 1,
          PName: "智慧校园统一信息推送应用平台",
          CName: "李某某",
          prcp: "某某某",
          PTime: 50,
          pct: "50%",
          date: "2019-09-30"
        }]--*/
      }
    },
    computed: {
      currentData() {
        var currentData = new Array(this.pageSize);
        var dataStart = (this.currentPage - 1) * this.pageSize
        var dataEnd = this.currentPage * this.pageSize
        for (var i = dataStart; i < dataEnd && i < this.tableData.length; i++) {
          currentData.unshift(this.tableData[i])
        }
        currentData.reverse()
        return currentData
      }
    },
    methods: {

      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      gettime(t) {
        var _time = new Date(t);
        var year = _time.getFullYear();//2017
        var month = _time.getMonth() + 1;//7
        var date = _time.getDate();//10
        var hour = _time.getHours();//10
        var minute = _time.getMinutes();//56
        var second = _time.getSeconds();//15
        return year + "-" + month + "-" + date;
      },

      change(e) {
        this.$forceUpdate()
      },
      handleClick(row) {
        this.$router.push({
          path: '/practiceIndex/practiceImplementationStage',
          query: {
            projectId: row.id,
          }
        })
      },
      GetImplementList(pageIndex, pageSize) {
        return new Promise((resolve, reject) => {
          this.loading = true
          let {keyword, stage} = this
          console.log({condition: {keyword, stage}, pageIndex, pageSize})
          this.$api.practice.GetImplementList({condition: {keyword, stage}, pageIndex, pageSize}).then(res => {
            if (res.data.code == 200) {
              this.tableData = res.data.data;
              this.totalSize = res.data.totalSize;
            }
          }).finally(() => {
            this.loading = false
            for (var i = 0; i < this.tableData.length; i++) {
              var newFinishDate = this.tableData[i].finishDate
              this.tableData[i].finishDate = this.gettime(newFinishDate)

            }
          })
        })
      }
    },

    created() {
      this.GetImplementList(1, 100)

    },
    watch: {
      '$route': 'GetProjectList'
    }
  }

</script>

<style>
</style>
