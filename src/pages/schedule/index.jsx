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

  useEffect(() => {
    Taro.getSystemInfo({
      success: function (res) {
        setStatusBarHeight(res.statusBarHeight)
      }
    })
  }, [])


  return (
    <View className='event'>

      <Weather statusBarHeight={statusBarHeight} />

      <View className='event-header' style={{ paddingTop: statusBarHeight + 44 }}>
        {/* TODO */}
        <EventHeaderTitle />
        <EventTimePicker />
      </View>
      <View className='event-content'>
        {/* TODO */}
        <EventTimeList />
        {/* <EventTable /> */}
      </View>

      <View className='event-whiteBackground'></View>

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