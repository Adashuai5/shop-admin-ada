import request from '@/utils/request.js'

export function getLogin(data) {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}
