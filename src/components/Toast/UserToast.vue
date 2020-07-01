<template>
  <el-dialog
    :modal="true"
    :modal-append-to-body="true"
    :title="title"
    lock-scroll
    :visible.sync="isShow"
    :lock-scroll="lockScroll"
    :close-on-click-modal="false"
    :show-close="true"
    :close-on-press-escape="true"
    center>
    <div class="dialogBox">
      <el-form label-position="left" inline class="dialog-table-expand">
        <el-form-item label="姓名：">
          <el-input v-model="name1"></el-input>
        </el-form-item>
        <el-form-item label="性别：">
          <el-select
            v-model="gender"
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
            v-model="departmentId"
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
          <el-input v-model="positionId"></el-input>
        </el-form-item>
        <el-form-item label="联系方式：">
          <el-input v-model="tel"></el-input>
        </el-form-item>
        <el-form-item>*请输入该人员手机号，输入的手机号作为将为该用户的登录账号</el-form-item>
        <el-form-item label="权限组：">
          <el-select
            v-model="roleId"
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
      <el-button class="But" size="small" @click="closeToast">取消</el-button>
      <el-button class="But" size="small" @click="CreateUser">确认</el-button>
    </div>

  </el-dialog>
</template>
<script>
  export default {
    data() {
      return {
        departmentId: '',
        gender: '',
        name1: '',
        positionId: '',
        roleId: '',
        tel: '',
        Info: [],
        department: [],
        Role: [],

        period: [{
          value: '选项1',
          label: '项目储备'
        }, {
          value: '选项2',
          label: '立项阶段'
        }, {
          value: '选项3',
          label: '招投标阶段'
        }, {
          value: '选项4',
          label: '合同阶段'
        }, {
          value: '选项5',
          label: '实施阶段'
        }, {
          value: '选项6',
          label: '验收阶段'
        }, {
          value: '选项7',
          label: '项目结束'
        }],
        value: '选项1',

        genders: [{
          id: 1,
          name: '男'
        }, {
          id: 2,
          name: '女'
        }],

        personList: [{
          value: '选项1',
          name: '孔某某'
        }, {
          value: '选项2',
          name: '蔡某某'
        }, {
          value: '选项3',
          name: '江某某'
        }, {
          value: '选项4',
          name: '梁某某'
        }, {
          value: '选项5',
          name: '李某某'
        }, {
          value: '选项6',
          name: '某某某'
        }, {
          value: '选项7',
          name: '某某某'
        }, {
          value: '选项8',
          name: '某某某'
        }, {
          value: '选项9',
          name: '某某某'
        }, {
          value: '选项10',
          name: '某某某'
        }, {
          value: '选项11',
          name: '某某某'
        }, {
          value: '选项12',
          name: '某某某'
        }, {
          value: '选项13',
          name: '某某某'
        }],
        name: []
      }
    },
    props: {
      isShow: {
        type: Boolean,
        default: true
      },
      switchStyle: {
        type: Boolean,
        default: true
      },
      lockScroll: {
        type: Boolean,
        default: true
      },
      title: {
        type: String,
        default: '标题'
      },
      id: {
        type: Number,
        default: 1
      }
    },
    methods: {
      closeToast(){
        this.isShow = true;
        this.isShow = !this.isShow;
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
      CreateUser(){
        return new Promise((resolve, reject) => {
          let {departmentId, gender, name1, positionId, roleId, tel} = this
          //let leaderId = this.leaderId
          //let reserveLeaderIds = this.reserveLeaderIds
          let password = '123456';
          let name = this.name1
          console.log({departmentId, gender, name, positionId, roleId, tel, password})
          this.$api.user.CreateUser({departmentId, gender, name, positionId, roleId, tel, password}).then(res =>{
            if(res.data.code == 200){
              this.$message({
                message: '添加成功!',
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
    created(){
      this.GetDepartment(1, 10)
      this.getRole()
    },
    watch: {
      '$route': 'GetDepartment'
    }

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
</style>

<style scoped>
  .dialog-table-expand >>> .el-input__inner{
    width: 400px;
    height: 30px;
    border-radius: 0px;
  }
</style>
