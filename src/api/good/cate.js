import request from '@/utils/request.js'

export function getCateList(params) {
  return request({
    url: '/categories',
    method: 'get',
    params
  })
}

export function getCateInfo(params) {
  return request({
    url: `/categories/${params}`,
    method: 'get',
    params
  })
}

export function createCate(data) {
  return request({
    url: '/categories',
    method: 'post',
    data
  })
}

export function editCate(data) {
  return request({
    url: `/categories/${data.id}`,
    method: 'put',
    data
  })
}

export function deleteCate(data) {
  return request({
    url: `/categories/${data.id}`,
    method: 'delete'
  })
}
