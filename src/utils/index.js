export function checkEmail(rule, value, cb) {
  let reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
  if (reg.test(value)) {
    cb()
  } else {
    cb(new Error('请输入正确邮箱'))
  }
}
export function checkMobile(rule, value, cb) {
  let reg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
  if (reg.test(value)) {
    cb()
  } else {
    cb(new Error('手机号码格式不正确'))
  }
}
