import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { View, Text } from '@tarojs/components'

import './index.scss';

export default (props) => {
  const { swiperDayIndex, isToday } = props;
  const [pTimeLine, setPTimeLine] = useState(30)

  let startX = 0;
  let startY = 0;

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
    // const endDate = new Date('2000/05/21 ' + "8" + ':' + "00").getTime()
    let time = (endDate - startDate) / 60000
    setPTimeLine(time)
    console.log('当前时间' + time)
  }
  useEffect(() => {
    getPTimeLine()
    setInterval(() => {
      getPTimeLine()
    }, 60000);
  }, [])

  const touchStart = (e) => {
    const { clientX, clientY } = e.touches[0]
    startX = clientX
    startY = clientY
  }
  const touchMove = (e) => {
    const { clientX, clientY } = e.touches[0]
    const moveX = clientX - startX
    const moveY = clientY - startY
    if (Math.abs(moveX) > Math.abs(moveY)) {
      if (moveX > 0) {
        swiperDayIndex(-1)
      } else {
        swiperDayIndex(1)
      }
    }
  }
  const touchEnd = () => {
  }

  return (
    <View className='eventTimeList' onTouchStart={(e) => touchStart(e)} onTouchMove={(e) => { touchMove(e) }} onTouchEnd={(e) => { touchEnd(e) }}>
      {
        timeList.map(time => (
          // 一个item是两个小时
          <View key={time} className='eventTimeList-item' style={{ height: 120 * eventBoxHeight + 'px' }}>
            <View className='eventTimeList-item-timeBox'>
              <Text>{time}</Text>
            </View>
            <View className='eventTimeList-item-line'></View>
          </View>
        ))
      }

      {
        (isToday) &&
        <View className='eventTimeList-pTimeLine' style={{ marginTop:(pTimeLine * eventBoxHeight)  + 'px' }}>
          <View className='eventTimeList-pTimeLine-dot'></View>
          <View className='eventTimeList-pTimeLine-line'></View>
        </View>
      }
    </View>
  )
}

