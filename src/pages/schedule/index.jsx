import React, { Component, useState, useEffect } from 'react'
import Taro from '@tarojs/taro'
import { Swiper, SwiperItem } from '@tarojs/components'
import { connect } from 'react-redux'
import * as dayjs from 'dayjs'

import { getSchedule, updateMemo } from '../../servers/servers.js'
import { View } from '@tarojs/components'
import EventTable from './components/EventTable'
import EventTimeList from './components/EventTimeList'
import ScheduleHeader from './components/Header'

import CustomScheduleFL from '../../components/schedule-component/CustomScheduleFL'
import CourseDetailFloatLayout from '../../components/schedule-component/CourseDetailFloatLayout'


import './index.scss'

class Schedule extends Component {

  constructor(props) {
    super(props)
    this.state = {
      // 实际时间
      dayIndex: 0,
      weekIndex: 1,
      // 现在所选的时间
      currentDayIndex: 0,
      currentWeekIndex: 1,

      weekData: [],
      otherWeek: 0,
      scheduleMatrix: [],
      allSchedule: [],
      dailyScheduleNumber: 0,
      dateZh: dayjs().format('YYYY/MM/DD'),
      //
      course: [],
      courseDetailIsOpened: false,
      courseAddIsOpened: false,
      addedEvent: { timeRange: [0, 0], memo: "" },
    }
  }
  componentWillMount() {
    let _allSchedule = []
    let _index = 0
    let _weekData = []
    const startTime = dayjs().startOf("day").valueOf() + 25231231
    const endTime = dayjs().startOf("day").valueOf() + 82800000
    const __today = dayjs().format('YYYY/MM/DD')
    const l = ["一", "二", "三", "四", "五", "六", "日"];
    for (let index = 0; index < 20; index++) {
      _allSchedule.push([])
    }
    for (var i = 1; i <= 7; i++) {
      const _dateZh = dayjs().startOf('week').add(i, 'day').format('YYYY/MM/DD')
      const _dayZh = "周" + l[i - 1]
      const _today = __today === _dateZh ? true : false
      if (_today) {
        _index = i - 1
      }
      _weekData.push({ dayZh: _dayZh, dateZh: _dateZh, today: _today })
    }
    const _week = dayjs(new Date()).diff(dayjs('2022/02/28'), 'week')

    getSchedule(startTime, endTime).then(res => {
      this.setState({
        allSchedule: _allSchedule[_week] = res.data.result,
        weekIndex: _week,
        currentWeekIndex: _week,
        currentDayIndex: _index,
        dayIndex: _index,
        dateZh: _weekData[_index].dateZh,
        weekData: _weekData,
        scheduleMatrix: res.data.result,
        dailyScheduleNumber: res.data.result[this.state.currentDayIndex]["allSchedule"]
      })
    }).catch(err => {
      console.log(err)
    })

  }

  getWeekDay = (obs) => {
    const _weekData = []
    var l = ["一", "二", "三", "四", "五", "六", "日"];

    const _otherWeek = dayjs().subtract(obs, 'weeks')
    for (var i = 1; i <= 7; i++) {
      const _dateZh = _otherWeek.startOf('week').add(i, 'day').format('YYYY/MM/DD')
      const _dayZh = "周" + l[i - 1]
      const _today = false
      _weekData.push({ dayZh: _dayZh, dateZh: _dateZh, today: _today })
    }
    const startTime = dayjs(_weekData[0].dateZh).valueOf() + 25231231
    const endTime = dayjs(_weekData[0].dateZh).add(6, "day").valueOf() + 82800000

    getSchedule(startTime, endTime).then(res => {
      this.setState({
        dateZh: _weekData[6 - this.state.currentDayIndex].dateZh,
        weekData: _weekData,
        scheduleMatrix: res.data.result,
        dailyScheduleNumber: res.data.result[this.state.currentDayIndex]["allSchedule"]
      })
    }).catch(err => {
      console.log(err)
    })


  }

  getClickDayIndex = (_currentdayIndex) => {
    this.setState({
      dateZh: this.state.weekData[_currentdayIndex].dateZh,
      currentDayIndex: _currentdayIndex,
      dailyScheduleNumber: this.state.scheduleMatrix[_currentdayIndex]["allSchedule"]
    })
  }


  handleClickCourse = (course, type) => {
    console.log(course)
    this.setState({
      course: course,
      type: type,
      courseDetailIsOpened: true
    })
  }
  handleUpdateMemo = (course) => {
    // TODO：这里可能会出现一天上同一节课的情况（即课程id相同），需要改进
    // updateMemo(this.state.currentDayIndex, this.state.currentWeekIndex, course.lessonCode, course.memo).then(res => {
    //   console.log(res)
    // }).catch(err => {
    //   Taro.showToast({
    //     title: '更新备注失败',
    //     icon: 'none',
    //     duration: 2000
    //   })
    // })
    this.setState({
      courseDetailIsOpened: false,
      course: course
    })
  }

  handleAddEventClose = () => {
    this.setState({ courseAddIsOpened: false })
  }
  // 获取长按的Y轴坐标
  handleEmptyScheduleLongPress = (_midY) => {
    // 默认自定义时间为30分钟
    _midY = Math.round(_midY)
    const _startY = _midY - 15
    const _endY = _midY + 15

    this.setState({
      addedEvent: { timeRange: [_startY, _endY] },
      courseAddIsOpened: true
    })
  }
  render() {
    return (
      <View className='event'>
        <ScheduleHeader
          dateZh={this.state.dateZh}
          weekIndex={this.state.weekIndex}
          currentWeekIndex={this.state.currentWeekIndex}
          weekData={this.state.weekData}
          currentDayIndex={this.state.currentDayIndex}
          dayIndex={this.state.dayIndex}
          handleClickDay={this.getClickDayIndex}
          dailyScheduleNumber={this.state.dailyScheduleNumber}>
        </ScheduleHeader>
        {
          this.state.scheduleMatrix.length === 0 ? <View></View> :
            <Swiper
              className="event-content"
              circular
              current={this.state.currentDayIndex}
              onChange={(e) => {
                const _sub = this.state.currentDayIndex - e.detail.current
                if (_sub === 6) {
                  this.getWeekDay(this.state.otherWeek - 1)
                  this.setState({
                    otherWeek: this.state.otherWeek - 1,
                    currentWeekIndex: this.state.currentWeekIndex + 1,
                    currentDayIndex: 0,
                  })
                } else if (_sub === -6) {
                  this.getWeekDay(this.state.otherWeek + 1)
                  this.setState({
                    otherWeek: this.state.otherWeek + 1,
                    currentWeekIndex: this.state.currentWeekIndex - 1,
                    currentDayIndex: 6,
                  })
                } else {
                  this.setState({
                    currentDayIndex: e.detail.current,
                    dateZh: this.state.weekData[e.detail.current].dateZh,
                    dailyScheduleNumber: this.state.scheduleMatrix[e.detail.current]["allSchedule"]
                  })
                }
              }}
            >
              {
                this.state.scheduleMatrix.map((day, index) => {
                  return (
                    <SwiperItem
                      key={index}>
                      <EventTimeList
                        handleLongPress={this.handleEmptyScheduleLongPress}
                        isToday={this.state.dayIndex === index && this.state.weekIndex === this.state.currentWeekIndex} />
                      {

                        <EventTable
                          handleClickCourse={this.handleClickCourse}
                          dayScheduleData={day}
                          currentDayIndex={index}
                          weekIndex={this.state.weekIndex}
                          currentWeekIndex={this.state.currentWeekIndex} />
                      }

                    </SwiperItem>
                  )
                })
              }

            </Swiper>
        }


        {/* <View className='event-content'
          onTouchStart={(e) => this.touchStart(e)}
          onTouchMove={(e) => { this.touchMove(e) }}
          onTouchEnd={(e) => { this.touchEnd(e) }}>
          <EventTimeList
            swiperDayIndex={this.swiperDayIndex}
            handleLongPress={this.handleEmptyScheduleLongPress}
            isToday={this.state.dayIndex === this.state.currentDayIndex && this.state.weekIndex === this.state.currentWeekIndex} />
          {
            this.state.scheduleMatrix[1] != undefined ?
              <EventTable
                handleClickCourse={this.handleClickCourse}
                dayScheduleData={this.state.scheduleMatrix[this.state.currentDayIndex]}
                currentDayIndex={this.state.currentDayIndex}
                weekIndex={this.state.weekIndex}
                currentWeekIndex={this.state.currentWeekIndex} />
              : <View></View>
          }

        </View> */}

        <CourseDetailFloatLayout
          course={this.state.course}
          type={this.state.type}
          courseDetailIsOpened={this.state.courseDetailIsOpened}
          onClose={this.handleUpdateMemo}
        />
        <CustomScheduleFL
          isOpened={this.state.courseAddIsOpened}
          currentWeekIndex={this.state.currentWeekIndex}
          currentDayIndex={this.state.currentDayIndex}
          addedEvent={this.state.addedEvent}
          updateData={this.handleUpdateSchedule}
          updateCourseDetailFL={this.handleUpdateSchedule}
          onClose={this.handleAddEventClose}
          scheduleMatrix={this.state.scheduleMatrix}
          weekIndex={this.state.weekIndex}
        />
      </View>
    )
  }

}



// function Schedule(props) {
//   // 手动选择的日期在周视图中的索引
//   const [dayIndex, setDayIndex] = useState(0)
//   // 当天所在周的第几天
//   const [currentDayIndex, setCurrentDayIndex] = useState(0)
//   // timePicker的显示日期
//   const [weekData, setWeekData] = useState([])
//   // 选择的日期相对于当前日期的偏移量
//   const [otherWeek, setOtherWeek] = useState(0)
//   // 当前周的日期
//   const [currentWeekIndex, setCurrentWeekIndex] = useState(11)
//   const [scheduleMatrix, setScheduleMatrix] = useState([])
//   const [dayScheduleData, setDayScheduleData] = useState([])
//   // header 上显示的日期
//   const [dateZh, setDateZh] = useState(dayjs().format('YYYY/MM/DD'))
//   // 手动选择的周数第几天
//   const weekIndex = 11
//   useEffect(() => {
//     getWeekDay(0)
//     getDayScheduleData(dateZh)
//   }, [dateZh])





//   return (
//     <View className='event'>
//       <ScheduleHeader
//         dateZh={dateZh}
//         currentWeekIndex={currentWeekIndex}
//         weekData={weekData}
//         currentDayIndex={currentDayIndex}
//         dayIndex={dayIndex}
//         handleClickDay={getClickDayIndex}>
//       </ScheduleHeader>

//       <View className='event-content' onTouchStart={(e) => touchStart(e)} onTouchMove={(e) => { touchMove(e) }} onTouchEnd={(e) => { touchEnd(e) }}>
//         <EventTimeList swiperDayIndex={swiperDayIndex} isToday={dayIndex === currentDayIndex && weekIndex === currentWeekIndex} />
//         <EventTable dayScheduleData={dayScheduleData} currentDayIndex={currentDayIndex} weekIndex={weekIndex} currentWeekIndex={currentWeekIndex} />
//       </View>

//       {/* 作用？？？ */}
//       {/* <View className='event-whiteBackground'></View> */}

//       {/* <CourseDetailFloatLayout
//         courseDetailFLData={courseDetailFLData}
//         source='event'
//         onClose={() => { props.updateUiData({ courseDetailFLData: { ...courseDetailFLData, isOpened: false } }) }}
//         updateColorPicker={(handleColorChange, theme, color) => props.updateUiData({
//           colorPickerData: { isOpened: true, handleColorChange, theme, color },
//           courseDetailFLData: { ...courseDetailFLData, showMemo: false }
//         })}
//         openCustomScheduleFL={({ dayIndex, startTime, courseType, chosenWeeks }) => props.updateUiData({
//           customScheduleFLData: {
//             ...courseDetailFLData,
//             isOpened: true,
//             type: 'change',
//             dayIndex,
//             startTime,
//             courseType,
//             chosenWeeks,
//             currentWeekIndex: currentWeekIndex + 1,
//           },
//           chosenBlank: [],
//           courseDetailFLData: { ...courseDetailFLData, showMemo: false }
//         })}
//       /> */}



//       {/* <ColorPicker
//         isOpened={colorPickerData.isOpened}
//         onClose={() => props.updateUiData({
//           colorPickerData: { isOpened: false },
//           courseDetailFLData: { ...courseDetailFLData, showMemo: true }
//         })}
//         handleColorChange={colorPickerData.handleColorChange}
//         theme={colorPickerData.theme}
//         currentColor={colorPickerData.currentColor}
//       /> */}
//     </View>
//   )
// }

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