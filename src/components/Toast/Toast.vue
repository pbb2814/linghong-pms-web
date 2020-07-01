<template>

  <el-dialog
    :modal="true"
    :modal-append-to-body="true"
    title="阶段流转"
    lock-scroll
    :visible.sync="isShow"
    :lock-scroll="lockScroll"
    :close-on-click-modal="false"
    :show-close="true"
    :close-on-press-escape="true"
    center>
    <div class="dialogBox">
      <el-form label-position="left" inline class="dialog-table-expand">
        <el-form-item label="项目阶段：">
          <el-select v-model="value">
            <el-option
              v-for="item in periodsbar"
              :key="item.id"
              :index="item.index"
              :label="item.name"
              :value="item.id"
              :disabled="noHasPre(item.id)">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>*请选择项目需要流转的下一阶段</el-form-item>
        <el-form-item label="阶段负责人：">
          <el-select
            v-model="name"
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
        <el-form-item>*请选择项目的阶段负责人，阶段负责人将负责当前阶段内容的维护及阶段的流转操作</el-form-item>
      </el-form>
    </div>
    <div style="margin: 21px 0 auto 42%">
      <el-button class="But" size="small" @click="closeToast">取消</el-button>
      <el-button class="But" size="small" @click="UpdateStage">确认</el-button>
    </div>

  </el-dialog>
</template>
<script>
  export default {
    data() {
      return {
        periodsbar: [{
          index: '/index/operation/details',
          name: '项目储备',
          id: 1
        },{
          index: '/index/operation/approval',
          name: '立项阶段',
          id: 2
        },{
          index: '/index/operation/bidding',
          name: '招投标阶段',
          id: 3
        },{
          index: '/index/operation/procurement',
          name: '采购阶段',
          id: 4
        },{
          index: '/index/operation/contract',
          name: '合同阶段',
          id: 5
        },{
          index: '/index/operation/practice',
          name: '实施阶段',
          id: 6
        },{
          index: '/index/operation/acceptance',
          name: '验收阶段',
          id: 9
        },{
          index: '/index/operation/end',
          name: '项目结束',
          id: 10
        },],
        value: '',
        /*period: [{
          value: '1',
          label: '项目储备',
        }, {
          value: '2',
          label: '立项阶段'
        }, {
          value: '3',
          label: '招投标阶段'
        }, {
          value: '4',
          label: '合同阶段'
        }, {
          value: '5',
          label: '实施阶段'
        }, {
          value: '6',
          label: '验收阶段'
        }, {
          value: '7',
          label: '项目结束'
        }],
        value: '1',*/

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
        }],*/
        personList: [],
        name: [],
        disableList: [],
        path: ''
      }
    },
    props: {
      isShow: {
        type: Boolean,
        default: true
      },
      switchStyle: {
        type: Boolean,
        default: true
      },
      lockScroll: {
        type: Boolean,
        default: true
      },
    },
    methods: {
      closeToast(){
        this.isShow = true;
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
      UpdateStage(){
        return new Promise((resolve, reject) => {
          let leaders = this.name;
          let id = this.$route.query.id;
          let stage = this.value;

          for(let i = 0; i<this.periodsbar.length; i++){
            if(this.periodsbar[i].id == stage){
              this.path = this.periodsbar[i].index
            }
          }

          this.$api.project.UpdateStage({leaders, id, stage}).then(res =>{
            if(res.data.code == 200){
              this.isShow = true;
              this.isShow = !this.isShow;
              this.$router.push({
                path: this.path,
                query: {
                  id: id,
                  stage: stage,
                }
              })
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
      GetTransferred(id){
        return new Promise((resolve, reject) => {
          this.$api.project.Transferred(id).then(res =>{
            if(res.data.code == 200){
              this.disableList = res.data.data;
            }else {
            }
          })
        })
      },
      noHasPre(id){
        for(let i = 0; i < this.disableList.length ; i++){
          if(this.disableList[i] == id){
            return true
          }
        }
        return false
      }
    },
    created() {
      this.GetUser()
      this.GetTransferred(this.$route.query.id)
    },
    watch: {
      '$route': 'GetUser'
    }

  }
</script>
<style>
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
  .dialog-table-expand >>> .el-input__inner{
    width: 400px;
    height: 30px;
    border-radius: 0px;
  }
</style>
