import request from '@/utils/request.js'

export function getUsersList(params) {
  return request({
    url: '/users',
    method: 'get',
    params
  })
}

export function getUsersInfo(params) {
  return request({
    url: `/users/${params}`,
    method: 'get',
    params
  })
}

export function createUsers(data) {
  return request({
    url: '/users',
    method: 'post',
    data
  })
}

export function editUsers(data) {
  return request({
    url: `/users/${data.id}`,
    method: 'put',
    data
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

export function deleteUsers(data) {
  return request({
    url: `/users/${data.id}`,
    method: 'delete'
  })
}

export function editUsersRoles(data) {
  return request({
    url: `/users/${data.id}/role`,
    method: 'put',
    data
  })
}
