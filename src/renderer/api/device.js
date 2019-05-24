import request from '@/utils/request'

/**
 * 获取机构信息
 */
export function getOrgInfo() {
  return request({
    url: '/organization/index',
    method: 'get',
  })
}


/**
 * 获取机构建筑列表
 */
export function getOrgConstInfo() {
  return request({
    url: '/construction/const-info',
    method: 'get',
  })
}

/**
 * 获取设备数据年月日
 */
export function getDeviceData(params) {
  return request({
    url: '/device/data',
    method: 'get',
    params
  })
}