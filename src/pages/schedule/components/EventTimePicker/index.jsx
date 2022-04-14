import React from 'react'
import { View } from '@tarojs/components'
import { useSelector, useDispatch } from 'react-redux'
// import { AtCalendar } from "taro-ui"

import './index.scss';

export default (props) => {
  const {handleClickDay,dayIndex,currentDayIndex,weekData} = props;
  const showCalendar = false
  return (
    <View className='eventTimePicker'>
      {
        showCalendar ?
          <View className='eventTimePicker-calendar'>
            {/* TODO: onSelectDate={e => handleClickCalendarDay(e)} */}
            {/* <AtCalendar isSwiper={false} minDate='2020/9/7' maxDate='2021/1/24' /> */}
            {/* <View className='eventTimePicker-calendar-back' onClick={() => dispatch(updateUiData({ showCalendar: false }))}>收起</View> */}
          </View>
          :
          <View className='eventTimePicker-dayLine'>
            {
              weekData.map((dayData, _dayIndex) => (
                <View className='eventTimePicker-dayLine-item' key={dayData.dateZh}>
                  <View
                    className={`eventTimePicker-dayLine-box eventTimePicker-dayLine-box_static${_dayIndex === currentDayIndex && dayIndex !== _dayIndex ?'_current':''} eventTimePicker-dayLine-box${dayIndex === _dayIndex ? '_active' : ''}`}
                    onClick={() => handleClickDay(_dayIndex)}
                  >
                    <View className='eventTimePicker-dayLine-box_day'>
                      {dayData.dayZh}
                    </View>
                    <View className='eventTimePicker-dayLine-box_date'>
                      {parseInt(dayData.dateZh.split('/')[2])}
                    </View>
                  </View>
                </View>
              ))
            }
          </View>
      }
    </View>
  )
}

