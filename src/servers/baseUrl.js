const getBaseUrl = (url) => {
  let BASE_URL = '';
  console.log(process.env.NODE_ENV)
  if (process.env.NODE_ENV === 'development') {
    //开发环境 - 根据请求不同返回不同的BASE_URL
    BASE_URL = 'http://www.linann.cn:3000/mock/11/api/v1/'
  } else {
    BASE_URL = 'https://smart.linann.cn/api/v1/'
  }
  return BASE_URL
}

export default getBaseUrl;
