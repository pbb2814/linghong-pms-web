<template>
  <div class="Module">
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        porp="primaryModule"
        label="一级模块"
        width="160"
        >
        <template slot-scope="scope">
          <el-checkbox
            @change="handleCheckedChange(scope.row.primaryModule)"
            v-model="scope.row.isCheckAll"
            :indeterminate="scope.row.isIndeterminate"
            :label="scope.row.primaryModule"
            :key="scope.row.primaryModule"
          >
          </el-checkbox>
        </template>
      </el-table-column>
      <el-table-column
        @change="handleCheckedChange"
        prop="secondaryModule"
        label="二级模块"
        width="180"
        >
        <template slot-scope="scope">
          <div>
            <el-checkbox
              class="split"
              v-for="item in scope.row.secondModule"
              :indeterminate="item.isIndeterminate"
              v-model="item.isCheck"
              :label="item.name"
              @change="handleSecondary(item.name)"
              v-if="item.name !== ''"></el-checkbox>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="Modules"
        label="功能操作"
        >
        <template slot-scope="scope">
          <div class="split" v-for="items in scope.row.secondModule">
            <el-checkbox
              v-for="item in items.permissions"
              :label="item.id"
              :key="item.id"
              v-model="select"
              @change="handleCheckAllChange(item.id)"
            >{{ item.name }}
            </el-checkbox>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>


<script>
  export default {
    data () {
      return {
        checkAll: false,
        select: [],
        /*tableData: [{
          isCheckAll: false,
          isIndeterminate: false,
          primaryModule: '财务管理',
          secondaryModule: [{
            isCheck: false,
            isIndeterminate: false,
            name: '财务核算',
            Modules: [
              {
                name: '查看',
                id: 1
              }],
          }, {
            isCheck: false,
            isIndeterminate: false,
            name: '财务审核',
            Modules: [{
              name: '查看',
              id: 2
            }, {
              name: '审核',
              id: 3
            }]
          }],
        }, {
          isCheckAll: false,
          isIndeterminate: false,
          primaryModule: '项目管理',
          secondaryModule: [{
            name: '',
            Modules: [{
              name: '创建项目',
              id: 4
            }, {
              name: '查看',
              id: 5
            }, {
              name: '删除',
              id: 6
            },]
          }],
        },{
          isCheckAll: false,
          isIndeterminate: false,
          primaryModule: '实施管理',
          secondaryModule: [{
            name: '',
            Modules: [{
              name: '查看',
              id: 7
            },]
          }],

        }, {
          isCheckAll: false,
          isIndeterminate: false,
          primaryModule: '所有项目',
          secondaryModule: [{
            name: '',
            Modules: [{
              name: '查看',
              id: 8
            },]
          }],
        }, {
          isCheckAll: false,
          isIndeterminate: false,
          primaryModule: '供应商管理',
          secondaryModule: [{
            name: '',
            Modules: [{
              name: '新增供应商',
              id: 9
            }, {
              name: '查看',
              id: 10
            }, {
              name: '编辑',
              id: 11
            }, {
              name: '删除',
              id: 12
            },]
          }],
        }, {
          isCheckAll: false,
          isIndeterminate: false,
          primaryModule: '客户管理',
          secondaryModule: [{
            name: '',
            Modules: [{
              name: '新增客户',
              id: 13
            }, {
              name: '查看',
              id: 14
            }, {
              name: '编辑',
              id: 15
            }, {
              name: '删除',
              id: 16
            },]
          }],
        }, {
          isCheckAll: false,
          isIndeterminate: false,
          primaryModule: '数据统计',
          secondaryModule: [{
            name: '',
            Modules: [{
              name: '查看',
              id: 17
            },]
          }],
        }, {
          isCheckAll: false,
          isIndeterminate: false,
          primaryModule: '人员管理',
          secondaryModule: [{
            name: '',
            Modules: [{
              name: '添加人员',
              id: 18
            }, {
              name: '查看',
              id: 19
            }, {
              name: '编辑',
              id: 20
            }, {
              name: '删除',
              id: 21
            },]
          }],
        }, {
          isCheckAll: false,
          isIndeterminate: false,
          primaryModule: '系统设置',
          secondaryModule: [{
            name: '',
            Modules: [{
              name: '查看',
              id: 22
            },]
          }],
        }],*/

        tableData: []
      }
    },
    methods: {
      // 功能模块选中对一级、二级模块
      handleCheckAllChange(val) {
        let set = new Set();
        for (let i = 0; i < this.tableData.length; i++){
          if(this.tableData[i].secondaryModule.length < 2){
            for(let j = 0; j < this.tableData[i].secondaryModule.length; j++){
              for (let x = 0; x < this.tableData[i].secondaryModule[j].Modules.length; x++){
                if(this.tableData[i].secondaryModule[j].Modules[x].id === val){
                  for (let z = 0; z < this.tableData[i].secondaryModule.length; z++){
                    for (let y = 0; y < this.tableData[i].secondaryModule[z].Modules.length; y++) {
                      set.add(this.tableData[i].secondaryModule[z].Modules[y].id);
                    }
                  }
                  let countAll = 0;
                  let count = 0;
                  for (let x of set) {
                    countAll = countAll+1;
                    if(!this.select.includes(x)){
                      count = count + 1;
                    }
                  }
                  if(count>0 && count<countAll){
                    this.tableData[i].isCheckAll = false;
                    this.tableData[i].isIndeterminate = true;
                    return
                  }else if(count === 0){
                    this.tableData[i].isCheckAll = true;
                    this.tableData[i].isIndeterminate = false;
                    return
                  }else if(count === countAll){
                    this.tableData[i].isCheckAll = false;
                    this.tableData[i].isIndeterminate = false;
                    return;
                  }
                }
              }
            }
          }else {
            let set = new Set();
            let isCheckCount = 0;
            let isCount = 0;
            for(let j = 0; j < this.tableData[i].secondaryModule.length; j++){
              //if(this.tableData[i].secondaryModule[j].isCheck === true)
              for (let x = 0; x < this.tableData[i].secondaryModule[j].Modules.length; x++){
                if(this.tableData[i].secondaryModule[j].Modules[x].id === val){
                  for(let z = 0; z < this.tableData[i].secondaryModule[j].Modules.length; z++){
                    set.add(this.tableData[i].secondaryModule[j].Modules[z].id);
                  }
                  //alert([...set])
                  let countAll = 0;
                  let count = 0;
                  for (let x of set) {
                    countAll = countAll+1;
                    if(!this.select.includes(x)){
                      count = count + 1;
                    }
                  }
                  //alert(countAll+''+count)
                  if(count>0 && count<countAll){
                    this.tableData[i].secondaryModule[j].isCheck = false;
                    this.tableData[i].secondaryModule[j].isIndeterminate = true;
                    break
                  }else if(count === 0){
                    this.tableData[i].secondaryModule[j].isCheck = true;
                    this.tableData[i].secondaryModule[j].isIndeterminate = false;
                    break
                  }else if(count === countAll){
                    this.tableData[i].secondaryModule[j].isCheck = false;
                    this.tableData[i].secondaryModule[j].isIndeterminate = false;
                    break
                  }
                }
              }
              isCount = isCount + 1
              if(this.tableData[i].secondaryModule[j].isCheck === false){
                isCheckCount = isCheckCount + 1
              }
            }
            if(isCheckCount>0 && isCheckCount<isCount){
              this.tableData[i].isCheckAll = false;
              this.tableData[i].isIndeterminate = true;
              return
            }else if(isCheckCount === 0){
              this.tableData[i].isCheckAll = true;
              this.tableData[i].isIndeterminate = false;
              return;
            }else if(isCheckCount === isCount){
              this.tableData[i].isCheckAll = false;
              this.tableData[i].isIndeterminate = false;
              return;
            }

          }

        }

      },
      // 二级模块全选、反选功能
      handleCheckedChange(value) {
        let set = new Set();
        for (let i = 0; i < this.tableData.length; i++){
          if(this.tableData[i].primaryModule === value){
            for(let j = 0; j < this.tableData[i].secondaryModule.length; j++){
              for (let x = 0; x < this.tableData[i].secondaryModule[j].Modules.length; x++){
                set.add(this.tableData[i].secondaryModule[j].Modules[x].id)
              }
            }
            if(this.tableData[i].isCheckAll === true){
              let union = new Set([...this.select, ...set]);
              this.select = Array.from(union);
              this.tableData[i].isIndeterminate = false;
              for(let j = 0; j < this.tableData[i].secondaryModule.length; j++){
                this.tableData[i].secondaryModule[j].isCheck = true;
              }
            }else {
              let a = new Set(this.select);
              let difference = new Set([...a].filter(x => !set.has(x)));
              this.select = Array.from(difference);
              for(let j = 0; j < this.tableData[i].secondaryModule.length; j++){
                this.tableData[i].secondaryModule[j].isCheck = false;
              }
            }
          }
        }
      },
      // 一级模块全选、反选功能
      handleSecondary(value) {
        let set = new Set();
        for (let i = 0; i < this.tableData.length; i++){
          for(let j = 0; j < this.tableData[i].secondaryModule.length; j++){
            if(this.tableData[i].secondaryModule[j].name === value){
              for(let x = 0; x < this.tableData[i].secondaryModule[j].Modules.length; x++){
                set.add(this.tableData[i].secondaryModule[j].Modules[x].id)
              }
              if(this.tableData[i].secondaryModule[j].isCheck === true){
                let union = new Set([...this.select, ...set]);
                this.select = Array.from(union);
                this.tableData[i].secondaryModule[j].isIndeterminate = false;
              }else {
                let a = new Set(this.select);
                let difference = new Set([...a].filter(x => !set.has(x)));
                this.select = Array.from(difference);
              }
            }
          }
        }
      },

      GetPermissionTree(){
        return new Promise((resolve, reject) => {
          this.$api.permission.GetPermissionTree().then(res =>{
            if(res.data.code == 200){
              this.tableData = res.data.data;
              let obj, obj1;
              for (let i = 0; i < this.tableData.length; i++){
                obj = this.tableData[i]
                obj.isCheckAll = false
                obj.isIndeterminate = false
                for (let j = 0; j < this.tableData[i].length; j++){
                  obj1 = this.tableData[i].secondModule[j]
                  obj1.isCheck = false
                  obj1.isIndeterminate = false
                }
                //this.tableData[i].append("isIndeterminate", false)
              }
              console.log(this.tableData)
            }else {

            }
          })
        })
      },

      GetPermissionListByRole(select){

        return new Promise((resolve, reject) => {
          this.$api.permission.GetPermissionListByRole(1).then(res =>{
            if(res.data.code == 200){
              for(let i = 0; i < res.data.data.length; i++){
                this.select.push(res.data.data[i].id)
              }
              console.log(this.select)
            }else {

            }
          })
        })
      }
    },
    created() {
      this.GetPermissionTree()
      this.GetPermissionListByRole()
    },
    watch: {
      '$route': 'GetPermissionTree'
    }
  }
</script>

<style scoped>
  .Module >>> .el-table th>.cell{
    text-align: center;
    color: rgb(102, 153, 204);
    font-size: 15px;
    font-weight: 400;
  }
  .split:nth-of-type(2)
  {
    border-top: 1px solid #EBEEF5;
    padding-bottom: 10px;
    padding-top: 20px;
  }
  .split:nth-of-type(1)
  {
    padding-bottom: 20px;
    padding-top: 10px;
  }
  .el-checkbox{
    width: 160px;
  }
</style>
