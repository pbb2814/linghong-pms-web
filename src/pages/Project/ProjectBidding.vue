<template>
  <el-container>
    <el-main>
      <div class="box" title="招投标阶段">
        <el-form label-position="left" inline class="bidding-table-expand">
          <el-form-item label="阶段负责人：">
          <el-select
            v-model="leaderIds"
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
          <el-form-item label="招标单位：">
            <el-select
              v-model="tenderId"
              placeholder="请选择">
              <el-option
                v-for="tender in tenderList"
                :key="tender.id"
                :label="tender.name"
                :value="tender.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="招标时间：">
            <el-date-picker
              v-model="biddingDate"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="招标地点：">
            <el-input v-model="biddingLocation"></el-input>
          </el-form-item>
        </el-form>
        <el-button class="But submitBut" @click="UpdataBiddingInfo">提 交</el-button>
      </div>

    </el-main>
    <el-footer>
      <div style="display: inline-block;padding: 20px;float: right">
        <el-button class="But" @click="showToast">阶段流转</el-button>
        <el-button style="width: 80px" @click="$router.replace('/index/project')">返回</el-button>
      </div>
    </el-footer>
    <div>
      <Toast style="padding-top: 100px" :isShow="isShow"></Toast>
    </div>
  </el-container>
</template>

<script>
  import Toast from '../../components/Toast/Toast'
  export default {
    data(){
      return{
        biddingDate:'',
        biddingLocation:'',
        leaderIds: [],
        tenderId: [],
        id: '',
        isShow: false,
        /*personList: [{
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
        name: []*/
        personList: [],
        tenderList: [],
      }
    },
    methods:{
      showToast(){
        this.isShow = false;
        this.isShow = !this.isShow;
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
              this.tenderList = res.data.data
            }else {
              this.alertShow = true
            }
          })
        })
      },
      UpdataBiddingInfo(){
        let id = this.$route.query.id
        let leaderIds = this.leaderIds
        let tenderId = this.tenderId
        let biddingDate = this.biddingDate
        let biddingLocation = this.biddingLocation
        return new Promise((resolve, reject) => {
          this.$api.project.UpdateBiddingInfo({id, leaderIds, tenderId, biddingDate, biddingLocation}).then(res => {
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
      }
    },
    created(){
      this.GetUser()
      this.GetCustomer()
    },
    components: {
      Toast
    }
  }
</script>

<style>
  .bidding-table-expand {
    font-size: 14px;
    padding: 40px 10px 20px 40px;
    margin-right: 10px;
  }
  .bidding-table-expand label {
    width: 140px;
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
  .But {
    background-color: rgb(102, 153, 204);
    color: white;
    border-radius: 0;
  }
  .submitBut {
    margin: 0 0 20px 60px;
    border-radius: 0;
  }
  .bidding-table-expand >>> .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
  .bidding-table-expand >>> .el-input__inner{
    height: 30px;
    border-radius: 0px;
  }
  .bidding-table-expand >>> .el-input {
    width: 350px
  }
</style>
