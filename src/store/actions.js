import {reqLogin} from '../api'
import {RECEIVE_USER_INFO} from './mutation-types'

export default {
  // 记录用户信息
  recordUserInfo({commit}, userInfo) {
    commit(RECEIVE_USER_INFO, {userInfo})
  },
// 异步获取用户信息
  async getUserInfo({commit}) {
    const result = await reqUser()
    if (result.code === 0) {
      commit(RECEIVE_USER_INFO, {userInfo: result.data})
    }
  },
}
