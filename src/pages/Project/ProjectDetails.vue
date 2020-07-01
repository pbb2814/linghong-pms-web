<template>
  <el-container>
    <el-main>
      <div class="box" v-if="baseInfoEdit" title="项目基本信息" v-model="baseInfo">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="项目名称：">
            <span>{{ baseInfo.name }}</span>
          </el-form-item>
          <el-form-item label="项目负责人：">
            <span>{{ baseInfo.leaderName }}</span>
          </el-form-item>
          <el-form-item label="阶段负责人：">
            <span v-for="person in baseInfo.reserveLeaderNames">{{ person + '， ' }}</span>
          </el-form-item>
          <el-form-item label="项目类别：">
            <span>{{ baseInfo.type }}</span>
          </el-form-item>
          <el-form-item label="客户名称：">
            <span>{{ baseInfo.customerName }}</span>
          </el-form-item>
          <el-form-item label="联系人：">
            <span>{{ baseInfo.contactName }}</span>
          </el-form-item>
          <el-form-item label="联系方式：">
            <span>{{ baseInfo.contactTel }}</span>
          </el-form-item>
        </el-form>
        <el-button class="editorBut" @click="baseInfoEditor">编 辑</el-button>
      </div>

      <div class="box" v-if="!baseInfoEdit" title="项目基本信息" v-model="baseInfo">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="项目名称：">
            <el-input v-model="baseInfo.name" @input="change($event)"></el-input>
          </el-form-item>
          <el-form-item label="项目负责人：">
            <el-select
              v-model="baseInfo.leaderId"
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
              v-model="baseInfo.reserveLeaderIds"
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
            <el-select v-model="baseInfo.type">
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
              v-model="baseInfo.customerId"
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
            <el-input v-model="baseInfo.contactName" @input="change($event)"></el-input>
          </el-form-item>
          <el-form-item label="联系方式：">
            <el-input v-model="baseInfo.contactTel" @input="change($event)"></el-input>
          </el-form-item>
        </el-form>
        <el-button style="margin: 0px 0px 20px 60px;background-color: rgb(102, 153, 204);color: white" @click="UpdateProjectDetail">提 交</el-button>
      </div>

      <div class="box" v-if="estimatedInfoEdit" style="margin-top: 60px" title="项目预估信息" v-model="estimateInfo">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="预估启动时间：">
            <span v-if="estimateInfo.estimatedStart">{{ estimateInfo.estimatedStart.substr(0, 10) }}</span>
          </el-form-item>
          <el-form-item label="预估工期：">
            <span>{{ estimatedDuration + ' 天'}}</span>
          </el-form-item>
          <el-form-item label="预估完成时间：">
            <span v-if="estimateInfo.estimatedEnd">{{ estimateInfo.estimatedEnd.substr(0, 10) }}</span>
          </el-form-item>
          <el-form-item label="预估合同额：">
            <span>{{ estimateInfo.estimatedContract }}</span>
          </el-form-item>
          <el-form-item label="预估成本：">
            <span>{{ estimateInfo.estimatedCost }}</span>
          </el-form-item>
          <el-form-item label="预估利润：">
            <span>{{ estimateInfo.estimatedProfit }}</span>
          </el-form-item>
          <el-form-item label="预估毛利率：">
            <span>{{ estimateInfo.estimatedGrossMargin }}</span>
          </el-form-item>
        </el-form>
        <el-button class="editorBut" @click="estimatedInfoEditor">编 辑</el-button>
      </div>

      <div class="box" v-if="!estimatedInfoEdit" style="margin-top: 60px" title="项目预估信息">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="预估启动时间：">
            <el-date-picker
              v-model="estimateInfo.estimatedStart"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="预估工期：">
            <el-input v-model="estimateInfo.estimatedDuration" @input="change($event)"></el-input>
          </el-form-item>
          <el-form-item label="预估完成时间：">
            <el-date-picker
              v-model="estimateInfo.estimatedEnd"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="预估合同额：">
            <el-input v-model="estimateInfo.estimatedContract" @input="change($event)"></el-input>
          </el-form-item>
          <el-form-item label="预估成本：">
            <el-input v-model="estimateInfo.estimatedCost" @input="change($event)"></el-input>
          </el-form-item>
          <el-form-item label="预估利润：">
            <el-input v-model="estimateInfo.estimatedProfit" @input="change($event)"></el-input>
          </el-form-item>
          <el-form-item label="预估毛利率：">
            <el-input v-model="estimateInfo.estimatedGrossMargin" @input="change($event)"></el-input>
          </el-form-item>
        </el-form>
        <el-button class="editorBut" @click="UpdateEstimatedInfo">提 交</el-button>
      </div>

      <div style="display: inline-block;padding: 20px;float: right">
        <el-button class="editorBut" style="width: 100px" @click="showToast">阶段流转</el-button>
        <el-button style="width: 80px" @click="$router.replace('/index/project')">返回</el-button>
      </div>
    </el-main>
    <div>
      <Toast style="padding-top: 100px" :isShow="isShow"></Toast>
    </div>
  </el-container>
</template>

<script>
  import Toast from '../../components/Toast/Toast'
    export default {
      data() {
        return {
          isShow: false,
          baseInfo: {
            name: '',
            leaderId: '',
            leaderName: '',
            reserveLeaderIds: [],
            reserveLeaderNames: [],
            type: '',
            customerId: '',
            customerName: '',
            contactName: '',
            contactTel: ''
          },
          estimateInfo: {
            estimatedStart: '',
            estimatedEnd: '',
            estimatedContract: '',
            estimatedCost: '',
            estimatedProfit: '',
            estimatedGrossMargin: ''
          },
          estimatedDuration: '',

          baseInfoEdit: true,
          estimatedInfoEdit: true,
          personList: [],
          CustomerList: [],
          leaderName: '',
          reserveLeaderName: '',

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


        }
      },
      components: {
        Toast,
      },
      methods: {
        back(){
          this.$router.go(-1)
        },
        showToast(){
          this.isShow = false;
          this.isShow = !this.isShow;
        },
        baseInfoEditor(){
          this.baseInfoEdit = false
        },
        estimatedInfoEditor(){
          this.estimatedInfoEdit = false
        },
        GetDetail(id){
          return new Promise((resolve, reject) => {
            this.$api.project.GetDetail(id).then(res =>{
              if(res.data.code == 200){
                this.baseInfo = res.data.data;
                //this.estimateInfo = res.data.data.estimateInfo;
              }else {
              }
            })
          })
        },
        GetEstimateInfo(id){
          return new Promise((resolve, reject) => {
            this.$api.project.GetEstimateInfo(id).then(res =>{
              if(res.data.code == 200){
                this.estimateInfo = res.data.data;
                this.DateMinus(this.estimateInfo.estimatedStart.substr(0, 10), this.estimateInfo.estimatedEnd.substr(0, 10))
                console.log(this.estimateInfo)
              }else {
              }
            })
          })
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
        UpdateEstimatedInfo(){
          return new Promise((resolve, reject) => {
            let {estimatedStart, estimatedEnd, estimatedDuration, estimatedContract, estimatedCost, estimatedProfit, estimatedGrossMargin} = this.estimateInfo
            //let leaderId = this.leaderId
            //let reserveLeaderIds = this.reserveLeaderIds
            let id = this.$route.query.id
            console.log({estimatedStart, estimatedEnd, estimatedDuration, estimatedContract, estimatedCost, estimatedProfit, estimatedGrossMargin})
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
        UpdateProjectDetail() {
          return new Promise((resolve, reject) => {
            let {contactName, contactTel, customerId, name, type, leaderId, reserveLeaderIds} = this.baseInfo
            //let leaderId = this.leaderId
            //let reserveLeaderIds = this.reserveLeaderIds
            let id = this.$route.query.id
            console.log({contactName, contactTel, customerId, name, leaderId, reserveLeaderIds, type})
            this.$api.project.UpdateProjectDetail({id, contactName, contactTel, customerId, name, leaderId, reserveLeaderIds, type}).then(res =>{
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
        DateMinus(start, end){
          var sdate = new Date(start.replace(/-/g, "/"));
          var edata = new Date(end.replace(/-/g, "/"));
          var days = edata.getTime() - sdate.getTime();
          this.estimatedDuration = parseInt(days / (1000 * 60 * 60 * 24));
        }
    },
      created() {
        this.GetDetail(this.$route.query.id)
        this.GetEstimateInfo(this.$route.query.id)
        this.GetUser()
        this.GetCustomer()
        //this.GetLeaderName()
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
