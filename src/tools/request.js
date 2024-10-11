import axios from 'axios'
import { Message } from 'element-ui'

const request = axios.create({
  baseURL: 'http://localhost:3000',
})

axios.interceptors.response.use(
  response => {
    if (response.data.code !== 200) {
      throw new Error(response.data)
    }
    return response.data
  },
  () => {
    Message.error('网络出错了喔！！！！')
  },
)

export default request
