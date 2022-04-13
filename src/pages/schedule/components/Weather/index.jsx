import React from 'react'
import Taro from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { useSelector } from 'react-redux'

import weatherConfig from '../../../../assets/img/weather/enter'
import './index.scss'

let location = {
  longitude: 115.56,
  latitude: 38.88
}
class Weather extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      statusBarHeight: 0,
      weatherRealTime: {},
      imgSrc: ""
    }
  }
  componentWillMount() {
    this.setState({
      statusBarHeight: Taro.getSystemInfoSync().statusBarHeight
    })
    this.getWeater()
  }
  async getWeater() {
    const res = await Taro.request({ url: `https://api.caiyunapp.com/v2.5/Y2FpeXVuIGFuZHJpb2QgYXBp/${location.longitude},${location.latitude}/weather.json` })
    if (res.statusCode === 200) {
      this.setState({
        weatherRealTime: res.data.result.realtime
      }, () => {
        this.getImg()
      })
    }
  }
  getImg() {
    let {img} = weatherConfig[this.state.weatherRealTime.skycon]
    this.setState({
      imgSrc:img
    })
  }
  render() {

    return (
      <View className='weather' style={{ top: this.state.statusBarHeight + 8 }} onClick={() => Taro.navigateTo({ url: '/pages/event/pages/weather-detail/index' })}>
        <Image className='weather-img' src={this.state.imgSrc} />
        <Text className='weather-temp'>{parseInt(this.state.weatherRealTime.temperature)}°C</Text>
      </View>
    )
  }

}
export default Weather;