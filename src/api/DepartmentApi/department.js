import axios from 'axios'
import customer from "../CustomerApi/customer";

const BASE_URL = 'http://192.168.30.222:8080'

// 获取部门列表
const GetDepartment = BASE_URL + '/department/list';

const department = {
  GetDepartment(params){
    return axios.post(GetDepartment, params)
  }
}

export default department
