<template>
  <el-container style="background-color:#FFF;margin: 10px">
    <el-header style="background-color: #FFF;padding-left: 0;display: table">
      <el-input v-model="keyword" @input="change($event)"placeholder="搜索项目名称" style="float: left;width: 300px;margin:10px 40px 10px 10px">
        <el-button  @click="GetProjectList(1,100)" slot="append" style="background-color: rgb(102, 153, 204);color:#FFF">搜索</el-button>
      </el-input>
      <el-select  style="float: left;width: 200px;margin:10px 30px 10px 10px" clearable  v-model="stage"
                 placeholder="项目阶段">
        <el-option
          v-for="item in period"
          :key="item.stage"
          :label="item.label"
          :value="item.stage"
          @change="GetProjectList(1,10)">
        </el-option>
      </el-select>
      <el-select style="float: left;width: 200px;margin:10px 30px 10px 10px" clearable v-model="type"
                 placeholder="项目类别">
        <el-option
          v-for="items in item"
          :key="items.type"
          :label="items.label"
          :value="items.type"
          @change="GetProjectList(1,100)">
        </el-option>
      </el-select>
      <el-select style="float: left;width: 200px;margin:10px 30px 10px 10px" clearable  v-model="prcp"
                 placeholder="项目负责人">
        <el-option
          v-for="item in prcpSelect"
          :key="item.leader"
          :label="item.label"
          :value="item.leader"
          @change="GetProjectList(1,100)">
        </el-option>
      </el-select>
    </el-header>
    <el-main >
      <el-table
        class="project"
        :header-cell-style="{background: 'rgb(234, 241, 249)'}"
        :data="currentData"
        style="width: 100%;text-align:center"
        v-loading="loading">
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
            <el-button @click="handleClick(scope.row)" type="text"
              size="mini">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
    <el-footer >
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
    name: 'AllProject',
    data() {
      return {
        loading:false,
        keyword:'',
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
        item: [{
          type: 'integration',
          label: '集成项目'
        }, {
          type: 'software',
          label: '软件项目'
        }, {
          type: 'both',
          label: '集成+软件'
        }],

        tableHeader: [{
          label: '项目名称',
          props: 'name',
          width: 300
        },{
          label: '项目负责人',
          props: 'leader',
          width: 150
        },{
          label: '项目类别',
          props: 'type',
          width: 100
        },{
          label: '客户名称',
          props: 'customerName',
          width: 150
        },{
          label: '客户联系方式',
          props: 'contactTel',
          width: 150
        },{
          label: '项目阶段',
          props: 'stage',
          width: 150
        }],

        stage:'',
        type:'',
        leader: '',
       currentPage: 1,
        pageSize:5,
        tableData:[],
        totalSize:''
        /*--tableData: [{
        num: 1,
        PName: "智慧校园统一信息推送应用平台",
        prcp: "李某某",
          pCtgr:'集成项目',
          CName: "华南理工大学",
          CTel:'159xxxxxxxx',
          pStage:'项目储备'
      },{
          num: 2,
          PName: "智慧校园统一信息推送应用平台",
          prcp: "王某某",
          pCtgr:'集成项目',
          CName: "华中理工大学",
          CTel:'159xxxxxxxx',
          pStage:'项目储备'
        },{
          num: 3,
          PName: "智慧校园统一信息推送应用平台",
          prcp: "朱某某",
          pCtgr:'集成项目',
          CName: "华南理工大学",
          CTel:'159xxxxxxxx',
          pStage:'项目立项'
        },{
          num: 4,
          PName: "智慧校园统一信息推送应用平台",
          prcp: "杜某某",
          pCtgr:'集成+软件',
          CName: "广州大学",
          CTel:'159xxxxxxxx',
          pStage:'项目立项'
        },{
          num: 5,
          PName: "智慧校园统一信息推送应用平台",
          prcp: "张某某",
          pCtgr:'集成+软件',
          CName: "佛山大学",
          CTel:'159xxxxxxxx',
          pStage:'项目立项'
        },{
          num: 6,
          PName: "智慧校园统一信息推送应用平台",
          prcp: "江某某",
          pCtgr:'集成项目',
          CName: "华南理工大学",
          CTel:'159xxxxxxxx',
          pStage:'项目合同'
        },{
          num: 7,
          PName: "智慧校园统一信息推送应用平台",
          prcp: "尤某某",
          pCtgr:'软件项目',
          CName: "五道口职业技术学院",
          CTel:'159xxxxxxxx',
          pStage:'项目结束'
        } ]--*/
    }
  },
  computed:{
    currentData(){
      var currentData = new Array(this.pageSize);
      var dataStart = (this.currentPage-1)*this.pageSize
      var dataEnd = this.currentPage*this.pageSize
      for(var i=dataStart;i<dataEnd&&i<this.tableData.length;i++){
        currentData.unshift(this.tableData[i])
      }
      currentData.reverse()
      return currentData
    },
    prcpSelect(){
      var allPrcp =[]
      var soloPrcp={leader:'',label:''}
      var count =''
      var allSoloPrcp =[]
      var currentData =''
      for(var i=0;i<this.tableData.length;i++){
        currentData = this.tableData[i].leader
        if(allPrcp.indexOf(currentData)<0){
          allPrcp.unshift(currentData)
          soloPrcp.leader=currentData
          soloPrcp.label=currentData
          allSoloPrcp.unshift(soloPrcp)
          count++
        }
      }
      return allSoloPrcp
    }
  },

    mounted() {
    },
    methods: {
      goto(path) {
      this.$router.push(path)
    },
      handleClick(row) {
      this.$router.push({
        path:'/allIndex/operation/details',
        query: {
          id: row.id,
          stage: row.stage,
        }})
    },

      change(e) {
        this.$forceUpdate()
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
    GetProjectList(pageIndex, pageSize){
        this.loading = true;
      return new Promise((resolve, reject) => {
        let {keyword, stage, type,leader} = this
        console.log({condition: {keyword, stage, type,leader}, pageIndex, pageSize})
        this.$api.project.GetProjectList({condition: {keyword, stage, type,leader}, pageIndex, pageSize}).then(res =>{
          if(res.data.code == 200){
            this.tableData = res.data.data;
            this.totalSize = res.data.totalSize;
          }
        }).finally(() => {
          this.loading = false
        })
      })
    }},

    created() {
      this.GetProjectList(1, 100)

    },
    watch: {
      '$route': 'GetProjectList'
    }



  }

</script>

<style>
</style>
