import axios from 'axios'

export function request(config){
  return new Promise((resolve, reject) => {
    //创建实例1  (通过网关的URL)
    const instance1 = axios.create({
      baseURL: 'http://localhost:12261',
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

// 这是第二个发送请求的实例；用于请求文件上传模块的；而文件上传模块是绕过网关的；所以单独写一个请求的思实例
export function requestImage(config){
  return new Promise((resolve, reject) => {
    //创建实例1  (通过网关的URL)
    const instance2 = axios.create({
      baseURL: 'http://localhost:2263',
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
