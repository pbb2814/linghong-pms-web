<template>
  <el-container>
    <el-main style="background-color: #FFF">
      <el-container class="box" style="color: black" title="任务管理">
        <el-main>
          <el-container style="margin: 10px">
            <el-table
              :header-cell-style="{background: 'rgb(234, 241, 249)'}"
              :data="tableData"
              border
              style="width: 100%">
              <el-table-column
                v-for="list in tableHeader"
                :label="list.label"
                :prop="list.props"
                :width="list.width">
              </el-table-column>

              <el-table-column
                label="操作">
                <template slot-scope="scope">
                  <el-button @click="edit(scope.row)" type="text" size="small">编辑</el-button>
                  <el-button type="text" size="small" @click="DeleteTask(scope.$index, scope.row)">删除</el-button>
                </template>
              </el-table-column>


            </el-table>
          </el-container>
        </el-main>
        <el-footer>
          <el-button type="primary" style="background-color: rgb(102, 153, 204);float: left" @click="formVSB =true">添加
          </el-button>
          <el-button style="float: right" @click="$router.go(-1)">返回</el-button>
          <el-dialog
            width="500px"
            title="添加任务"
            :visible.sync="formVSB">
            <el-form labelPosition="left" label-width="150px" class="input">
              <el-form-item label="任务名称">
                <el-input v-model="name" class="input"></el-input>
              </el-form-item>
              <el-form-item label="任务描述">
                <el-input autosize type="textarea" class="input" v-model="description"></el-input>
              </el-form-item>
              <el-form-item label="负责人">
                <el-input v-model="leader" class="input"></el-input>
              </el-form-item>
              <el-form-item label="参与人">
                <el-input v-model="member" class="input"></el-input>
              </el-form-item>
              <el-form-item label="计划工量(人/天)">
                <el-input v-model="workload" class="input"></el-input>
              </el-form-item>
              <el-form-item label="计划开始时间">
                <el-input v-model="plannedBegin" class="input"></el-input>
              </el-form-item>
              <el-form-item label="计划结束时间">
                <el-input v-model="plannedEnd" class="input"></el-input>
              </el-form-item>
              <el-form-item label="实际开始时间">
                <el-input v-model="actualBegin" class="input"></el-input>
              </el-form-item>
              <el-form-item label="实际结束时间">
                <el-input v-model="actualEnd" class="input"></el-input>
              </el-form-item>
            </el-form>

            <el-button type="primary" @click="CreateTask" style="background-color: rgb(102, 153, 204)">确认</el-button>
            <el-button @click="handleCancel">取消</el-button>
          </el-dialog>

          <el-dialog
            width="500px"
            title="编辑任务"
            :visible.sync="editFormVSB">
            <el-form labelPosition="left" label-width="150px" class="input">
              <el-form-item label="序号">
                <el-input v-model="editData.id" class="input"></el-input>
              </el-form-item>
              <el-form-item label="任务名称">
                <el-input  class="input" v-model="editData.taskName"></el-input>
              </el-form-item>
              <el-form-item label="任务描述">
                <el-input  class="input" v-model="editData.description"></el-input>
              </el-form-item>
              <el-form-item label="负责人">
                <el-input v-model="leader" class="input"></el-input>
              </el-form-item>
              <el-form-item label="参与人">
                <el-input v-model="member" class="input"></el-input>
              </el-form-item>
              <el-form-item label="计划工量(人/天)">
                <el-input v-model="workload" class="input"></el-input>
              </el-form-item>
              <el-form-item label="计划开始时间">
                <el-input v-model="plannedBegin" class="input"></el-input>
              </el-form-item>
              <el-form-item label="计划结束时间">
                <el-input v-model="plannedEnd" class="input"></el-input>
              </el-form-item>
              <el-form-item label="实际开始时间">
                <el-input v-model="actualBegin" class="input"></el-input>
              </el-form-item>
              <el-form-item label="实际结束时间">
                <el-input v-model="actualEnd" class="input"></el-input>
              </el-form-item>
            </el-form>

            <el-button type="primary" @click="handleEdit" style="background-color: rgb(102, 153, 204)">确认</el-button>
            <el-button @click="handleEditCancel">取消</el-button>
          </el-dialog>
        </el-footer>
      </el-container>
    </el-main>
  </el-container>
</template>

<script>
  export default {
    name: 'PracticeMissionManagement',
    created() {
      this.GetTaskList(this.$route.query.projectId, 1, 100)

    },
    methods: {
      edit(row){
        this.editId = row.id
        this.editData = this.tableData[row.id]
        this.editFormVSB = true
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
      GetTaskList(projectId, pageIndex, pageSize) {
        return new Promise((resolve, reject) => {
          this.loading = true
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
      },
      handleCancel() {
        this.formVSB = false
        this.name = '',
          this.description = '',
          this.leader = '',
         this.member = '',
         this.workload = '',
          this.plannedBegin = '',
          this.plannedEnd = '',
          this.actualBegin = '',
          this.actualEnd = ''
      },
      handleEditCancel(){
        this.editFormVSB =false
        this.editData.id='',
          this.editData.taskName='',
          this.editData.description='',
          this.editData.leader='',
          this.editData.member='',
          this.editData.workload='',
          this.editData.plannedBegin='',
          this.editData.plannedEnd='',
          this.editData.actualBegin='',
          this.editData.actualEnd=''}
      ,
      DeleteTask(index, row) {
        return new Promise((resolve, reject) => {
          this.$api.practice.RemoveTask(row.id).then(res => {
            if (res.data.code == 200) {
              this.$message({
                message: '任务删除成功!',
                type: 'success'
              });
              this.tableData.splice(index, 1);
            } else {
              this.alertShow = true
            }
          })
        })
      },
      CreateTask() {
        return new Promise((resolve, reject) => {
          let {
            name,
            description,
            leader,
            member,
            workload,
            plannedBegin,
            plannedEnd,
            actualBegin,
            actualEnd
          } = this
          let leaderId = this.leaderId
          let taskId = this.taskId
          let projectId = this.projectId
          console.log({
            name,
            description,
            leader,
            member,
            workload,
            plannedBegin,
            plannedEnd,
            actualBegin,
            actualEnd, leaderId, taskId, projectId
          })
          this.$api.practice.CreateTask({
            name,
            description,
            leader,
            member,
            workload,
            plannedBegin,
            plannedEnd,
            actualBegin,
            actualEnd,
            leaderId,
            taskId,
            projectId
          }).then(res => {
            if (res.data.code == 200) {
              this.$message({
                message: '新增任务成功!',
                type: 'success'
              });
            } else {
              this.$message({
                message: '添加失败!',
                type: 'error'
              });
            }
          })
        })
      },
      UpdateEstimatedInfo(){
        return new Promise((resolve, reject) => {
          let {estimatedStart, estimatedEnd, estimatedDuration, estimatedContract, estimatedCost, estimatedProfit, estimatedGrossMargin} = this.estimateInfo
          //let leaderId = this.leaderId
          //let reserveLeaderIds = this.reserveLeaderIds
          let id = this.$route.query.id
          console.log({estimatedStart, estimatedEnd, estimatedDuration, estimatedContract, estimatedCost, estimatedProfit, estimatedGrossMargin})
          this.$api.practice.UpdateEstimatedInfo({id, estimatedStart, estimatedEnd, estimatedDuration, estimatedContract, estimatedCost, estimatedProfit, estimatedGrossMargin}).then(res =>{
            if(res.data.code == 200){
              this.$message({
                message: '修改任务成功!',
                type: 'success'
              });
            }else {
              this.$message({
                message: '添加失败!',
                type: 'error'
              });
            }
          })
        })
      },
    },
    data() {
      return {
        editId:'',
        formVSB: false,
        editFormVSB:false,
        tableData: [{}],
        leaderId: [],
        projectId: [],
        taskId: [],
        editData:{id:'',taskName:'',description:'',leader:'',member:'',workload:'',plannedBegin:'',plannedEnd:'',actualBegin:'',actualEnd:''},
        name: '',
        description: '',
        leader: '',
        member: '',
        workload: '',
        plannedBegin: '',
        plannedEnd: '',
        actualBegin: '',
        actualEnd: '',

        tableHeader: [{
          label: '序号',
          props: 'id',
          width: 50
        }, {
          label: '任务名称',
          props: 'taskName',
          width: 80
        }, {
          label: '任务描述',
          props: 'description',
          width: 80
        }, {
          label: '负责人',
          props: 'leader',
          width: 80
        }, {
          label: '参与人',
          props: 'member',
          width: 100
        }, {
          label: '计划工量(人/天)',
          props: 'workload',
          width: 80
        }, {
          label: '计划开始时间',
          props: 'plannedBegin',
          width: 120
        }, {
          label: '计划结束时间',
          props: 'plannedEnd',
          width: 120
        }, {
          label: '实际开始时间',
          props: 'actualBegin',
          width: 120
        }, {
          label: '实际结束时间',
          props: 'actualEnd',
          width: 120
        }]
      }
    },
  }


</script>

<style>
  .input {
    width: 320px;
  }

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
    padding: 0;
    background-color: #FFF;
  }
</style>
