import axios from 'axios'

export function request(config){
  return new Promise((resolve, reject) => {
    //创建实例  (通过网关的URL)
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
