import React, { useState, useEffect } from 'react'
import { View, Text } from '@tarojs/components'

// import SettingFloatLayout from '../SettingFloatLayout'

import './index.scss';

export default (props) => {
  const { currentWeekIndex, dateZh} = props
  const [dailyEventNumber, setDailyEventNumber] = useState(0)
  // const [dateZh, setDateZh] = useState(0)
  const [showSetting, setShowSetting] = useState(false)

  // TODO: 假数据
  const weekIndex = 1
  return (
    <View className='eventHeaderTitle'>
      <View className='eventHeaderTitle-left'>
        {/* TODO: 这里要设置点击事件选择日历 */}
        <View className='eventHeaderTitle-title'>
          <Text style={{ marginRight: 8 }}>第{currentWeekIndex}周 {dateZh}</Text>
          {/* <IconFont name='arrow-down-filling' size={24} color='#aaaaaa' /> */}
        </View>
        <View className='eventHeaderTitle-comment'>
          <Text>今日有</Text>
          <Text className='eventHeaderTitle-comment-number'>{dailyEventNumber}项</Text>
          <Text>日程</Text>
        </View>
      </View>

      <View className='eventHeaderTitle-right'>
        {/* TODO：这里要设置点击事件定位 */}
        <View className='eventHeaderTitle-right-operation' style={{ marginRight: '8rpx' }}>
          {/* <IconFont name='dingwei' size={48} color='#aaaaaa' /> */}
        </View>
        {/* TODO：点击事件 展开选项 */}
        <View className='eventHeaderTitle-right-operation'>
          {/* <IconFont name='moreandroid' size={48} color='#aaaaaa' /> */}
        </View>
      </View>

      {/* <SettingFloatLayout
        isOpened={showSetting}
        onClose={() => setShowSetting(false)}
      /> */}
    </View>
  )
}

