import request from '@/request.js'

export function getMenus(params) {
  return request({
    url: '/menus',
    method: 'get',
    params
  })
}
