export default {
  pages: ["pages/index/index", "pages/home/index"],
  tabBar: {
    color: "#606468",
    selectedColor: "#0089ff",
    backgroundColor: '#fff',
    // borderStyle: 'white',
    custom: false,
    list: [
      // {
      //   pagePath: 'pages/event/index',
      //   text: '日程',
      //   iconPath: 'assets/event.png',
      //   selectedIconPath: 'assets/event_active.png',
      // },
      {
        pagePath: 'pages/index/index',
        text: '课表',
      },
      {
        pagePath: 'pages/home/index',
        text: '我',
        iconPath: 'assets/img/home.png',
        selectedIconPath: 'assets/img/home_active.png',
      },
    ]
  },
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "WeChat",
    navigationBarTextStyle: "black",
  },
};
