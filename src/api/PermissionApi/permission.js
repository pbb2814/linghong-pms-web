import axios from 'axios'

const BASE_URL = 'http://192.168.30.222:8080'

// 获取权限树
const GetPermissionTree = BASE_URL + '/admin/role_permission/permission_tree';
// 获取指定权限组所有权限
const GetPermissionListByRole = BASE_URL + '/admin/role_permission/list_permissions_by_role?roleId=';
// 编辑权限组权限
const UpdateRolePermission = BASE_URL + '/admin/role_permission/update_role_permission'

const setting = {
  GetPermissionTree() {
    return axios.get(GetPermissionTree)
  },
  GetPermissionListByRole(params){
    return axios.get(GetPermissionListByRole + params)
  },
  UpdateRolePermission(params){
    return axios.put(UpdateRolePermission, params)
  }
}

export default setting
