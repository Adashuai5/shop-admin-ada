import request from '@/utils/request.js'

export function getMenus(params) {
  return request({
    url: '/menus',
    method: 'get',
    params
  })
}

export function getReports(params) {
  return request({
    url: '/reports/type/1',
    method: 'get',
    params
  })
}
