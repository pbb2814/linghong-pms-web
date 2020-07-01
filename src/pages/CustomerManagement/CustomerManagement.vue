<template>
  <el-container class="customerBench" style="background-color: white">
    <el-header>
      <el-form :inline="true" style="display: inline-block">
        <el-input v-model="input" class="customerManagement" placeholder="搜索客户"></el-input><el-button style="background-color: rgb(102, 153, 204);color: white" class="sbt">搜索</el-button>
        <el-button class="addBut" style="margin-left: 520px;background-color: rgb(102, 153, 204);color: white" @click="goto('/createCustomer')">新增客户</el-button>
      </el-form>
    </el-header>


    <el-table
      :data="tableData"
      style="width: 100%;padding-top: 20px"
      :header-cell-style="{background: 'rgb(234, 241, 249)'}">
      <el-table-column
        type="index"
        label="序号"
        :width="60">
      </el-table-column>
      <el-table-column
        class="customer"
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
          <el-button @click="showEditToast(scope.row)" type="text" size="small">编辑</el-button>
          <el-button type="text" size="small" @click="Delete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div>
      <el-dialog
        :modal="true"
        :modal-append-to-body="true"
        title="编辑客户"
        lock-scroll
        :visible.sync="isEditShow"
        :close-on-click-modal="false"
        :show-close="true"
        :close-on-press-escape="true"
        center>
        <div class="dialogBox">
          <el-form label-position="left" inline class="dialog-table-expand">
            <el-form-item label="客户名称：">
              <el-input v-model="Info.name"></el-input>
            </el-form-item>
            <el-form-item label="联系人：">
              <el-input v-model="Info.contactName"></el-input>
            </el-form-item>
            <el-form-item label="联系方式：">
              <el-input v-model="Info.contactTel"></el-input>
            </el-form-item>
            <el-form-item label="地址：">
              <el-input v-model="Info.location"></el-input>
            </el-form-item>
            <el-form-item label="开户行：">
              <el-input v-model="Info.bankName"></el-input>
            </el-form-item>
            <el-form-item label="纳税人识别号：">
              <el-input v-model="Info.registrationNumber"></el-input>
            </el-form-item>
            <el-form-item label="银行账户：">
              <el-input v-model="Info.bankAccount"></el-input>
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
        :page-size="10"
        :pager-count="5"
        layout="prev, pager, next, jumper"
        @current-change="handleCurrentChange"
        :current-page="pageIndex"
        :total="totalSize"
        >
      </el-pagination>
    </el-footer>
  </el-container>
</template>

<script>
  export default {
    data() {
      return {
        title: '',
        isShow: false,
        totalSize: '',

        Info: [],

        tableHeader: [{
          label: '客户名称',
          props: 'name',
          width: 180
        },{
          label: '联系人',
          props: 'contactName',
          width: 150
        },{
          label: '联系方式',
          props: 'contactTel',
          width: 550
        }],

        tableData: [],

        CustomerId: '',

      }
    },
    methods: {
      GetCustomerDetails(id){
        return new Promise((resolve, reject) => {
          this.$api.customer.GetCustomerDetails(id).then(res =>{
            if(res.data.code == 200){
              this.Info = res.data.data;
              console.log(this.baseInfo)
            }else {
            }
          })
        })
      },
      showEditToast(row){
        this.isShow = false;
        this.isEditShow = false;
        this.isEditShow = !this.isEditShow
        this.GetCustomerDetails(row.id)
        this.CustomerId = row.id
      },
      closeEditToast(){
        this.isEditShow = true;
        this.isEditShow = !this.isEditShow;
      },
      handleClick(row) {
        this.$router.push({
          path:'/customerDetails',
          query: {
            id: row.id
          }})
      },
      goto(path) {
        this.$router.push(path)
      },
      showToast(title){
        this.isShow = false;
        this.isShow = !this.isShow;
        this.title = title
      },
      handleCurrentChange(val){
        this.GetCustomerist(val, 10)
      },
      Delete(index, row) {
        return new Promise((resolve, reject) => {
          this.$api.customer.RemoveCustomer(row.id).then(res =>{
            if(res.data.code == 200){
              this.$message({
                message: '删除客户成功!',
                type: 'error'
              });
              this.tableData.splice(index,1);
            }else {
              this.alertShow = true
            }
          })
        })
      },
      GetCustomerList(pageIndex, pageSize){
        return new Promise((resolve, reject) => {
          this.$api.customer.GetCustomer(pageIndex, pageSize).then(res =>{
            if(res.data.code == 200){
              this.tableData = res.data.data;
              this.totalSize = res.data.totalSize;
            }else {
              this.alertShow = true
            }
          })
        })
      }
    },
    created() {
      this.GetCustomerList(1, 10)
    },
    watch: {
      '$route': 'GetCustomerList'
    }
  }
</script>

<style>
  .customerBench {
    padding-top: 60px;
    padding-left: 40px;
    padding-right: 40px;
  }
  .sbt {
    border-radius: 0px;
    background-color: rgb(102, 153, 204);
    color: white
  }
  .el-table th>.cell {
    color: rgb(102, 153, 204);
    font-size: 15px;
    font-weight: 400;
  }
  .addBut {
    background-color: rgb(102, 153, 204);
    color: white;
  }
  .pages {
    padding-top: 40px;
    padding-left: 95px;
    padding-bottom: 60px;
  }
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
  .dialogBox >>> .el-input__inner{
    width: 400px;
    height: 30px;
    border-radius: 0;
  }
  .customerBench >>> .el-input__inner {
    border-radius: 0px;

  }
  .customerBench >>> .el-input {
    width: 20%;
  }
</style>

