import setting from './SettingApi/setting'
import log from './log/log'
import customer from './CustomerApi/customer'
import user from './UserApi/user'
import project from './ProjectApi/project'
import permission from './PermissionApi/permission'
import allProject from "./AllProjectApi/allProject";
import practice from  './PracticeApi/practice'
import department from './DepartmentApi/department'
import supplier from './SupplierApi/supplier'

const api = {
  setting,
  log,
  customer,
  user,
  project,
  permission,
  allProject,
  practice,
  department,
  supplier
}

export default api

/*const BASE_URL = 'http://192.168.30.78:8080'

export const reqLogin = (tel, password) => ajax(BASE_URL + '/admin/auth/fake_login', {tel, password}, 'POST')

export const reqGetone = () => ajax(BASE_URL+'/user/get?id=31')*/

