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
    url: '/organization/const-info',
    method: 'get',
  })
}

