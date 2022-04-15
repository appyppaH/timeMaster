import React, { useState, useEffect } from 'react'
import Taro, { usePullDownRefresh } from '@tarojs/taro'
import { connect } from 'react-redux'
import * as dayjs from 'dayjs'

import { getSchedule } from '../../servers/servers.js'
import { View } from '@tarojs/components'
import EventTable from './components/EventTable'
import EventTimeList from './components/EventTimeList'
import ScheduleHeader from './components/Header'
// import CourseDetailFloatLayout from '../../components/schedule-component/CourseDetailFloatLayout'
// import ColorPicker from '../../components/schedule-component/ColorPicker'
// import CustomScheduleFL from '../../components/schedule-component/CustomScheduleFL'

import './index.scss'

function Schedule(props) {
  // 手动选择的日期在周视图中的索引
  const [dayIndex, setDayIndex] = useState(0)
  // 当天所在周的第几天
  const [currentDayIndex, setCurrentDayIndex] = useState(0)
  // timePicker的显示日期
  const [weekData, setWeekData] = useState([])
  // 选择的日期相对于当前日期的偏移量
  const [otherWeek, setOtherWeek] = useState(0)
  // 当前周的日期
  const [currentWeekIndex, setCurrentWeekIndex] = useState(11)
  const [scheduleMatrix, setScheduleMatrix] = useState([])
  const [dayScheduleData, setDayScheduleData] = useState([])
  // header 上显示的日期
  const [dateZh, setDateZh] = useState('')
  // 手动选择的周数第几天
  const weekIndex = 11
  useEffect(() => {
    getWeekDay(0)
    getScheduleMatrix()
  }, [])


  const getScheduleMatrix = () => {
    getSchedule().then(res => {
      console.log(res)
      // setScheduleMatrix(res)
    }).catch(err => {
      console.log(err)
    })
  }
  // 获取header的星期日期
  const getWeekDay = (obs) => {
    const _weekData = []
    var l = ["一", "二", "三", "四", "五", "六", "日"];
    const __today = dayjs().format('YYYY/MM/DD')
    if (obs !== 0) {
      setCurrentDayIndex(-1)
      const _otherWeek = dayjs().subtract(obs, 'weeks')
      for (var i = 1; i <= 7; i++) {
        const _dateZh = _otherWeek.startOf('week').add(i, 'day').format('YYYY/MM/DD')
        const _dayZh = "周" + l[i - 1]
        const _today = false
        _weekData.push({ dayZh: _dayZh, dateZh: _dateZh, today: _today })
      }
      setDateZh(_weekData[6 - dayIndex].dateZh)
    } else {
      for (var i = 1; i <= 7; i++) {
        const _dateZh = dayjs().startOf('week').add(i, 'day').format('YYYY/MM/DD')
        const _dayZh = "周" + l[i - 1]
        const _today = __today === _dateZh ? true : false
        if (_today) {
          setCurrentDayIndex(i - 1)
          setDayIndex(i - 1)
        }
        _weekData.push({ dayZh: _dayZh, dateZh: _dateZh, today: _today })
      }
      setDateZh(_weekData[dayIndex].dateZh)
    }
    setWeekData(_weekData)
  }
  const getClickDayIndex = (_dayIndex) => {
    setDateZh(weekData[_dayIndex].dateZh)
    setDayIndex(_dayIndex)
  }

  // touch翻页实现
  let startX = 0;
  let startY = 0;

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
  const swiperDayIndex = (obs) => {
    const index = dayIndex + obs
    // 右滑到头 跳转至上个星期
    if (index < 0) {
      getWeekDay(otherWeek + 1)
      setOtherWeek(otherWeek + 1)
      setCurrentWeekIndex(currentWeekIndex - 1)
      setDayIndex(6)
      // 左滑到头、跳转至下个星期
    } else if (index > 6) {
      getWeekDay(otherWeek - 1, 1)
      setOtherWeek(otherWeek - 1)
      setCurrentWeekIndex(currentWeekIndex + 1)
      setDayIndex(0)
    } else {
      setDateZh(weekData[index].dateZh)
      setDayIndex(index)
    }
  }
  return (
    <View className='event'>
      <ScheduleHeader
        dateZh={dateZh}
        currentWeekIndex={currentWeekIndex}
        weekData={weekData}
        currentDayIndex={currentDayIndex}
        dayIndex={dayIndex}
        handleClickDay={getClickDayIndex}>
      </ScheduleHeader>

      <View className='event-content' onTouchStart={(e) => touchStart(e)} onTouchMove={(e) => { touchMove(e) }} onTouchEnd={(e) => { touchEnd(e) }}>
        <EventTimeList swiperDayIndex={swiperDayIndex} isToday={dayIndex === currentDayIndex && weekIndex === currentWeekIndex} />
        <EventTable dayScheduleData={scheduleMatrix[dayIndex]} currentDayIndex={currentDayIndex} weekIndex={weekIndex} currentWeekIndex={currentWeekIndex} />
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