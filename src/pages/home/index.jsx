import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Text, OpenData } from '@tarojs/components'
import IconFont from '../../components/iconfont'
import './index.scss'

const noComplete = () => {
    Taro.showToast({
        title: '尚未开发',
        icon: '',
        duration: 2000
    })
}
const globalTheme = 8
const cardData = [
    {
        name: '考试安排',
        icon: 'calendar',
        onClick: () => noComplete(),
        redPoint: "",
    },
    {
        name: '成绩查询',
        icon: 'exam',
        // onClick: () => Taro.navigateTo({ url: '/pages/grades/index'}),
        redPoint: '',
    },
    {
        name: '校历查询',
        icon: 'schedule',
        // onClick: () => Taro.navigateTo({ url: '/pages/calendar/index?value=year' }),
        redPoint: '',
    }
]

const toolsData = [
    // {
    //     name: '校车时刻表',
    //     icon: 'Bus',
    //     onClick: () => Taro.navigateTo({ url: '/pages/calendar/index?value=bus' }),
    //     redPoint: '',
    // },
    {
        name: '校车时刻表',
        icon: 'Bus',
        redPoint: '',
    },
    {
        name: '我的网课',
        icon: 'institution',
        // onClick: () => Taro.navigateTo({ url: '/pages/webView/index?url=https://smart.hbu.cn/h5/WXStudent/toH5Main'}),
        redPoint: '',
    },
    {
        name: '空教室查询',
        icon: 'classroom',
        // onClick: () => Taro.navigateTo({ url: '/pages/emptyClassrooms/index' }),
        redPoint: '',
    },
    {
        name: '图书馆馆藏查询',
        icon: 'books',
        onClick: () => noComplete(),
        redPoint: '',
    }
]


export default class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            statusBarHeight: 0,
            name:"",
        }
    }

    componentWillMount() {
        Taro.setNavigationBarColor({
            frontColor: '#ffffff',
            backgroundColor: "#3374ff",
            fail: (err) => {
                console.log(err)
            }
        })

        const _this = this
        Taro.getSystemInfo({
            success: function (res) {
                _this.setState({
                    statusBarHeight: res.statusBarHeight
                })
            }
        })
    }

    render() {
        return (
            <View className='home'>

                <View className='home-header' style={{ paddingTop: this.state.statusBarHeight + 58, backgroundImage: `linear-gradient(180deg, #3374ff 76%,#f8f9fb 100%)` }}>

                    <View className='home-header-avatar'>
                        <View className='home-header-avatar-img'>
                            <OpenData type='userAvatarUrl'></OpenData>
                        </View>
                    </View>
                    <View className='home-header-nickName'>
                        <Text>{this.state.name}</Text>
                        <OpenData type='userNickName' ></OpenData>
                        {/* <Text>{this.props.store.userInfoStore.userInfo.userName ? this.props.store.userInfoStore.userInfo.userName : '获取信息失败'}</Text> */}
                    </View>
                </View>

                <View className='home-content'>


                    <View className='home-content-card'>

                        {
                            cardData.map(data => (
                                <View key={data.name} className='home-content-card-box' onClick={data.onClick}>
                                    <IconFont name={data.icon} size={68} />
                                    <View className='home-content-card-box-nameBox'>
                                        <View className='home-content-card-box-nameBox_redPoint'>{data.redPoint}</View>
                                        <Text className='home-content-card-box-nameBox_name'>{data.name}</Text>
                                    </View>
                                </View>
                            ))
                        }
                    </View>

                    <View className='home-content-group'>
                        {
                            toolsData.map(data => (
                                <View key={data.name} className='home-content-group-item' onClick={data.onClick}>
                                    <View className='home-content-group-item-left'>
                                        <IconFont name={data.icon} size={48} />
                                        <View className='home-content-group-item-left-nameBox'>
                                            <View className='home-content-group-item-left-nameBox_redPoint'>{data.redPoint}</View>
                                            <Text style={{ marginLeft: 10 }}>{data.name}</Text>
                                        </View>
                                    </View>
                                    <IconFont name='right' size={48} />
                                </View>
                            ))
                        }
                    </View>
                </View>
            </View >
        )
    }
}

