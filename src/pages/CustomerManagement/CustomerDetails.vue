<template>
  <el-container style="background-color: white">
    <el-main>
      <div class="box" title="客户基本信息" v-model="baseInfo">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="客户名称：">
            <span>{{ baseInfo.name }}</span>
          </el-form-item>
          <el-form-item label="联系人：">
            <span>{{ baseInfo.contactName }}</span>
          </el-form-item>
          <el-form-item label="联系方式：">
            <span>{{ baseInfo.contactTel }}</span>
          </el-form-item>
          <el-form-item label="地址：">
            <span>{{ baseInfo.location }}</span>
          </el-form-item>
          <el-form-item label="开户行：">
            <span>{{ baseInfo.bankName }}</span>
          </el-form-item>
          <el-form-item label="纳税人识别号：">
            <span>{{ baseInfo.registrationNumber }}</span>
          </el-form-item>
          <el-form-item label="银行账户：">
            <span>{{ baseInfo.bankAccount }}</span>
          </el-form-item>
        </el-form>
      </div>

      <div style="display: inline-block;padding: 20px;float: right">
        <el-button style="width: 80px" @click="$router.go(-1)">返回</el-button>
      </div>
    </el-main>
    <div>
      <Toast style="padding-top: 100px" :isShow="isShow"></Toast>
    </div>
  </el-container>
</template>

<script>
  export default {
    data() {
      return {
        isShow: false,
        baseInfo: {
          name: '',
          bankAccount: '',
          bankName: '',
          contactName: '',
          contactTel: '',
          registrationNumber: '',
          location: ''
        },
      }
    },
    methods: {
      back(){
        this.$router.go(-1)
      },
      GetCustomerDetails(id){
        return new Promise((resolve, reject) => {
          this.$api.customer.GetCustomerDetails(id).then(res =>{
            if(res.data.code == 200){
              this.baseInfo = res.data.data;
              console.log(this.baseInfo)
            }else {
            }
          })
        })
      },

    },
    created() {
      this.GetCustomerDetails(this.$route.query.id)
    },
    watch: {
      '$route': 'GetDetail'
    }

  }
</script>

<style>
  .demo-table-expand {
    font-size: 14px;
    padding: 40px 0px 20px 40px;
  }
  .demo-table-expand label {
    width: 110px;
    color: black;
  }

  .box{
    position:relative;
    border:1px solid rgb(102, 153, 204);
    margin-top: 30px;
  }
  .box::before{
    content:attr(title);
    position:absolute;
    left:8%;
    transform:translateX(-50%);
    -webkit-transform:translate(-50%,-50%);
    padding:0 10px;
    background-color:#fff;
    color: rgb(102, 153, 204);
  }
  .editorBut {
    margin: 0px 0px 20px 60px;
    background-color: rgb(102, 153, 204);
    color: white;
    border-radius: 0;
  }
</style>

<style scoped>
  .demo-table-expand >>> .el-input__inner{
    width: 400px;
    height: 30px;
    border-radius: 0px;
  }
  .demo-table-expand >>> .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }

</style>
