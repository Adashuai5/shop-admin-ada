import request from '@/utils/request.js'

export function getRolesList(params) {
  return request({
    url: '/roles',
    method: 'get',
    params
  })
}

export function setRolesRight(id, data) {
  return request({
    url: `/roles/${id}/rights`,
    method: 'post',
    data
  })
}

export function createRoles(data) {
  return request({
    url: '/roles',
    method: 'post',
    data
  })
}

export function editRoles(data) {
  return request({
    url: `/roles/${data.id}`,
    method: 'put',
    data
  })
}

export function deleteRoles(data) {
  return request({
    url: `/roles/${data.id}`,
    method: 'delete'
  })
}

export function removeRolesRight(data) {
  return request({
    url: `/roles/${data.roleId}/rights/${data.rightId}`,
    method: 'delete'
  })
}
