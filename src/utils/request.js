import axios from 'axios'
import Element from 'element-ui'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const baseURL =
  process.env.NODE_ENV === 'production'
    ? 'https://www.liulongbin.top:8888/api/private/v1/'
    : 'http://127.0.0.1:8888/api/private/v1/'

const service = axios.create({
  baseURL,
  timeout: 1000 * 30
})

service.interceptors.request.use(
  config => {
    NProgress.start()
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
    NProgress.done()
    if (response.data.meta.status && response.data.meta.status >= 300) {
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
