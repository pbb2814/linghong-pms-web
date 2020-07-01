<template>
  <el-container>
    <el-main>
      <div class="box" title="合同阶段">
        <el-form label-position="left" inline class="contract-table-expand">
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
          <el-form-item label="合同金额(元):">
            <el-input v-model="contractValue"></el-input>
          </el-form-item>
          <el-form-item label="合同凭证：">
            <el-upload
              class="upload-demo"
              ref="upload"
              action="http://192.168.30.75:8080/admin/file/upload"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :file-list="fileList"
              multiple
              :on-success="handleSuccess"
            >
              <el-button slot="trigger" size="small" class="But">上传合同</el-button>
              <!--<el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>-->
            </el-upload>
          </el-form-item>
        </el-form>
        <el-button class="But submitBut" @click="UpdateContractInfo">提 交</el-button>
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
        contractValue: '',
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
        leaderIds: [],
        fileIds: []
      }
    },
    methods:{
      showToast(){
        this.isShow = false;
        this.isShow = !this.isShow;
      },
      UpdateContractInfo(){
        let id = this.$route.query.id;
        let leaderIds = this.leaderIds;
        let fileIds = this.fileIds;
        let contractValue = this.contractValue;
        return new Promise((resolve, reject) => {
          this.$api.project.UpdateContractInfo({id, leaderIds, fileIds, contractValue}).then(res =>{
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
      handleSuccess(response, file, fileList){
        if(response.code == 200){
          this.fileIds.push(response.data)
        }else{
          this.$message({
            message: response.msg,
            type: 'error'
          });
        }
      },
    },
    created() {
      this.GetUser()
    },
    watch: {
      '$route': 'GetCustomer'
    },
    components: {
      Toast
    }
  }
</script>

<style>
  .contract-table-expand {
    font-size: 14px;
    padding: 40px 10px 20px 40px;
    margin-right: 10px;
  }
  .contract-table-expand label {
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
  .contract-table-expand >>> .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
  .contract-table-expand >>> .el-input__inner{
    height: 30px;
    border-radius: 0px;
  }
  .contract-table-expand >>> .el-input {
    width: 350px
  }
</style>
