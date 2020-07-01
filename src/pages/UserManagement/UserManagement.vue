<template>
  <el-container class="userBench" style="background-color: white">
    <el-header>
      <el-form class="userBenchForm" :inline="true" style="display: inline-block">
        <el-input v-model="keyword" class="userManagement" placeholder="姓名"></el-input><el-button class="sbt" @click="GetUserList(1, 10)">搜索</el-button>
        <el-form-item style="padding-left: 30px">
          <el-select v-model="stage" @change="GetUserList(1,10)">
            <el-option
              v-for="person in user"
              :key="person.stage"
              :label="person.label"
              :value="person.stage">
            </el-option>
          </el-select>
        </el-form-item>

        <el-button class="sbt" style="margin-left: 16vw;" @click="showToast('新增人员')">新增人员</el-button>
      </el-form>
    </el-header>

    <el-table
      v-loading="loading"
      :data="tableData"
      style="width: 100%;padding-top: 20px"
      :header-cell-style="{background: 'rgb(234, 241, 249)'}">
      <el-table-column
        type="index"
        label="序号"
        :width="80">
      </el-table-column>
      <el-table-column
        class="user"
        v-for="list in tableHeader"
        :label="list.label"
        :prop="list.props"
        :width="list.width">

      </el-table-column>
      <el-table-column
        prop="operate"
        label="操作">
        <template slot-scope="scope">
          <el-button @click="showEditToast(scope.row)" type="text" size="small">编辑</el-button>
          <el-button type="text" size="small" @click="DeleteUser(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div>
      <UserToast :isShow="isShow" :title="title"></UserToast>
    </div>
    <div>
      <el-dialog
        :modal="true"
        :modal-append-to-body="true"
        title="编辑人员"
        lock-scroll
        :visible.sync="isEditShow"
        :close-on-click-modal="false"
        :show-close="true"
        :close-on-press-escape="true"
        center>
        <div class="dialogBox">
          <el-form label-position="left" inline class="dialog-table-expand">
            <el-form-item label="姓名：">
              <el-input v-model="Info.name"></el-input>
            </el-form-item>
            <el-form-item label="性别：">
              <el-select
                v-model="Info.gender"
                placeholder="请选择">
                <el-option
                  v-for="gender in genders"
                  :key="gender.id"
                  :label="gender.name"
                  :value="gender.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="部门：">
              <el-select
                v-model="Info.departmentId"
                placeholder="请选择">
                <el-option
                  v-for="departments in department"
                  :key="departments.id"
                  :label="departments.name"
                  :value="departments.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="职务：">
              <el-input v-model="Info.positionId"></el-input>
            </el-form-item>
            <el-form-item label="联系方式：">
              <el-input v-model="Info.tel"></el-input>
            </el-form-item>
            <el-form-item>*请输入该人员手机号，输入的手机号作为将为该用户的登录账号</el-form-item>
            <el-form-item label="权限组：">
              <el-select
                v-model="Info.roleId"
                placeholder="请选择">
                <el-option
                  v-for="role in Role"
                  :key="role.id"
                  :label="role.name"
                  :value="role.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
        <div style="margin: 21px 0 auto 42%">
          <el-button class="But" size="small" @click="closeEditToast">取消</el-button>
          <el-button class="But" size="small" @click="UpdateUser">确认</el-button>
        </div>

      </el-dialog>
    </div>
    <el-footer class="pages">
      <el-pagination
        background
        :page-size="20"
        :pager-count="5"
        layout="prev, pager, next, jumper"
        current-change="handleCurrentChange"
        :current-page="pageIndex"
        :total="totalSize">
      </el-pagination>
    </el-footer>
  </el-container>

</template>

<script>
  import UserToast from '../../components/Toast/UserToast'
  export default {
    data() {
      return {
        title: '',
        UserId: '',
        Info: [],
        isShow: false,
        isEditShow: false,
        loading: false,
        totalSize: '',
        keyword: '',
        department: [],
        Role: [],
        genders: [{
          id: 1,
          name: '男'
        }, {
          id: 2,
          name: '女'
       }],
        user: [{
          stage: '1',
          label: '项目管理'
        }, {
          stage: '2',
          label: '客户管理'
        },{
          stage: '3',
          label: '供应商管理'
        }],
        stage: '',

        tableHeader: [{
          label: '姓名',
          props: 'name',
          width: 110
        },{
          label: '性别',
          props: 'gender',
          width: 100
        },{
          label: '部门',
          props: 'departmentId',
          width: 110
        },{
          label: '职务',
          props: 'positionId',
          width: 120
        },{
          label: '联系方式',
          props: 'tel',
          width: 150
        },{
          label: '权限组',
          props: 'roleId',
          width: 200
        },],

        tableData: [],

      }
    },
    components: {
      UserToast
    },
    methods: {
      goto(path) {
        this.$router.push(path)
      },
      showToast(title){
        this.isShow = false;
        this.isShow = !this.isShow;
        this.title = title
      },
      showEditToast(row){
        this.isShow = false;
        this.isEditShow = false;
        this.isEditShow = !this.isEditShow
        this.GetUserDetail(row.id)
        this.UserId = row.id
      },
      closeEditToast(){
        this.isEditShow = true;
        this.isEditShow = !this.isEditShow;
      },
      handleCurrentChange(val){
        this.GetUserList(val, 10)
      },
      DeleteUser(index, row){
        return new Promise((resolve, reject) => {
          this.$api.user.RemoveUser(row.id).then(res =>{
            if(res.data.code == 200){
              this.$message({
                message: '人员删除成功!',
                type: 'success'
              });
              this.tableData.splice(index,1);
            }else {
              this.alertShow = true
            }
          })
        })
      },
      getRole(){
        return new Promise((resolve, reject) => {
          let keyword = this.keyword
          let pageIndex = 1, pageSize = 10;
          let params = {condition: {keyword}, pageIndex, pageSize}
          console.log(params)
          this.$api.setting.GetRole(params).then(res =>{
            if(res.data.code == 200){
              this.Role = res.data.data;
              console.log(this.Role)
            }
          })
        })
      },
      GetUserList(pageIndex, pageSize){
        this.loading = true;
        this.isShow = false;
        return new Promise((resolve, reject) => {
          let {keyword} = this
          let roleId = this.stage
          console.log({condition: {keyword, roleId}, pageIndex, pageSize})
          this.$api.user.GetUserList({condition: {keyword, roleId}, pageIndex, pageSize}).then(res =>{
            if(res.data.code == 200){
              this.tableData = res.data.data;
              this.totalSize = res.data.totalSize;
              this.loading = false
            }else {
              this.alertShow = true
            }
          })
        })
      },
      GetUserDetail(id){
        return new Promise((resolve, reject) => {
          this.$api.user.GetUserDetail(id).then(res =>{
            if(res.data.code == 200){
              this.Info = res.data.data;

              console.log(this.Info)
            }else {

            }
          })
        })
      },
      UpdateUser(){
        return new Promise((resolve, reject) => {
          let {departmentId, gender, name, positionId, roleId, tel, password} = this.Info
          //let leaderId = this.leaderId
          //let reserveLeaderIds = this.reserveLeaderIds
          let id = this.UserId
          console.log({id, departmentId, gender, name, positionId, roleId, tel, password})
          this.$api.user.UpdateUser({id, departmentId, gender, name, positionId, roleId, tel, password}).then(res =>{
            if(res.data.code == 200){
              this.$message({
                message: '人员修改成功!',
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
      GetDepartment(pageIndex, pageSize){
        return new Promise((resolve, reject) => {
          this.$api.department.GetDepartment({ pageIndex, pageSize }).then(res =>{
            if(res.data.code == 200){
              this.department = res.data.data;
              console.log(this.department)
            }else {

            }
          })
        })
      },
      handleClick(row) {
        this.$router.push({
          path:'/userDetail',
          /*query: {
            id: row.id,
            stage: row.stage,
          }*/})
      },
    },
    created() {
      this.GetUserList(1, 10)
      this.GetDepartment(1, 10)
      this.getRole()
    },
    watch: {
      '$route': 'GetUserList'
    }
  }
</script>

<style scoped>
  .userBench {
    padding: 60px 40px 40px 40px;

  }
  .sbt {
    border-radius: 0;
    background-color: rgb(102, 153, 204);
    color: white;
    height: 40px;
  }
  .el-table th>.cell {
    color: rgb(102, 153, 204);
    font-size: 15px;
    font-weight: 400;
  }
  .dialogBox >>> .el-input__inner{
    width: 400px;
    height: 30px;
    border-radius: 0;
  }
  .pages {
    padding-top: 40px;
    padding-left: 700px;
  }
  .userBenchForm >>> .el-input__inner {
    border-radius: 0px;
  }
  .userBenchForm >>> .el-input {
    width: 12vw;
  }
</style>
