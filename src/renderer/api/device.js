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
 * 获取机构未读通知
 */
export function getOrgMessageRead() {
  return request({
    url: '/device-message/unread',
    method: 'get',
  })
}
/**
 * 获取机构通知
 */
export function getOrgMessage(params) {
  return request({
    url: '/device-message/index',
    method: 'get',
    params
  })
}
/**
 * 更新机构通知
 */
export function updateOrgMessage(data) {
  return request({
    url: '/device-message/update',
    method: 'post',
    data: data
  })
}
/**
 * 更新机构信息
 */
export function updateOrgInfo(orgInfo) {
  return request({
    url: '/organization/update',
    method: 'post',
    data: orgInfo
  })
}
/**
 * 更新建筑信息
 */
export function updateContsInfo(params, contsInfo) {
  return request({
    url: '/construction/update',
    method: 'post',
    data: contsInfo,
    params
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
 * 获取设备信息
 */
export function getDeviceInfo(params) {
  return request({
    url: '/device/info',
    method: 'get',
    params
  })
}

/**
 * 获取设备图表数据-年月日
 */
export function getDeviceDataChart(params) {
  return request({
    url: '/device/data-chart',
    method: 'get',
    params
  })
}
/**
 * 获取设备图表数据-年月日
 */
export function getDeviceDataTable(params) {
  return request({
    url: '/device/data-table?XDEBUG_SESSION_START=10879',
    method: 'get',
    params
  })
}