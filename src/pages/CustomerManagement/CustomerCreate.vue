<template>
  <el-container style="background-color: white">
    <el-main>
      <div class="box" title="客户信息">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="客户名称：">
            <el-input v-model="name" @input="change($event)"></el-input>
          </el-form-item>
          <el-form-item label="联系人：">
            <el-input v-model="contactName" @input="change($event)"></el-input>
          </el-form-item>
          <el-form-item label="联系方式：">
            <el-input v-model="contactTel" @input="change($event)"></el-input>
          </el-form-item>
          <el-form-item label="地址：">
            <el-input v-model="location" @input="change($event)"></el-input>
            <!--<el-select v-model="item">
              <el-option
                v-for="items in type"
                :key="items.item"
                :label="items.label"
                :value="items.item">
              </el-option>
            </el-select>-->
          </el-form-item>
          <el-form-item label="开户行：">
            <el-input v-model="bankName" @input="change($event)"></el-input>
          </el-form-item>
          <el-form-item label="纳税人识别号：">
            <el-input v-model="registrationNumber" @input="change($event)"></el-input>
          </el-form-item>
          <el-form-item label="银行账号：">
            <el-input v-model="bankAccount" @input="change($event)"></el-input>
          </el-form-item>
        </el-form>
        <el-button @click="createCustomer" style="margin: 0px 0px 20px 60px;background-color: rgb(102, 153, 204);color: white">提 交</el-button>
      </div>

      <div style="display: inline-block;padding: 20px;float: right">
        <!--<el-button style="width: 100px;background-color: rgb(102, 153, 204);color: white" @click="show = true">阶段流转</el-button>-->
        <el-button style="width: 80px" @click="$router.go(-1)">返回</el-button>
      </div>
    </el-main>
  </el-container>
</template>

<script>
  import PeriodsBar from '../../components/PeriodsBar/PeriodsBar'
  export default {
    data() {
      return {
        name: '',
        contactName: '',
        contactTel: '',
        location: '',
        bankName: '',
        registrationNumber: '',
        bankAccount: '',
        type: [{
          item: '类型1',
          label: '集成项目'
        }, {
          item: '类型2',
          label: '软件项目'
        },{
          item: '类型3',
          label: '集成+软件'
        }],
        item: [],

        personList: [{
          id: '1',
          name: '孔某某'
        }, {
          id: '2',
          name: '蔡某某'
        }, {
          id: '3',
          name: '江某某'
        }, {
          id: '4',
          name: '梁某某'
        }, {
          id: '5',
          name: '李某某'
        }, {
          id: '6',
          name: '某某某'
        }, {
          id: '71',
          name: '某某某'
        }, {
          id: '8',
          name: '某某某'
        }, {
          id: '9',
          name: '某某某'
        }, {
          id: '10',
          name: '某某某'
        }, {
          id: '11',
          name: '某某某'
        }, {
          id: '12',
          name: '某某某'
        }, {
          id: '13',
          name: '某某某'
        }],
        name1: [],
        name2: [],

      }
    },
    components: {
      PeriodsBar
    },
    methods: {
      change(e) {
        this.$forceUpdate()
      },
      createCustomer(){
        return new Promise((resolve, reject) => {
          let {name, contactName, contactTel, location, bankName, registrationNumber, bankAccount} = this
          this.$api.customer.CreateCustomer({name, contactName, contactTel, location, bankName, registrationNumber, bankAccount}).then(res =>{
            if(res.data.code == 200){
              this.$message({
                message: '增加客户成功!',
                type: 'success'
              });
            }else {
              this.$message({
                message: '添加客户失败! 不能为空值！',
                type: 'error'
              });
            }
          })
        })
      }
    }
  }
</script>

<style>
  .demo-table-expand {
    font-size: 14px;
    padding: 40px 10px 20px 40px;
    margin-right: 10px;
  }
  .demo-table-expand label {
    width: 110px;
    color: black;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
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
</style>

<style scoped>
  .demo-table-expand >>> .el-input__inner{
    width: 400px;
    height: 30px;
    border-radius: 0px;
  }
</style>
