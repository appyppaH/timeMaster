import Taro from "@tarojs/taro";
/**
 * @description 获取当前页url
 */
export const getCurrentPageUrl = () => {
  let pages = Taro.getCurrentPages()
  let currentPage = pages[pages.length - 1]
  let url = currentPage.route
  return url
};

export const pageToLogin = () => {
  let path = getCurrentPageUrl()
  console.log("pageToLogin")
  if (!path.includes('index/index')) {
    console.log("跳转至首页")
    Taro.navigateTo({
      url: "/pages/index/index",
      success: function (res) {
        // 通过eventChannel向被打开页面传送数据
        console.log(res)
      }
    });
  }
}

export const pageToIndex = () => {
  let path = getCurrentPageUrl()
  if (!path.includes('login')) {
    Taro.navigateTo({
      url: "/pages/index/index"
    });
  }
}
