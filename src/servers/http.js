import Taro from '@tarojs/taro'
import getBaseUrl from './baseUrl'
import interceptors from './interceptors'

interceptors.forEach(i => Taro.addInterceptor(i))

class httpRequest {
  baseOptions(params, method = "GET") {
    let { url, data } = params;
    const BASE_URL = getBaseUrl(url);
    let contentType = "application/x-www-form-urlencoded";
    contentType = params.contentType || contentType;
    let header = {
      'content-type': contentType
      // 'Authorization': Taro.getStorageSync('Authorization')
    }
    // if (token!=undefined){
    //   header["token"] = token
    // }
    const option = {
      url: BASE_URL + url,
      data: data,
      method: method,
      header: header,
      fail: () => {
        Taro.showToast({
          title: '请求出错，请稍后再试',
          icon: '',
          duration: 2000
        })
      }
    };
    return Taro.request(option);
  }

  get(url, data = "") {
    let option = { url, data };
    return this.baseOptions(option);
  }

  post(url, data, contentType) {
    let params = { url, data, contentType };
    return this.baseOptions(params, "POST");
  }

  put(url, data = "") {
    let option = { url, data };
    return this.baseOptions(option, "PUT");
  }

  delete(url, data = "") {
    let option = { url, data };
    return this.baseOptions(option, "DELETE");
  }

}

export default new httpRequest()
