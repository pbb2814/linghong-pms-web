<template>
  <el-container style="display: block">
   <div style="display: inline-block">
     <div style="float: left">
       <div class="settingBar searchBar">
         <el-input v-model="keyword" class="userManagement" placeholder="搜索管理组"></el-input><el-button style="border-radius: 0;background-color: rgb(102, 153, 204);color: white" @click="getRole">搜索</el-button>
       </div>
       <div class="settingBar setting">
         <el-menu
           active-text-color="#ffd04b"
           @select="handleSelect">
           <el-menu-item
             style="padding-left: 40px;color: black"
             v-for="item in sidebar"
             :key="item.id"
             :index="item.id"
             @click="GetPermissionListByRole(item)"
           >
             {{ item.name }}
           </el-menu-item>
         </el-menu>
         <div class="iconBar" >
           <el-button icon="el-icon-plus icon" circle @click="showAddToast"></el-button>
           <el-button icon="el-icon-edit icon" circle @click="showEditToast"></el-button>
           <el-button icon="el-icon-delete-solid icon" circle @click="showRemoveToast"></el-button>
           <!--<i class="el-icon-plus iconel" @click.native="InsertRole"></i>
           <i class="el-icon-edit iconel" @click.native="InsertRole"></i>
           <i class="el-icon-delete-solid iconel" @click.native="InsertRole"></i>-->
         </div>
       </div>
     </div>
     <div class="settingBox">
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
       <div style="display: inline-block;padding: 20px;float: right">
         <el-button class="submitBut"  @click="UpdateRolePermission">确定</el-button>
       </div>
     </div>

     <div>
       <el-dialog
         :modal="true"
         :modal-append-to-body="true"
         title="添加权限组"
         lock-scroll
         :visible.sync="isShow"
         :lock-scroll="lockScroll"
         :close-on-click-modal="false"
         :show-close="true"
         :close-on-press-escape="true"
         center>
         <div class="dialogBox">
           <el-form label-position="left" inline class="dialog-table-expand">
             <el-form-item label="权限组名称：">
               <el-input v-model="RoleName"></el-input>
             </el-form-item>
           </el-form>
         </div>
         <div style="margin: 21px 0 auto 42%">
           <el-button class="But" size="small" @click="closeToast">取消</el-button>
           <el-button class="But" size="small" @click="InsertRole">确认</el-button>
         </div>

       </el-dialog>
     </div>

     <div>
       <el-dialog
         :modal="true"
         :modal-append-to-body="true"
         title="编辑权限组"
         lock-scroll
         :visible.sync="isEditShow"
         :lock-scroll="lockScroll"
         :close-on-click-modal="false"
         :show-close="true"
         :close-on-press-escape="true"
         center>
         <div class="dialogBox">
           <el-form label-position="left" inline class="dialog-table-expand">
             <el-form-item label="权限组名称：">
               <el-input v-model="EditRoleName"></el-input>
             </el-form-item>
           </el-form>
         </div>
         <div style="margin: 21px 0 auto 42%">
           <el-button class="But" size="small" @click="closeEditToast">取消</el-button>
           <el-button class="But" size="small" @click="UpdateRole">确认</el-button>
         </div>

       </el-dialog>
     </div>

     <div>
       <el-dialog
         :modal="true"
         :modal-append-to-body="true"
         title="删除权限组"
         lock-scroll
         :visible.sync="isRemoveShow"
         :lock-scroll="lockScroll"
         :close-on-click-modal="false"
         :show-close="true"
         :close-on-press-escape="true"
         center>
         <div class="dialogBox">
           <el-form label-position="left" inline class="dialog-table-expand">
             <el-form-item>删除之后不可恢复，确认是否删除？</el-form-item>
           </el-form>
         </div>
         <div style="margin: 21px 0 auto 42%">
           <el-button class="But" size="small" @click="closeRemoveToast">取消</el-button>
           <el-button class="But" size="small" @click="RemoveRole">确认</el-button>
         </div>

       </el-dialog>
     </div>

   </div>
  </el-container>
</template>

<script>
  export default {
    data() {
      return {
        /*sidebar: [
          {
            index: '/setting/development',
            name: '研发部'
          },{
            index: '/setting/executive',
            name: '行政部'
          },{
            index: '/setting/financial',
            name: '财务部'
          },{
            index: '/setting/operation',
            name: '运营部'
          },{
            index: '/setting/sale',
            name: '销售部'
          },{
            index: '/setting/marketing',
            name: '推广部'
          },
        ]*/
        sidebar: [],
        select: [],
        keyword: '',
        isShow: false,
        checkAll: false,
        tableData: [],
        Role: '',
        RoleName: '',
        isRemoveShow: false,
        isEditShow: false,
        EditRoleName: '',
      }
    },
    created() {
      this.getRole()
      this.GetPermissionTree()
      this.GetPermissionListByRole({id: 1})
    },
    watch: {
      '$route': 'setting'
    },
    methods: {
      getRole(){
        return new Promise((resolve, reject) => {
          let keyword = this.keyword
          let pageIndex = 1, pageSize = 10;
          let params = {condition: {keyword}, pageIndex, pageSize}
          console.log(params)
          this.$api.setting.GetRole(params).then(res =>{
            if(res.data.code == 200){
              this.sidebar = res.data.data;
              console.log(this.sidebar)
            }
          })
        })
      },
      // 功能模块选中对一级、二级模块
      handleCheckAllChange(val) {
        let set = new Set();
        for (let i = 0; i < this.tableData.length; i++){
          if(this.tableData[i].secondModule.length < 2){
            for(let j = 0; j < this.tableData[i].secondModule.length; j++){
              for (let x = 0; x < this.tableData[i].secondModule[j].permissions.length; x++){
                if(this.tableData[i].secondModule[j].permissions[x].id === val){
                  for (let z = 0; z < this.tableData[i].secondModule.length; z++){
                    for (let y = 0; y < this.tableData[i].secondModule[z].permissions.length; y++) {
                      set.add(this.tableData[i].secondModule[z].permissions[y].id);
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
            for(let j = 0; j < this.tableData[i].secondModule.length; j++){
              //if(this.tableData[i].secondaryModule[j].isCheck === true)
              for (let x = 0; x < this.tableData[i].secondModule[j].permissions.length; x++){
                if(this.tableData[i].secondModule[j].permissions[x].id === val){
                  for(let z = 0; z < this.tableData[i].secondModule[j].permissions.length; z++){
                    set.add(this.tableData[i].secondModule[j].permissions[z].id);
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
                    this.tableData[i].secondModule[j].isCheck = false;
                    this.tableData[i].secondModule[j].isIndeterminate = true;
                    break
                  }else if(count === 0){
                    this.tableData[i].secondModule[j].isCheck = true;
                    this.tableData[i].secondModule[j].isIndeterminate = false;
                    break
                  }else if(count === countAll){
                    this.tableData[i].secondModule[j].isCheck = false;
                    this.tableData[i].secondModule[j].isIndeterminate = false;
                    break
                  }
                }
              }
              isCount = isCount + 1
              if(this.tableData[i].secondModule[j].isCheck === false){
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
            for(let j = 0; j < this.tableData[i].secondModule.length; j++){
              for (let x = 0; x < this.tableData[i].secondModule[j].permissions.length; x++){
                set.add(this.tableData[i].secondModule[j].permissions[x].id)
              }
            }
            if(this.tableData[i].isCheckAll === true){
              let union = new Set([...this.select, ...set]);
              this.select = Array.from(union);
              this.tableData[i].isIndeterminate = false;
              for(let j = 0; j < this.tableData[i].secondModule.length; j++){
                this.tableData[i].secondModule[j].isCheck = true;
              }
            }else {
              let a = new Set(this.select);
              let difference = new Set([...a].filter(x => !set.has(x)));
              this.select = Array.from(difference);
              for(let j = 0; j < this.tableData[i].secondModule.length; j++){
                this.tableData[i].secondModule[j].isCheck = false;
              }
            }
          }
        }
      },
      // 一级模块全选、反选功能
      handleSecondary(value) {
        let set = new Set();
        for (let i = 0; i < this.tableData.length; i++){
          for(let j = 0; j < this.tableData[i].secondModule.length; j++){
            if(this.tableData[i].secondModule[j].name === value){
              for(let x = 0; x < this.tableData[i].secondModule[j].permissions.length; x++){
                set.add(this.tableData[i].secondModule[j].permissions[x].id)
              }
              if(this.tableData[i].secondModule[j].isCheck === true){
                let union = new Set([...this.select, ...set]);
                this.select = Array.from(union);
                this.tableData[i].secondModule[j].isIndeterminate = false;
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

      GetPermissionListByRole(item){
        return new Promise((resolve, reject) => {
          this.Role = item
          this.EditRoleName = item.name
          this.$api.permission.GetPermissionListByRole(item.id).then(res =>{
            if(res.data.code == 200){
              this.select = []
              for(let i = 0; i < res.data.data.length; i++){
                this.select.push(res.data.data[i].id)
              }
              console.log(this.select)
            }else {

            }
          })
        })
      },

      showAddToast(){
        this.isShow = false;
        this.isShow = !this.isShow;
      },
      closeToast(){
        this.isShow = true;
        this.isShow = !this.isShow;
      },
      showEditToast(){
        this.isEditShow = false;
        this.isEditShow = !this.isEditShow;
      },
      closeEditToast(){
        this.isEditShow = true;
        this.isEditShow = !this.isEditShow;
      },
      showRemoveToast(){
        this.isRemoveShow = false;
        this.isRemoveShow = !this.isRemoveShow;
      },
      closeRemoveToast(){
        this.isRemoveShow = true;
        this.isRemoveShow = !this.isRemoveShow;
      },

      InsertRole(){
        return new Promise((resolve, reject) => {
          let name = this.RoleName
          console.log({name})
          this.$api.setting.InsertRole({name}).then(res =>{
            if(res.data.code == 200){
              this.getRole()
              this.closeToast()
              this.$message({
                message: '新增权限组成功!',
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

      UpdateRole(){
        return new Promise((resolve, reject) => {
          let name = this.Role.name, id = this.Role.id
          this.$api.setting.UpdateRole({id, name}).then(res =>{
            if(res.data.code == 200){
              this.getRole()
              this.closeEditToast()
              this.$message({
                message: '修改权限组成功!',
                type: 'success'
              });
            }else {
              this.$message({
                message: '修改失败!',
                type: 'error'
              });
            }
          })
        })

      },

      RemoveRole(){
        return new Promise((resolve, reject) => {
          this.$api.setting.RemoveRole(this.Role.id).then(res =>{
            if(res.data.code == 200){
              this.$message({
                message: '权限组删除成功!',
                type: 'success'
              });
              this.GetRole();
              this.closeRemoveToast()
            }else {
              this.alertShow = true
            }
          })
        })
      },

      UpdateRolePermission(){
        return new Promise((resolve, reject) => {
          let permissionIds = this.select, roleId = this.Role.id
          console.log({permissionIds, roleId})
          this.$api.permission.UpdateRolePermission({permissionIds, roleId}).then(res =>{
            if(res.data.code == 200){
              this.getRole()
              this.closeEditToast()
              this.$message({
                message: '修改权限组成功!',
                type: 'success'
              });
            }else {
              this.$message({
                message: '修改失败!',
                type: 'error'
              });
            }
          })
        })
      }

    },
  }
</script>

<style>
  .dialogBox {
    padding-left: 50px;
  }
  .el-dialog__header {
    background-color: rgb(102, 153, 204);
    padding: 12px 0;
  }
  .el-dialog__title {
    color: white;
    font-size: 20px;
    font-weight: 500;
  }
  .dialog-table-expand {
    font-size: 14px;
    padding: 40px 10px 20px 40px;
    margin-right: 10px;
  }
  .dialog-table-expand label {
    width: 110px;
    color: black;
  }
  .dialog-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
  }
  .el-dialog__headerbtn .el-dialog__close {
    display: none;
  }
  .settingBar {
    background-color: white;
    color: black;
    width: 20vw;
    margin-bottom: 20px;
  }
  /*.setting {
    height: 500px;
  }*/
  .searchBar {
    padding: 1vw;
    width: 18vw;
  }
  .iconBar {
    margin-top: 140px;
    padding: 10px 5px 10px 9vw;
    background-color: rgb(234, 241, 249)
  }
  .settingBox {
    float: right;
    margin-left: 2vh;
    background-color: white;
    width: 60vw;
  }

</style>

<style scoped>
  .settingBar >>> .el-button {
    border-radius: 0px;
    background-color: rgb(102, 153, 204);
    color: white;
    height: 40px;
  }
  .searchBar >>> .el-button {
    width: 5vw;
  }
  .iconBar >>> .el-button{
    background:  rgb(234, 241, 249)!important;
    color: rgb(102, 153, 204);
    border: none;
  }
  .submitBut {
    margin: 0px 0px 20px 60px;
    background-color: rgb(102, 153, 204);
    color: white;
    border-radius: 0;
  }
  .dialog-table-expand >>> .el-input__inner{
    width: 400px;
    height: 30px;
    border-radius: 0px;
  }
  .settingBar >>> .el-input {
    width: 13vw;
  }
  .settingBar >>> .el-input__inner {
    border-radius: 0px;
  }

  .settingBar >>> .el-menu {
    border-right: 0px;
  }
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
