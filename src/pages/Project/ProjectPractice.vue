<template>
  <el-container>
    <el-main>
      <div class="box" title="实施阶段">
        <el-form label-position="left" inline class="practice-table-expand">
          <el-form-item label="阶段负责人：">
            <el-select
              v-model="implementLeaderIds"
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
          <el-form-item label="参与人员：">
            <el-select
              v-model="participant"
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
          <el-form-item label="计划工量(人/日)：">
            <el-input v-model="plannedWorkload"></el-input>
          </el-form-item>
          <el-form-item label="计划开始时间：">
            <el-date-picker
              v-model="planningStartTime"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="计划结束时间：">
            <el-date-picker
              v-model="planningEndTime"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="实际开始时间：">
            <el-date-picker
              v-model="implementationStartTime"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="实际结束时间：">
            <el-date-picker
              v-model="implementationEndTime"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="相关材料：">
            <el-upload
              class="upload-demo"
              ref="upload"
              action="http://192.168.30.222:8080/admin/file/upload"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :file-list="fileList"
              multiple
              :on-success="handleSuccess"
              >
              <el-button slot="trigger" size="small" class="But">选取文件</el-button>
              <!--<el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>-->
            </el-upload>
          </el-form-item>
          <el-form-item label="备注：" class="textarea" style="margin-top: 10px">
            <el-input type="textarea" v-model="implementNote"></el-input>
          </el-form-item>
        </el-form>
        <el-button class="But submitBut" @click="SubmitProjectPractice">提 交</el-button>
      </div>
      <div style="display: inline-block;padding: 20px;float: right">
        <el-button class="But" @click="showToast">阶段流转</el-button>
        <el-button style="width: 80px" @click="$router.go(-1)">返回</el-button>
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
    data(){
      return{
        isShow: false,
        name: '',
        fileList: '',
        fileIds: [],
        implementLeaderIds: [],
        participant: [],
        plannedWorkload: '',
        planningStartTime: '',
        planningEndTime: '',
        implementationStartTime: '',
        implementationEndTime: '',
        implementNote: '',
        personList: [],
      }
    },
    methods:{
      handleSuccess(response, file, fileList){
        this.fileIds.push(response.data)
        console.log(this.fileIds)
      },
      showToast(){
        this.isShow = false;
        this.isShow = !this.isShow;
      },
      submitUpload() {
        console.log(this.fileList)
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
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
      SubmitProjectPractice(){
        return new Promise((resolve, reject) => {
          let id = this.$route.query.id
          let {plannedWorkload, planningStartTime, planningEndTime, implementationStartTime, implementationEndTime, implementNote} = this
          let leaderIds = this.implementLeaderIds
          let participantIds = this.participant
          let fileIds = this.fileIds
          console.log({id, fileIds, plannedWorkload, planningStartTime, planningEndTime, implementationStartTime, implementationEndTime, implementNote, leaderIds, participantIds})
          this.$api.project.ProjectPractice({id, fileIds, plannedWorkload, planningStartTime, planningEndTime, implementationStartTime, implementationEndTime, implementNote, leaderIds, participantIds}).then(res =>{
            if(res.data.code == 200){
              this.$message({
                message: '实施阶段修改成功!',
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
  .practice-table-expand {
    font-size: 14px;
    padding: 40px 10px 20px 40px;
    margin-right: 10px;
  }
  .practice-table-expand label {
    width: 130px;
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
  .practice-table-expand >>> .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
  .practice-table-expand >>> .el-input__inner{
    height: 30px;
    border-radius: 0px;
  }
  .practice-table-expand >>> .el-input{
    width: 350px;
  }
  .But {
    background-color: rgb(102, 153, 204);
    color: white;
    border-radius: 0;
  }
  .submitBut {
    margin: 0 0 20px 60px;
    border-radius: 0;
  }
  .textarea >>> .el-textarea__inner {
    width: 350px;
  }
</style>
