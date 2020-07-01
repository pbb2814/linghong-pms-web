<template>
    <el-container>
      <el-main>
        <div class="box" title="项目基本信息">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="项目名称：">
              <el-input v-model="name" @input="change($event)"></el-input>
            </el-form-item>
            <el-form-item label="项目负责人：">
              <el-select
                v-model="leaderId"
                placeholder="请选择">
                <el-option
                  v-for="person in personList"
                  :key="person.id"
                  :label="person.name"
                  :value="person.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="阶段负责人：">
              <el-select
                v-model="reserveLeaderIds"
                multiple
                placeholder="请选择">
                <el-option
                  v-for="person in personList"
                  :key="person.id"
                  :label="person.name"
                  :value="person.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="项目类别：">
              <el-select v-model="type">
                <el-option
                  v-for="items in item"
                  :key="items.item"
                  :label="items.label"
                  :value="items.label">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="客户名称：">
              <el-select
                v-model="customerId"
                placeholder="请选择">
                <el-option
                  v-for="customer in CustomerList"
                  :key="customer.id"
                  :label="customer.name"
                  :value="customer.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="联系人：">
              <el-input v-model="contactName" @input="change($event)"></el-input>
            </el-form-item>
            <el-form-item label="联系方式：">
              <el-input v-model="contactTel" @input="change($event)"></el-input>
            </el-form-item>
          </el-form>
          <el-button class="creatBut" @click="CreateProject">提 交</el-button>
        </div>

        <div class="box" style="margin-top: 60px" title="项目预估信息">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="预估启动时间：">
              <el-date-picker
                v-model="estimatedStart"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="预估工期：">
              <el-input v-model="estimatedDuration" @input="change($event)"></el-input>
            </el-form-item>
            <el-form-item label="预估完成时间：">
              <el-date-picker
                v-model="estimatedEnd"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="预估合同额：">
              <el-input v-model="estimatedContract" @input="change($event)"></el-input>
            </el-form-item>
            <el-form-item label="预估成本：">
              <el-input v-model="estimatedCost" @input="change($event)"></el-input>
            </el-form-item>
            <el-form-item label="预估利润：">
              <el-input v-model="estimatedProfit" @input="change($event)"></el-input>
            </el-form-item>
            <el-form-item label="预估毛利率：">
              <el-input v-model="estimatedGrossMargin" @input="change($event)"></el-input>
            </el-form-item>
          </el-form>
          <el-button class="creatBut" @click="UpdateEstimatedInfo">提 交</el-button>
        </div>
        <div style="display: inline-block;padding: 20px;float: right">
          <!--<el-button style="width: 100px;background-color: rgb(102, 153, 204);color: white" @click="show = true">阶段流转</el-button>-->
          <el-button style="width: 80px" @click="$router.replace('/index/project')">返回</el-button>
        </div>
      </el-main>
    </el-container>
</template>

<script>
  import PeriodsBar from '../../components/PeriodsBar/PeriodsBar'

  export default {
    data() {
      return {
        id: '',
        name: '',
        cusName: '',
        contactName: '',
        contactTel: '',

        estimatedStart: '',
        estimatedEnd: '',
        estimatedDuration: '',
        estimatedContract: '',
        estimatedCost: '',
        estimatedProfit: '',
        estimatedGrossMargin: '',
        item: [{
          item: '类型1',
          label: '集成项目'
        }, {
          item: '类型2',
          label: '软件项目'
        },{
          item: '类型3',
          label: '集成+软件'
        }],
        type: [],
        /*personList: [{
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
        }],*/
        personList: [],
        leaderId: [],
        reserveLeaderIds: [],

        CustomerList: [],
        customerId: []
      }
    },
    components: {
      PeriodsBar
    },
    methods: {
      change(e) {
        this.$forceUpdate()
      },
      GetUser(){
        return new Promise((resolve, reject) => {
          this.$api.user.GetUser().then(res =>{
            if(res.data.code == 200){
              console.log(res.data.data)
              this.personList = res.data.data
            }else {
              this.alertShow = true
            }
          })
        })
      },
      GetCustomer() {
        return new Promise((resolve, reject) => {
          this.$api.customer.GetCustomerList().then(res =>{
            if(res.data.code == 200){
              this.CustomerList = res.data.data
            }else {
              this.alertShow = true
            }
          })
        })
      },
      CreateProject(){
        return new Promise((resolve, reject) => {
          let {contactName, contactTel, customerId, name, type} = this
          let leaderId = this.leaderId
          let reserveLeaderIds = this.reserveLeaderIds
          console.log({contactName, contactTel, customerId, name, leaderId, reserveLeaderIds, type})
          this.$api.project.CreateProject({contactName, contactTel, customerId, name, leaderId, reserveLeaderIds, type}).then(res =>{
            if(res.data.code == 200){
              this.id = res.data.data.id;
              console.log(this.id)
              this.$message({
                message: res.data.msg,
                type: 'success'
              });
            }else {
              this.$message({
                message: res.data.msg,
                type: 'error'
              });
            }
          })
        })
      },
      UpdateEstimatedInfo(){
        return new Promise((resolve, reject) => {
          let {estimatedStart, estimatedEnd, estimatedDuration, estimatedContract, estimatedCost, estimatedProfit, estimatedGrossMargin} = this
          //let leaderId = this.leaderId
          //let reserveLeaderIds = this.reserveLeaderIds
          let id = this.id
          console.log({id, estimatedStart, estimatedEnd, estimatedDuration, estimatedContract, estimatedCost, estimatedProfit, estimatedGrossMargin})
          this.$api.project.UpdateEstimatedInfo({id, estimatedStart, estimatedEnd, estimatedDuration, estimatedContract, estimatedCost, estimatedProfit, estimatedGrossMargin}).then(res =>{
            if(res.data.code == 200){
              this.$message({
                message: res.data.msg,
                type: 'success'
              });
            }else {
              this.$message({
                message: res.data.msg,
                type: 'error'
              });
            }
          })
        })
      },
    },
    created() {
      this.GetUser()
      this.GetCustomer()
    },
    watch: {
      '$route': 'GetCustomer'
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
  .creatBut{
    margin: 0px 0px 20px 60px;
    background-color: rgb(102, 153, 204);
    color: white;
    border-radius: 0;
  }
  .demo-table-expand >>> .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
  .demo-table-expand >>> .el-input__inner{
    width: 350px;
    height: 30px;
    border-radius: 0px;
  }
</style>
