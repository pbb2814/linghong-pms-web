import axios from 'axios'

const BASE_URL = 'http://192.168.30.222:8080'


// 提交项目
const CreateProject = BASE_URL + '/project/insert';
// 获取项目列表
const GetProjectList = BASE_URL + '/project/list';
// 删除单个项目
const RemoveProject = BASE_URL + '/project/remove?id=';
// 获取项目详情
const GetDetail = BASE_URL + '/project/get_stage';
// 更新项目基本信息
const UpdateProjectDetail = BASE_URL + '/project/update_base_info';
// 更新项目预估信息
const UpdateEstimatedInfo = BASE_URL + '/project/update_estimate_info';
// 项目流转
const UpdateStage = BASE_URL + '/project/update_stage'




const allProject = {
  CreateProject(params) {
    return axios.post(CreateProject, params)
  },
  GetProjectList(params) {
    return axios.post(GetProjectList, params)
  },
  RemoveProject(params){
    return axios.delete(RemoveProject + params)
  },
  GetDetail(id, stage){
    return axios.get(GetDetail + '?id=' + id + '&stage='+ stage)
  },
  UpdateProjectDetail(params){
    return axios.put(UpdateProjectDetail, params)
  },
  UpdateEstimatedInfo(params){
    return axios.put(UpdateEstimatedInfo, params)
  },
  UpdateStage(params){
    return axios.put(UpdateStage, params)
}}

export default allProject
