import axios from 'axios'
import Element from 'element-ui'

const baseURL = 'http://127.0.0.1:8888/api/private/v1/'
const service = axios.create({
  baseURL,
  timeout: 1000 * 30
})

service.interceptors.request.use(
  config => {
    // 为请求头添加 Token 验证的 Authorization 字段
    config.headers.Authorization = window.sessionStorage.getItem('token')
    return config
  },
  error => {
    Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    if (response.data.meta.status && response.data.meta.status !== 200) {
      Element.Message.error({
        message: response.data.meta.msg
      })
      return
    }
    return response
  },
  error => {
    Promise.reject(error)
  }
)

export default function(options) {
  return service(options)
}
