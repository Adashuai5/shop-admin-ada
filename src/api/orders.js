import request from '@/utils/request.js'

export function getOrdersList(params) {
  return request({
    url: '/orders',
    method: 'get',
    params
  })
}

export function getOrderInfo(params) {
  return request({
    url: `/orders/${params}`,
    method: 'get',
    params
  })
}

// 查看物流信息
export function checkLogistics(params) {
  return request({
    url: `/kuaidi/${params}`,
    method: 'get',
    params
  })
}

// 修改订单状态
export function changeStatus(data) {
  return request({
    url: `/orders/${data.id}`,
    method: 'put',
    data
  })
}

