import request from '@/utils/request'


export function getOrgConsInfo() {
  return request({
    url: '/organization/cons-info',
    method: 'get',
  })
}

