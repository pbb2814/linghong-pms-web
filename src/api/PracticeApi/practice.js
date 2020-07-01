import axios from 'axios'

const BASE_URL = 'http://192.168.30.222:8080'


// 获取实施阶段列表
const GetImplementList = BASE_URL + '/implement/list';
//获取实施阶段任务列表
const GetTaskList = BASE_URL + '/implement/task/list';
// 插入任务
const CreateTask = BASE_URL + '/implement/task/create';
// 删除单个项目
const RemoveTask = BASE_URL + '/implement/task/manage/delete?id=';
// 更新任务
const UpdateTask = BASE_URL + '/implement/task/manage/update';

const practice = {
  CreateTask(params) {
    return axios.post(CreateTask, params)
  },
  GetImplementList(params) {
    return axios.post(GetImplementList, params)
  },
  GetTaskList(id){
    return axios.post(GetTaskList, id )
  },
  RemoveTask(params){
    return axios.delete(RemoveTask + params)
  },
  UpdateTasks(params){
    return axios.put(UpdateTask, params)
  },
}

export default practice
