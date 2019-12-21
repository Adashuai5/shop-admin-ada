import request from '@/request.js'

export function getUsersList(params) {
  return request({
    url: '/users',
    method: 'get',
    params
  })
}

// 修改用户状态
export function changeType(data) {
  return request({
    url: `/users/${data.id}/state/${data.mg_state}`,
    method: 'put',
    data
  })
}
