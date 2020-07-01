import axios from 'axios'

const BASE_URL = 'http://192.168.30.222:8080'

// 获取权限组列表
const GetRole = BASE_URL + '/admin/role_permission/list_role'
// 新增权限组
const InsertRole = BASE_URL + '/admin/role_permission/insert_role'
// 修改权限组
const UpdateRole = BASE_URL + '/admin/role_permission/update_role'
// 删除权限组
const RemoveRole = BASE_URL + '/admin/role_permission/remove_role?roleId='


const setting = {
  GetRole(params) {
    return axios.post(GetRole, params)
  },
  InsertRole(params){
    return axios.post(InsertRole, params)
  },
  UpdateRole(params){
    return axios.put(UpdateRole, params)
  },
  RemoveRole(params){
    return axios.delete(RemoveRole + params)
  }
}

export default setting
