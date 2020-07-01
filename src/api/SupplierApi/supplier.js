import axios from 'axios'

const BASE_URL = 'http://192.168.30.222:8080'

// 获取供应商列表
const GetSupplier = BASE_URL + '/supplier/id_name';
// 获取单个供应商详细信息
const GetSupplierDetails = BASE_URL + '/supplier/get?id=';
// 新增项目供应商
const InsertSupplier = BASE_URL + '/project/insert_project_supplier';
// 更新项目付款信息
const UpdateProjectSupplierPayment = BASE_URL + '/project/update_project_supplier_payment'

const setting = {
  GetSupplier(){
    return axios.get(GetSupplier)
  },
  GetSupplierDetails(params){
    return axios.get(GetSupplierDetails + params)
  },
  InsertSupplier(params){
    return axios.post(InsertSupplier, params)
  },
  UpdateProjectSupplierPayment(params){
    return axios.put(UpdateProjectSupplierPayment, params)
  }
}

export default setting
