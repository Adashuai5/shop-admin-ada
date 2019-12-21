import request from '@/utils/request.js'

export function getRightsList(params) {
  return request({
    url: '/rights/list',
    method: 'get',
    params
  })
}
