import request from "@/request.js"

export function getLogin(data) {
  return request({
    url: "/login",
    method: "post",
    data
  })
}