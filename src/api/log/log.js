import axios from 'axios'
import setting from "../SettingApi/setting";

const BASE_URL = 'http://192.168.30.222:8080'

const Login = BASE_URL + '/admin/auth/login'

const log = {
  Login(tel, password) {
    return axios.post(Login, {tel, password})
  }
}

export default log
