import request from '@/utils/request'

export function login(username, password) {
  return request({
    url: '/auth/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}
export function upSelf(userInfo) {
  return request({
    url: '/user/update-self?XDEBUG_SESSION_START=17470',
    method: 'post',
    data: userInfo
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
    url: '/auth/logout',
    method: 'post'
  })
}
