<template>
  <el-container>
    <el-main>
      <div class="box" title="实施阶段">
        <el-form label-position="left" inline class="practice-table-expand">
          <el-form-item label="阶段负责人：">
            <el-input v-model="name"></el-input>
          </el-form-item>
          <el-form-item label="参与人员：">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="计划工量(人/日)：">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="计划开始时间：">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="计划结束时间：">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="实际开始时间：">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="实际结束时间：">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="相关材料：" style="display: inline">
            <el-input></el-input>
            <el-button class="But" style="margin-left: 20px" size="small">浏 览</el-button>
          </el-form-item>
          <el-form-item label="备注：" style="margin-top: 10px">
            <el-input type="textarea"></el-input>
          </el-form-item>
        </el-form>
        <el-button class="But submitBut">提 交</el-button>
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
        fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}]
      }
    },
    methods:{
      showToast(){
        this.isShow = false;
        this.isShow = !this.isShow;
      },
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
    width: 140px;
    color: black;
  }
  .practice-table-expand .el-form-item {
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
  .But {
    background-color: rgb(102, 153, 204);
    color: white
  }
  .submitBut {
    margin: 0px 0px 20px 60px;
  }
  .el-textarea__inner {
    width: 300px;
  }
</style>

<style scoped>
  .practice-table-expand >>> .el-input__inner{
    width: 300px;
    height: 30px;
    border-radius: 0px;
  }
  .practice-table-expand >>> .el-input {
    width: 75%;
  }
</style>
