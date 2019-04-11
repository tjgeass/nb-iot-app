import request from '@/utils/request'

export function login(username, password) {
  return request({
    url: '/auth/login?XDEBUG_SESSION_START=15228',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export function getInfo(access_token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { access_token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
