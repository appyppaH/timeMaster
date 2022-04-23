import React from 'react'
import Taro from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { setWeather } from '../../../../../../actions/actions'

import weatherConfig from '../../../../../../assets/img/weather/enter'
import './index.scss'
import { connect } from 'react-redux'

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
    console.log(this.props.weather.state.weatherData)
    
    if (Object.keys(this.props.weather.state.weatherData).length === 0) {
      this.getWeater()
    }

  }
  async getWeater() {
    const res = await Taro.request({ url: `https://api.caiyunapp.com/v2.5/Y2FpeXVuIGFuZHJpb2QgYXBp/${location.longitude},${location.latitude}/weather.json` })
    if (res.statusCode === 200) {
      this.props.reduxSetWeather(res.data.result)
      this.setState({
        weatherRealTime: res.data.result.realtime
      }, () => {
        this.getImg()
      })
    }
  }
  getImg() {
    let { img } = weatherConfig[this.state.weatherRealTime.skycon]
    this.setState({
      imgSrc: img
    })
  }
  render() {

    return (
      <View className='weather' style={{ top: this.state.statusBarHeight + 8 }} onClick={() => Taro.navigateTo({ url: '/pages/weather-detail/index' })}>
        <Image className='weather-img' src={this.state.imgSrc} />
        <Text className='weather-temp'>{parseInt(this.state.weatherRealTime.temperature)}°C</Text>
      </View>
    )
  }

}
const mapStateToProps = (state) => {
  // console.log(state.user);//可持续更新
  return {
    weather: state.weather//组件AppContent的this.props.user始终为空
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    reduxSetWeather: weatherData => {
      dispatch(setWeather(weatherData))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Weather);