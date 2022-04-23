/* eslint-disable handle-callback-err */
import axios from 'axios'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const request = axios.create({
    // baseURL: process.env.VUE_APP_BASE_API
    baseURL: 'http://localhost:3000'
})

// 请求拦截器
request.interceptors.request.use(
    (config) => {
        NProgress.start()
        // 无论如何都要返回放行
        return config // 必须返回配置
    }
)
// 响应拦截器
// 添加响应拦截器
request.interceptors.response.use(
    (res) => {
        NProgress.done()
        return res
    },
    (err) => {
        NProgress.done()
        return err
    })

export default request
