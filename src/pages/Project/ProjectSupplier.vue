<template>
  <el-container>
    <el-main>
      <div class="box" title="供应商信息">
        <el-form label-position="left" inline class="approval-table-expand">
          <el-form-item label="供应商名称：">
            <el-select
              @change="GetSupplierDetails"
              v-model="supplierIds"
              placeholder="请选择">
              <el-option
                v-for="person in supplierList"
                :key="person.id"
                :label="person.name"
                :value="person.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="供应商地址：">
            <el-input v-model="supplierInfo.address"></el-input>
          </el-form-item>
          <el-form-item label="联系人：">
            <el-input v-model="supplierInfo.contactName"></el-input>
          </el-form-item>
          <el-form-item label="联系人电话：">
            <el-input v-model="supplierInfo.contactTel"></el-input>
          </el-form-item>
          <el-form-item label="开户行：">
            <el-input v-model="supplierInfo.bankName"></el-input>
          </el-form-item>
          <el-form-item label="纳税人识别号：">
            <el-input v-model="supplierInfo.registrationNumber"></el-input>
          </el-form-item>
          <el-form-item label="账号：">
            <el-input v-model="supplierInfo.bankAccount"></el-input>
          </el-form-item>
        </el-form>
        <el-button class="But submitBut" @click="InsertSupplier">提 交</el-button>
      </div>
      <div class="box" title="商品信息">
        <el-form label-position="left" inline class="approval-table-expand">
          <el-table
            class="procurement"
            :data="tableData"
            style="width: 100%;padding-top: 20px"
            :header-cell-style="{background: 'rgb(234, 241, 249)'}" v-loading="loading">
            <el-table-column
              type="index"
              label="序号"
              :width="60">
            </el-table-column>
            <el-table-column
              v-for="list in tableHeader"
              :label="list.label"
              :prop="list.props">
            </el-table-column>
            <el-table-column
              prop="operate"
              label="操作">
              <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                <el-button type="text" size="small" @click="DeleteProject(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-form>
        <el-button class="But submitBut" @click="">添加商品</el-button>
      </div>
      <div class="box" title="付款信息">
        <el-form label-position="left" inline class="approval-table-expand">
          <el-form-item label="总额：">
            <el-input v-model="payment.total"></el-input>
          </el-form-item>
          <el-form-item label="交货日期：">
            <el-date-picker
              v-model="payment.deliverDate"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="增值税占比：">
            <el-input v-model="payment.vatRate"></el-input>
          </el-form-item>
          <el-form-item label="交货地址：">
            <el-input v-model="payment.deliveryAddress"></el-input>
          </el-form-item>
          <el-form-item label="合同：">
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
              <el-button slot="trigger" size="small" class="But">选取文件</el-button>
              <!--<el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>-->
            </el-upload>
          </el-form-item>
        </el-form>
        <el-button class="But submitBut" @click="UpdateProjectSupplierPayment">提 交</el-button>
      </div>
    </el-main>
    <el-footer>
      <div style="display: inline-block;padding: 20px;float: right">
        <el-button style="width: 80px" @click="$router.back()">返回</el-button>
      </div>
    </el-footer>
    <div>
      <Toast style="padding-top: 100px" :isShow="isShow"></Toast>
    </div>
  </el-container>
</template>

<script>
  export default {
    data(){
      return{
        /* personList: [{
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
         name: [],*/
        supplierIds: [],
        supplierList: [],
        supplierInfo: [{
          address: '',
          contactName: '',
          contactTel: '',
          bankName: '',
          registrationNumber: '',
          bankAccount: '',
        }],

        id: '',

        payment: [{
          total: '',
          vatRate: '',
          deliverDate: '',
          deliveryAddress: '',
        }],
        fileIds: [],

        tableHeader: [{
          label: '商品名称',
          props: 'name',
        },{
          label: '规格型号',
          props: 'type',
        },{
          label: '数量',
          props: 'customerName',
        },{
          label: '单价',
          props: 'contactName',
        },{
          label: '金额',
          props: 'contactName',
        }],
      }
    },
    methods:{
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
      GetSupplier(){
        return new Promise((resolve, reject) => {
          this.$api.supplier.GetSupplier().then(res =>{
            if(res.data.code == 200){
              this.supplierList = res.data.data
            }else {
              this.alertShow = true
            }
          })
        })
      },
      GetSupplierDetails(){
        let id = this.supplierIds
        return new Promise((resolve, reject) => {
          this.$api.supplier.GetSupplierDetails(id).then(res =>{
            if(res.data.code == 200){
              console.log(res.data.data)
              this.supplierInfo = res.data.data
            }else {
              this.alertShow = true
            }
          })
        })
      },
      InsertSupplier(){
        let supplierId = this.supplierIds
        let projectId = this.$route.query.id
        let {address, bankAccount, bankName, contactName, contactTel, registrationNumber} = this.supplierInfo
        return new Promise((resolve, reject) => {
          this.$api.supplier.InsertSupplier({supplierId, address, bankAccount, bankName, contactName, contactTel, projectId, registrationNumber}).then(res =>{
            if(res.data.code == 200){
              this.id = res.data.data.id
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
      UpdateProjectSupplierPayment(){
        let id = this.id
        let projectId = this.$route.query.id
        let {total, vatRate, deliverDate, deliveryAddress} = this.payment

        return new Promise((resolve, reject) => {
          this.$api.supplier.UpdateProjectSupplierPayment({id, total, vatRate, deliverDate, deliveryAddress, projectId}).then(res =>{
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
    created() {
      this.GetSupplier()
    },
    watch: {
      '$route': 'GetSupplier'
    },
  }
</script>

<style>
  .approval-table-expand {
    font-size: 14px;
    padding: 40px 10px 20px 40px;
    margin-right: 10px;
  }
  .approval-table-expand label {
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
  .But {
    background-color: rgb(102, 153, 204);
    color: white
  }
  .submitBut {
    margin: 0px 0px 20px 60px;
  }
</style>

<style scoped>
  .approval-table-expand >>> .el-table th>.cell {
    color: rgb(102, 153, 204);
    font-size: 15px;
    font-weight: 400;
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
  .approval-table-expand >>> .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
  .approval-table-expand >>> .el-input__inner{
    height: 30px;
    border-radius: 0px;
  }
  .approval-table-expand >>> .el-input {
    width: 350px
  }
</style>
