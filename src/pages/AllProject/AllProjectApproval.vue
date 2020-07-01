<template>
  <el-container>
    <el-main>
      <div class="box" title="立项阶段">
        <el-form label-position="left" inline class="practice-table-expand">
          <el-form-item label="阶段负责人：">
            <el-select
              v-model="name"
              multiple
              placeholder="请选择">
              <el-option
                v-for="person in personList"
                :key="person.value"
                :label="person.name"
                :value="person.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="项目立项报告书：" style="display: inline">
            <el-input></el-input>
            <el-button class="But" style="margin-left: 20px" size="small">浏 览</el-button>
          </el-form-item>
        </el-form>
        <el-button class="But submitBut">提 交</el-button>
      </div>

    </el-main>
    <el-footer>
      <div style="display: inline-block;padding: 20px;float: right">
        <el-button class="But" @click="showToast">阶段流转</el-button>
        <el-button style="width: 80px" @click="$router.go(-1)">返回</el-button>
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
        isShow: false,
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
    methods:{
      showToast(){
        this.isShow = false;
        this.isShow = !this.isShow;
      }
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
  .practice-table-expand  {
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
</style>

<style scoped>
  .practice-table-expand >>> .el-input__inner{
    width: 400px;
    height: 30px;
    border-radius: 0px;
  }
  .practice-table-expand >>> .el-input {
    width: 400px
  }
</style>
