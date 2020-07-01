import axios from 'axios'

const BASE_URL = 'http://192.168.30.222:8080'

// 分页获取客户信息列表
const GetCustomer = BASE_URL + '/customer/list';
// 新建客户
const CreateCustomer = BASE_URL + '/customer/insert';
// 删除单个客户
const RemoveCustomer = BASE_URL + '/customer/remove?id=';
// 获取客户名称列表
const GetCustomerList = BASE_URL + '/customer/id_name';
// 获取单个客户信息
const GetCustomerDetails = BASE_URL + '/customer/get?id=';
// 更新客户信息
const UpdateCustomer = BASE_URL + '/customer/update'


const customer = {
  GetCustomer(pageIndex, pageSize) {
    return axios.post(GetCustomer, {pageIndex, pageSize})
  },
  CreateCustomer(params){
    return axios.post(CreateCustomer, params)
  },
  RemoveCustomer(params){
    return axios.delete(RemoveCustomer + params)
  },
  GetCustomerList(){
    return axios.get(GetCustomerList)
  },
  GetCustomerDetails(params){
    return axios.get(GetCustomerDetails + params)
  },
  UpdateCustomer(params){
    return axios.put(UpdateCustomer, params)
  }
}

export default customer
