import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { View, Text } from '@tarojs/components'

import './index.scss';

export default () => {
  const [pTimeLine, setPTimeLine] = useState(30)
  const eventBoxHeight = 1.5
  const timeList = [
    '08:00',
    '10:00',
    '12:00',
    '14:00',
    '16:00',
    '18:00',
    '20:00',
    '22:00'
  ]

  useEffect(() => {
    const getPTimeLine = () => {
      const now = new Date()
      const hours = now.getHours()
      const minutes = now.getMinutes()
      const startDate = new Date('2000/05/21 07:00').getTime()
      const endDate = new Date('2000/05/21 ' + hours + ':' + minutes).getTime()
      let time = 1 + (endDate - startDate) / 60000
      time = time < 30 ? 30 : time
      time = time > 959 ? 959 : time
      setPTimeLine(time)
      console.log('当前时间' + time)
    }
    getPTimeLine()
    setInterval(() => {
      getPTimeLine()
    }, 60000);
  }, [])



  return (
    <View className='eventTimeList'>
      {
        timeList.map(time => (
          <View key={time} className='eventTimeList-item' style={{ height: 120 * eventBoxHeight + 'rpx' }}>
            <View className='eventTimeList-item-timeBox'>
              <Text>{time}</Text>
            </View>
            <View className='eventTimeList-item-line'></View>
          </View>
        ))
      }

      {/* {
        (dayIndex === currentDayIndex && weekIndex === currentWeekIndex) &&
        <View className='eventTimeList-pTimeLine' style={{ marginTop: pTimeLine * eventBoxHeight - (15 / eventBoxHeight) + 'rpx' }}>
          <View className='eventTimeList-pTimeLine-dot'></View>
          <View className='eventTimeList-pTimeLine-line'></View>
        </View>
      } */}
    </View>
  )
}

