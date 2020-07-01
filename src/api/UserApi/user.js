import axios from 'axios'

const BASE_URL = 'http://192.168.30.222:8080'

// 获取用户信息列表
const GetUserList = BASE_URL + '/admin/user/list';
// 获取用户姓名、ID列表
const GetUser = BASE_URL + '/admin/user/id_name';
// 新建用户
const CreateUser = BASE_URL + '/admin/user/insert';
// 获取用户信息
const GetUserDetail = BASE_URL + '/admin/user/get?id=';
// 删除用户
const RemoveUser = BASE_URL + '/admin/user/remove?id=';
// 更新用户信息
const UpdateUser = BASE_URL + '/admin/user/update';



const setting = {
  GetUserList(params) {
    return axios.post(GetUserList, params)
  },
  GetUser(){
    return axios.get(GetUser)
  },
  CreateUser(params){
    return axios.post(CreateUser, params)
  },
  GetUserDetail(params){
    return axios.get(GetUserDetail + params)
  },
  RemoveUser(params){
    return axios.delete(RemoveUser + params)
  },
  UpdateUser(params){
    return axios.put(UpdateUser, params)
  }
}

export default setting
