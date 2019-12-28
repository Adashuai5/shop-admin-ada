import request from '@/utils/request.js'

export function getGoodsList(params) {
  return request({
    url: '/goods',
    method: 'get',
    params
  })
}

export function getGoodsInfo(params) {
  return request({
    url: `/goods/${params}`,
    method: 'get',
    params
  })
}

export function createGoods(data) {
  return request({
    url: '/goods',
    method: 'post',
    data
  })
}

export function editGoods(data) {
  return request({
    url: `/goods/${data.id}`,
    method: 'put',
    data
  })
}

export function deleteGoods(data) {
  return request({
    url: `/goods/${data.id}`,
    method: 'delete'
  })
}
