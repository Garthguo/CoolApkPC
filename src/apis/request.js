import { http } from '@tauri-apps/api'

class request {
  interceptors = {
    baseURL: 'https://api2.coolapk.com/v6',
    request: {
      headers: {
        'User-Agent':
          'Dalvik/2.1.0 (Linux; U; Android 11; Redmi K30 Pro Zoom Edition Build/QKQ1.200127.002) (#Build; Redmi; Redmi K30 Pro Zoom Edition; Flyme 9.3.0.0A; 11) +CoolMarket/12.3.1-2206151-universal',
        'X-Requested-With': 'XMLHttpRequest',
        'X-Sdk-Int': '30',
        'X-Sdk-Locale': 'zh-CN',
        'X-App-Id': 'com.coolapk.market',
        'X-App-Token':
          'v2JDJ5JDEwJE1UWTFPVFk0TVRneU13LzRmMzY2Mk9YUFRwcXo4cFo5UWVVRVdzd1plSE9QdUtCenBQUkRx',
        'X-App-Version': '12.3.1',
        'X-App-Code': '2206151',
        'X-Api-Version': '12',
        'X-App-Device':
          'wGb15GI7EEMuAjLz4SOgUWb5xmRgsjbvlGdpRWRg02bvpFIvJHUgAzMLBSatRWZSByOp1GZlJFI7kWbvFWaYByO3UkO4kjOGNjOBZkOzQkOygDI7AyOgsDZzcjZ3ATZmVTY3ETZygzN',
        'X-Dark-Mode': '0',
        'X-App-Channel': 'coolapk',
        'X-App-Mode': 'universal',
        'X-App-Supported': '2206151',
        Host: 'api2.coolapk.com',
        Connection: 'Keep-Alive',
        'Accept-Encoding': 'gzip',
      },
      body: {},
      use: () => {},
    },
    response: (response) => {
      return new Promise((rec, rej) => {
        rec(response.data)
      })
    },
  }

  constructor(config) {}

  post = (url, data) => {
    return new Promise((resolve) => {
      const requestBody = { ...data, ...this.interceptors.request.body }
      const requestHeaders = { ...this.interceptors.request.headers }
      this.interceptors.request.use()
      http
        .fetch(this.interceptors.baseURL + url, {
          headers: requestHeaders,
          method: 'POST',
          // 常规的json格式请求体发送
          body: http.Body.json(requestBody),
        })
        .then((res) => {
          // res为请求成功的回调数据
          resolve(this.interceptors.response(res))
        })
    })
  }
  get = (url, data) => {
    return new Promise((resolve) => {
      const requestQuery = { ...data, ...this.interceptors.request.body }
      const requestHeaders = { ...this.interceptors.request.headers }
      this.interceptors.request.use()
      http
        .fetch(this.interceptors.baseURL + url, {
          headers: requestHeaders,
          method: 'GET',
          // 常规的json格式请求体发送
          query: requestQuery,
        })
        .then((res) => {
          // res为请求成功的回调数据
          resolve(this.interceptors.response(res))
        })
    })
  }
}

export default request
