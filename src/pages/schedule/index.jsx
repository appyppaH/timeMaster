import React, { useState, useEffect } from 'react'
import Taro, { usePullDownRefresh } from '@tarojs/taro'
import { connect } from 'react-redux'
import { View } from '@tarojs/components'

import EventHeaderTitle from './components/EventHeaderTitle'
import EventTimePicker from './components/EventTimePicker'
import EventTable from './components/EventTable'
import EventTimeList from './components/EventTimeList'
import Weather from './components/Weather'

// import CourseDetailFloatLayout from '../../components/schedule-component/CourseDetailFloatLayout'
// import ColorPicker from '../../components/schedule-component/ColorPicker'
// import CustomScheduleFL from '../../components/schedule-component/CustomScheduleFL'

import './index.scss'

function Schedule(props) {
  const [statusBarHeight, setStatusBarHeight] = useState(28)
  const [dayIndex, setDayIndex] = useState(0)
  const currentDayIndex = 1
  const weekData = [
    { dayZh: "周一", dateZh: "2000/10/01", today: false },
    { dayZh: "周二", dateZh: "2000/10/02", today: false },
    { dayZh: "周三", dateZh: "2000/10/03", today: false },
    { dayZh: "周四", dateZh: "2000/10/04", today: false },
    { dayZh: "周五", dateZh: "2000/10/05", today: false },
    { dayZh: "周六", dateZh: "2000/10/06", today: false },
    { dayZh: "周日", dateZh: "2000/10/07", today: false },
  ]
  useEffect(() => {
    Taro.getSystemInfo({
      success: function (res) {
        setStatusBarHeight(res.statusBarHeight)
      }
    })
  }, [])

  const getClickDayIndex = (_dayIndex) => {
    setDayIndex(_dayIndex)
    // console.log('dayIndex', _dayIndex)
  }
  const swiperDayIndex = (obs) => {
    const index = dayIndex + obs
    if (index < 0) {
      setDayIndex(0)
    } else if (index > 6) {
      setDayIndex(6)
    } else {
      setDayIndex(index)
    }
    // console.log("swiperDayIndex", dayIndex)
  }
  return (
    <View className='event'>

      <View className='event-header' style={{ paddingTop: statusBarHeight + 44 }}>
        <Weather statusBarHeight={statusBarHeight} />
        <EventHeaderTitle />
        <EventTimePicker weekData={weekData} currentDayIndex={currentDayIndex} dayIndex={dayIndex} handleClickDay={getClickDayIndex} />
      </View>
      <View className='event-content'>
        {/* TODO */}
        <EventTimeList swiperDayIndex={swiperDayIndex} />
        {/* <EventTable /> */}
      </View>
      {/* 作用？？？ */}
      {/* <View className='event-whiteBackground'></View> */}

      {/* <CourseDetailFloatLayout
        courseDetailFLData={courseDetailFLData}
        source='event'
        onClose={() => { props.updateUiData({ courseDetailFLData: { ...courseDetailFLData, isOpened: false } }) }}
        updateColorPicker={(handleColorChange, theme, color) => props.updateUiData({
          colorPickerData: { isOpened: true, handleColorChange, theme, color },
          courseDetailFLData: { ...courseDetailFLData, showMemo: false }
        })}
        openCustomScheduleFL={({ dayIndex, startTime, courseType, chosenWeeks }) => props.updateUiData({
          customScheduleFLData: {
            ...courseDetailFLData,
            isOpened: true,
            type: 'change',
            dayIndex,
            startTime,
            courseType,
            chosenWeeks,
            currentWeekIndex: currentWeekIndex + 1,
          },
          chosenBlank: [],
          courseDetailFLData: { ...courseDetailFLData, showMemo: false }
        })}
      /> */}

      {/* <CustomScheduleFL
        isOpened={customScheduleFLData.isOpened}
        customScheduleFLData={customScheduleFLData}
        updateData={(newData) => props.updateUiData({
          customScheduleFLData: {
            ...customScheduleFLData,
            ...newData,
          }
        })}
        source='event'
        updateCourseDetailFL={(data) => props.updateUiData({
          courseDetailFLData: {
            ...courseDetailFLData,
            ...data
          }
        })}
        onClose={() => props.updateUiData({
          customScheduleFLData: { isOpened: false },
          courseDetailFLData: { ...courseDetailFLData, showMemo: true }
        })}
        scheduleMatrix={scheduleMatrix}
        timeTable={timeTable}
        weekIndex={weekIndex}
        updateColorPicker={(handleColorChange, theme, color) => props.updateUiData({ colorPickerData: { isOpened: true, handleColorChange, theme, color } })}
      /> */}

      {/* <ColorPicker
        isOpened={colorPickerData.isOpened}
        onClose={() => props.updateUiData({
          colorPickerData: { isOpened: false },
          courseDetailFLData: { ...courseDetailFLData, showMemo: true }
        })}
        handleColorChange={colorPickerData.handleColorChange}
        theme={colorPickerData.theme}
        currentColor={colorPickerData.currentColor}
      /> */}
    </View>
  )
}

// function mapStateToProps(state) {
//   return {
//     bizData: {
//       weekIndex: state.event.bizData.weekIndex,
//       currentWeekIndex: state.event.bizData.currentWeekIndex,
//       scheduleMatrix: state.event.bizData.scheduleMatrix,
//       timeTable: state.event.bizData.timeTable,
//     },
//     uiData: {
//       courseDetailFLData: state.event.uiData.courseDetailFLData,
//       customScheduleFLData: state.event.uiData.customScheduleFLData,
//       colorPickerData: state.event.uiData.colorPickerData,
//     }
//   };
// }

// const mapActions = {
//   ...eventActions
// }

// export default connect(mapStateToProps, mapActions)(Schedule);
export default connect()(Schedule);