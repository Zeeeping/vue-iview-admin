import axios from '@/libs/api.request'

export const getAll = () => {
  return axios.request({
    url: 'Staff/GetAll',
    method: 'get'
  })
}
