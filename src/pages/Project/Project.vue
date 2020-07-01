<template>
  <el-container class="bench">
    <el-header>
      <el-form class="benchForm" :inline="true" style="display: inline-block">
        <el-input v-model="keyword" @input="change($event)" placeholder="搜索项目名称"></el-input><el-button class="sbt" style="background-color: rgb(102, 153, 204);color: white;height: 40px" @click="GetProjectList(1, 10)">搜索</el-button>
        <el-form-item style="padding-left: 30px">
          <el-select v-model="stage" @change="GetProjectList(1,10)">
            <el-option label="请选择" value=""></el-option>
            <el-option
              v-for="item in period"
              :key="item.stage"
              :label="item.label"
              :value="item.stage"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="padding-left: 30px">
          <el-select v-model="type" @change="GetProjectList(1,10)">
            <el-option label="请选择" value=""></el-option>
            <el-option
              v-for="items in item"
              :key="items.type"
              :label="items.label"
              :value="items.type"
              >
            </el-option>
          </el-select>
        </el-form-item>
        <el-button class="newProjectBut" style="background-color: rgb(102, 153, 204);color: white;height: 40px" @click="goto('/index/operation/create')">创建项目</el-button>
      </el-form>
    </el-header>
      <el-table
        class="project"
        :data="tableData"
        style="width: 100%;padding-top: 20px"
        :header-cell-style="{background: 'rgb(234, 241, 249)'}" v-loading="loading">
        <el-table-column
          type="index"
          label="序号"
          :width="60">
        </el-table-column>
        <el-table-column
          v-for="list in tableHeader"
          :label="list.label"
          :prop="list.props"
          :width="list.width">
        </el-table-column>
        <el-table-column
          prop="operate"
          label="操作">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
            <el-button type="text" size="small" @click="DeleteProject(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    <el-footer class="pages">
      <el-pagination
        background
        :page-size="10"
        :pager-count="5"
        layout="prev, pager, next, jumper"
        @current-change="handleCurrentChange"
        :current-page="pageIndex"
        :total="totalSize">
      </el-pagination>
    </el-footer>
  </el-container>
</template>

<script>
  export default {
    data() {
      return {
        keyword: '',
        totalSize: '',
        pageIndex: 1,
        loading: false,
        item: [{
          type: 'integration',
          label: '集成项目'
        }, {
          type: 'software',
          label: '软件项目'
        },{
          type: 'both',
          label: '集成+软件'
        }],
        type: '',

        tableHeader: [{
          label: '项目名称',
          props: 'name',
          width: 190
        },{
          label: '项目类别',
          props: 'type',
          width: 90
        },{
          label: '客户名称',
          props: 'customerName',
          width: 110
        },{
          label: '客户联系人',
          props: 'contactName',
          width: 100
        },{
          label: '客户联系方式',
          props: 'contactTel',
          width: 120
        },{
          label: '创建人',
          props: 'creator',
          width: 80
        },{
          label: '项目负责人',
          props: 'leader',
          width: 100
        },{
          label: '项目阶段',
          props: 'stage',
          width: 80
        },{
          label: '阶段负责人',
          props: 'stageLeader',
          width: 150
        },],

        tableData: [],

        period: [{
          stage: '1',
          label: '项目储备'
        }, {
          stage: '2',
          label: '立项阶段'
        }, {
          stage: '3',
          label: '招投标阶段'
        }, {
          stage: '4',
          label: '合同阶段'
        }, {
          stage: '5',
          label: '实施阶段'
        }, {
          stage: '6',
          label: '验收阶段'
        }, {
          stage: '7',
          label: '项目结束'
        }],
        stage: '',

      }
    },
    methods: {
      change(e) {
        this.$forceUpdate()
      },
      goto(path) {
        this.$router.push(path)
      },
      handleClick(row) {
        this.$router.push({
          path:'/index/operation/details',
          query: {
            id: row.id,
            stage: row.stage,
        }})
      },
      handleCurrentChange(val){
        this.GetProjectList(val, 10)
      },
      GetProjectList(pageIndex, pageSize){
        this.loading = true;
        return new Promise((resolve, reject) => {
          let {keyword, stage, type} = this
          console.log({condition: {keyword, stage, type}, pageIndex, pageSize})
          this.$api.project.GetProjectList({condition: {keyword, stage, type}, pageIndex, pageSize}).then(res =>{
            if(res.data.code == 200){
              this.tableData = res.data.data;
              this.totalSize = res.data.totalSize;
            }
          }).finally(() => {
            this.loading = false
          })
        })
      },
      DeleteProject(index, row){
        return new Promise((resolve, reject) => {
          this.$api.project.RemoveProject(row.id).then(res =>{
            if(res.data.code == 200){
              this.$message({
                message: '项目删除成功!',
                type: 'success'
              });
              this.tableData.splice(index,1);
            }else {
              this.alertShow = true
            }
          })
        })
      }
    },
    created() {
      this.GetProjectList(1, 10)
    },
    watch: {
      '$route': 'GetProjectList'
    }
  }
</script>

<style scoped>
  .bench {
    padding-top: 40px;
    padding-left: 20px;
    padding-right: 20px;
  }
  .benchForm >>> .el-input__inner {
    border-radius: 0px;
  }
  .benchForm >>> .el-input {
    width: 12vw;
  }
  .sbt {
    border-radius: 0px;
  }
  .bench >>> .el-table th>.cell {
    color: rgb(102, 153, 204);
    font-size: 15px;
    font-weight: 400;
  }
  .newProjectBut {
    margin-left: 10vw;
    border-radius: 0px;
  }
  .pages {
    padding-top: 40px;
    padding-left: 700px;
  }
</style>

