<template>
  <el-container>
    <el-main style="background-color: #FFF">
      <el-container class="box" style="color: black" title="实施阶段">
        <el-main>
          <el-container style="margin:5px">
            <el-table
                      :header-cell-style="{background: 'rgb(234, 241, 249)'}"
                      :data="tableData"
                      v-loading="loading"
                      style="width: 100%">
              <el-table-column

                v-for="list in tableHeader"
                :label="list.label"
                :prop="list.props"
                :width="list.width"></el-table-column>
              <el-table-column  label="操作">
                <template slot-scope="scope">
                  <el-button type="text" size="mini" @click="formVSB=true">查看可视化进度</el-button>
                </template>

              </el-table-column>


            </el-table>

          </el-container>
        </el-main>
        <el-footer>
          <el-dialog
            width="1000px"
            title="进度可视化"
            :visible.sync="formVSB">
            <el-table :span-method="objectSpanFormMethod"
                      :header-cell-style="{background: 'rgb(234, 241, 249)'}"
                       style="width: 100%">
              <el-table-column fixed="left" label="周">
                <el-table-column
                  label="日期"
                  width="100">
                  <template>
                    <el-row>计划</el-row>
                    <el-row>实际</el-row>
                  </template>
                </el-table-column>

              </el-table-column>
              <el-table-column :label=this.tableData[0].plannedBegin>
                <el-table-column

                  v-for="list in dateList"
                  :label="list.label"
                  :width="40"></el-table-column>
              </el-table-column>

            </el-table>

          </el-dialog>
          <el-button type="primary" @click="handleClickMission"
                     style="background-color: rgb(102, 153, 204);float: left;margin-left:10px;margin-right: 10px">任务管理
          </el-button>
          <el-button type="primary" @click="handleClickToMe" style="background-color: rgb(102, 153, 204);float: left">
            与我相关
          </el-button>
          <el-button style="float: right" @click="$router.go(-1)">返回</el-button>
        </el-footer>
      </el-container>
    </el-main>
    <el-footer style="background-color: #FFF">

    </el-footer>
  </el-container>
</template>

<script>


  export default {
    name: 'PracticeImplementationStage',
    data() {
      return {
        formVSB: false,

        keyword: '',
        stage: 6,
        tableData: [{}],
        baseInfo: [],
        estimateInfo: [],
        dateList: [{}],
        loading: false,
        tableHeader: [{
          label: '序号',
          props: 'id',
          width: 50
        }, {
          label: '任务名称',
          props: 'taskName',
          width: 120
        }, {
          label: '负责人',
          props: 'leader',
          width: 60
        }, {
          label: '计划工量(天)',
          props: 'workload',
          width: 80
        }, {
          label: '计划开始时间',
          props: 'plannedBegin',
          width: 150
        }, {
          label: '计划完成时间',
          props: 'plannedEnd',
          width: 150
        }, {
          label: '实际开始时间',
          props: 'actualBegin',
          width: 150
        }, {
          label: '实际完成时间',
          props: 'actualEnd',
          width: 150
        }],
      }
    },
    methods: {
      GetColorForm() {

      },
      GetDateList() {
        for (var i = 0; i < 5; i++) {
          this.dateList.splice(i, 0, {label: i + 1})
        }
      },
      handleClickToMe() {

      },
      handleClickMission() {
        this.$router.push({
          path: '/practiceIndex/PracticeMissionManagement',
          query: {
            projectId: this.$route.query.projectId
          }

        })
      },
      getOriginalTime(t){
        var date = new Date(t)
        var time = date.getTime()
        return time
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

      objectSpanMethod({row, column, rowIndex, columnIndex}) {
        if (columnIndex < 8) {
          if (rowIndex > -1) {
            return {
              rowspan: 2,
              colspan: 1
            };
          } else {
            return {
              rowspan: 1,
              colspan: 1
            };
          }
        }
      }
      ,
      objectSpanFormMethod({row, column, rowIndex, columnIndex}) {
        if (columnIndex < 3) {
          if (rowIndex > -1) {
            return {
              rowspan: 2,
              colspan: 1
            };
          } else {
            return {
              rowspan: 1,
              colspan: 1
            };
          }
        }
      }
      ,
      /*--
      GetDetail(id, stage) {
        return new Promise((resolve, reject) => {
          this.$api.project.GetDetail(id, stage).then(res => {
            if (res.data.code == 200) {
              this.baseInfo = res.data.data.baseInfo;
              this.estimateInfo = res.data.data.estimateInfo;
            } else {
            }
          })
        })
      },--*/

      GetTaskList(projectId, pageIndex, pageSize) {
        return new Promise((resolve, reject) => {
          console.log({condition: {projectId}, pageIndex, pageSize})
          this.$api.practice.GetTaskList({condition: {projectId}, pageIndex, pageSize}).then(res => {
            if (res.data.code == 200) {
              this.tableData = res.data.data;
              this.totalSize = res.data.totalSize;

            }
          }).finally(() => {
            for (var i = 0; i < this.tableData.length; i++) {
              var newPlannedBegin = this.tableData[i].plannedBegin
              var newplannedEnd = this.tableData[i].plannedEnd
              var newActualBegin = this.tableData[i].actualBegin
              var newactualEnd = this.tableData[i].actualEnd
              this.tableData[i].plannedBegin = this.gettime(newPlannedBegin)
              this.tableData[i].plannedEnd = this.gettime(newplannedEnd)
              this.tableData[i].actualBegin = this.gettime(newActualBegin)
              this.tableData[i].actualEnd = this.gettime(newactualEnd)

            }
          })
        })
      }
    },
    created() {
      this.GetTaskList(this.$route.query.projectId, 1, 100)
      this.GetDateList()
      this.GetColorForm()

    },
    watch: {
      '$route': 'GetProjectList'
    }


  }

</script>

<style>
  .box {
    color: #4948d4;
    position: relative;
    border: 1px solid rgb(235, 235, 235);
    font-size: 20px;
  }

  .box::before {
    content: attr(title);
    position: absolute;
    left: 6%;

    transform: translateX(-50%);
    -webkit-transform: translate(-50%, -50%);
    padding: 0 10px;
    background-color: #FFF;
  }
</style>
