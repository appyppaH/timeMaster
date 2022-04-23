import { useGlobalIconFont } from './components/iconfont/helper';

export default {
  usingComponents: Object.assign(useGlobalIconFont()),
  pages: ["pages/index/index",'pages/schedule/index', "pages/home/index",'pages/weather-detail/index'],
  tabBar: {
    color: "#606468",
    selectedColor: "#0089ff",
    backgroundColor: '#fff',
    // borderStyle: 'white',
    custom: false,
    list: [
      {
        pagePath: 'pages/schedule/index',
        text: '日程',
        iconPath: 'assets/img/schedule.png',
        selectedIconPath: 'assets/img/schedule_active.png',
      },
      // {
      //   pagePath: 'pages/weather-detail/index',
      //   text: '天气',
      // },
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
