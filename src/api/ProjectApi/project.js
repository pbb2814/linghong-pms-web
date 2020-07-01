import axios from 'axios'

const BASE_URL = 'http://192.168.30.222:8080'

// 提交项目
const CreateProject = BASE_URL + '/project/insert';
// 获取项目列表
const GetProjectList = BASE_URL + '/project/list';
// 删除单个项目
const RemoveProject = BASE_URL + '/project/remove?id=';
// 获取项目详情
const GetDetail = BASE_URL + '/project/get_base_info?id=';
// 获取项目预估信息
const GetEstimateInfo = BASE_URL + '/project/get_estimate_info?id=';
// 更新项目基本信息
const UpdateProjectDetail = BASE_URL + '/project/update_base_info';
// 更新项目预估信息
const UpdateEstimatedInfo = BASE_URL + '/project/update_estimate_info';
// 项目流转
const UpdateStage = BASE_URL + '/project/transfer';
// 提交实施阶段详情
const ProjectPractice = BASE_URL + '/project/update_implementation_info';
// 更新项目立项信息
const UpdateInitiateInfo = BASE_URL + '/project/update_initiate_info';
// 获取项目流转过的阶段
const Transferred = BASE_URL + '/project/transferred?id=';
// 更新项目招投标信息
const UpdateBiddingInfo = BASE_URL + '/project/update_bidding_info';
// 更新项目采购信息
const UpdateProcurementInfo = BASE_URL + '/project/update_procurement_info';
// 更新项目合同信息
const UpdateContractInfo = BASE_URL + '/project/update_contract_info'


const setting = {
  CreateProject(params) {
    return axios.post(CreateProject, params)
  },
  GetProjectList(params) {
    return axios.post(GetProjectList, params)
  },
  RemoveProject(params){
    return axios.delete(RemoveProject + params)
  },
  GetDetail(params){
    return axios.get(GetDetail + params)
  },
  GetEstimateInfo(params){
    return axios.get(GetEstimateInfo + params)
  },
  UpdateProjectDetail(params){
    return axios.put(UpdateProjectDetail, params)
  },
  UpdateEstimatedInfo(params){
    return axios.put(UpdateEstimatedInfo, params)
  },
  UpdateStage(params){
    return axios.put(UpdateStage, params)
  },
  ProjectPractice(params){
    return axios.put(ProjectPractice, params)
  },
  UpdateInitiateInfo(params){
    return axios.put(UpdateInitiateInfo, params)
  },
  Transferred(params){
    return axios.get(Transferred + params)
  },
  UpdateBiddingInfo(params){
    return axios.put(UpdateBiddingInfo, params)
  },
  UpdateProcurementInfo(params){
    return axios.put(UpdateProcurementInfo, params)
  },
  UpdateContractInfo(params){
    return axios.put(UpdateContractInfo, params)
  }
}

export default setting
