import request from '@/utils/request.js'

// 参数列表
export function getParamsList(params) {
  return request({
    url: `/categories/${params.id}/attributes`,
    method: 'get',
    params
  })
}

export function addParams(data) {
  return request({
    url: `/categories/${data.id}/attributes`,
    method: 'post',
    data
  })
}

export function editParams(data) {
  return request({
    url: `/categories/${data.id}/attributes/${data.attrId}`,
    method: 'put',
    data
  })
}

export function deleteParams(data) {
  return request({
    url: `/categories/${data.id}/attributes/${data.attrid}`,
    method: 'delete'
  })
}
