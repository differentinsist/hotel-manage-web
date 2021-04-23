import axios from 'axios'

export function request(config){
  return new Promise((resolve, reject) => {
    //创建实例1  (通过网关的URL)  本来是这样的baseURL: http://8.129.187.106:12261/api'为了配合nginx配置改了
    //放到阿里云的话直接这样子写：  baseURL: '/api',
    const instance1 = axios.create({
      baseURL: 'http://localhost:12261/api',
      //【部署到阿里云就改成这样就行】
      // baseURL: '/api',
      timeout: 5000
    })
    //发送真正的网络请求
    instance1(config)
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err)
      })
  })
}
// 这是第二个发送请求的实例；用于请求文件上传模块的；而文件上传模块是绕过网关的；所以单独写一个请求的实例
export function requestImage(config){
  return new Promise((resolve, reject) => {
    //创建实例2(上传文件；绕过网关)  baseURL: 'http://8.129.187.106:2263',
    //放到阿里云的话直接这样子写：  baseURL: '/upload',
    const instance2 = axios.create({
      baseURL: 'http://localhost:2263/upload',
      // baseURL: '/upload',
      timeout: 5000
    })
    //发送真正的网络请求
    instance1(config)
    .then(res => {
      resolve(res);
    })
    .catch(err => {
      reject(err)
    })
  })
}
