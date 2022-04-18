import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { View, Text } from '@tarojs/components'

import './index.scss';

export default (props) => {
  const { swiperDayIndex, isToday,handleLongPress } = props;
  const [pTimeLine, setPTimeLine] = useState(30)


  const eventBoxHeight = 0.8
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
  const getPTimeLine = () => {
    const now = new Date()
    const hours = now.getHours()
    const minutes = now.getMinutes()
    const startDate = new Date('2000/05/21 7:00').getTime()
    const endDate = new Date('2000/05/21 ' + hours + ':' + minutes).getTime()
    let time = (endDate - startDate) / 60000
    setPTimeLine(time)
  }
  useEffect(() => {
    getPTimeLine()
    setInterval(() => {
      getPTimeLine()
    }, 60000);
  }, [])

  const touchLongPress = (e) => {
    // const offsetTop = e.mpEvent.currentTarget.offsetTop
    // const _detail = [e.detail["x"], e.detail["y"] - 249]
    handleLongPress(e.detail["y"] - 249)
  }

  return (
    <View className='eventTimeList'>
      {
        timeList.map(time => (
          // 一个item是两个小时
          <View onLongPress={(e) => touchLongPress(e)} key={time} className='eventTimeList-item' style={{ height: 120 * eventBoxHeight + 'px' }}>
            <View className='eventTimeList-item-timeBox'>
              <Text>{time}</Text>
            </View>
            <View className='eventTimeList-item-line'></View>
          </View>
        ))
      }

      {
        (isToday) &&
        <View className='eventTimeList-pTimeLine' style={{ marginTop: (pTimeLine * eventBoxHeight) + 'px' }}>
          <View className='eventTimeList-pTimeLine-dot'></View>
          <View className='eventTimeList-pTimeLine-line'></View>
        </View>
      }
    </View>
  )
}

