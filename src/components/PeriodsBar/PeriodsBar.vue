<template>
    <el-container ref="homePage" :router="true">
      <el-header>
        <el-menu :default-active="activeIndex" router class="el-menu-demo projectDetails" mode="horizontal" @select="handleSelect">
          <el-menu-item style="text-align: left;padding-left: 20px"
          v-for="item in periodsbar"
          :key="item.id"
          :index="item.index"
          @click="Goto(item.index)"
          :disabled="hasPre(item.id)"
          >
          {{item.name}}
          </el-menu-item>
          <!--<el-menu-item @click="goto('/index/operation/create')">项目储备</el-menu-item>
          <el-menu-item index="/project/approval" @click="goto('/project/approval')">立项阶段</el-menu-item>
          <el-menu-item index="3">招投标阶段</el-menu-item>
          <el-menu-item index="4">采购阶段</el-menu-item>
          <el-menu-item index="5">合同阶段</el-menu-item>
          <el-menu-item index="/index/practice" @click="goto('/index/operation/practice')">实施阶段</el-menu-item>
          <el-menu-item index="7">项目付款</el-menu-item>
          <el-menu-item index="8">项目收款</el-menu-item>
          <el-menu-item index="9">验收阶段</el-menu-item>
          <el-menu-item index="10">项目结束</el-menu-item>-->
        </el-menu>
      </el-header>
    </el-container>
</template>

<script>
    export default {
      data() {
        return {
          disable: false,
          disableList: [],
          activeIndex: '/',
          id: '',
          stage: '',
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
            index: '/index/operation/payment',
            name: '项目付款',
            id: 7
          },{
            index: '/index/operation/collection',
            name: '项目收款',
            id: 8
          },{
            index: '/index/operation/acceptance',
            name: '验收阶段',
            id: 9
          },{
            index: '/index/operation/end',
            name: '项目结束',
            id: 10
          },]
        }
      },
      methods:{
        Goto(path) {
          this.$router.push({
            path: path,
            query: {
              id: this.id,
              stage: this.stage,
            }
          })
          this.activeIndex = path;
        },
        handleSelect (index) {
          this.activeIndex = index
        },
        hasPre(id){
          for(let i = 0; i < this.disableList.length ; i++){
            if(this.disableList[i] == id){
              return false
            }
          }
          return true
        },
        GetTransferred(id){
          return new Promise((resolve, reject) => {
            this.$api.project.Transferred(id).then(res =>{
              if(res.data.code == 200){
                this.disableList = res.data.data;
                this.disableList.push(7, 8)
                this.id = id;
                this.stage = this.$route.query.stage
              }else {
              }
            })
          })
        }
      },
      mounted(){
        this.activeIndex = this.$route.path
      },
      created() {
        this.GetTransferred(this.$route.query.id)
      },
      watch: {
        '$route' () {
          this.handleSelect(this.activeIndex)
        }
      },
    }
</script>

<style scoped>
  .projectDetails >>> .el-menu-item {
    font-size: 14px;
    font-weight: bolder;
    color: black;
  }
  .projectDetails >>> .el-menu.el-menu--horizontal {
    border-bottom: none !important;
  }
  .projectDetails >>> .el-menu-item:hover{
    color: rgb(102, 153, 204);
  }
  .projectDetails >>> .el-menu-item.is-active {
    color: rgb(102, 153, 204);
  }
</style>
