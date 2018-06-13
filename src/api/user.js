import axios from '@/libs/api.request'
import qs from 'qs'

export const login = ({ userName, password }) => {
  const data = qs.stringify({loginName: userName, password})
  return axios.request({
    // url: 'login',
    url: 'Staff/Login',
    data,
    method: 'post'
  })
}

export const getUserInfo = (token) => {
  return axios.request({
    url: 'get_info',
    params: {
      token
    },
    method: 'get'
  })
}

export const logout = (token) => {
  return axios.request({
    url: 'logout',
    method: 'post'
  })
}
