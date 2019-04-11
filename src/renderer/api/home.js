import request from '@/utils/request'


export function getOrgInfo() {
  return request({
    url: '/organization/index?XDEBUG_SESSION_START=15228',
    method: 'get',
  })
}

