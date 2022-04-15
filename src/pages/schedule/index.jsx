import React, { Component, useState, useEffect } from 'react'
import Taro, { usePullDownRefresh } from '@tarojs/taro'
import { connect } from 'react-redux'
import * as dayjs from 'dayjs'

import { getSchedule } from '../../servers/servers.js'
import { View } from '@tarojs/components'
import EventTable from './components/EventTable'
import EventTimeList from './components/EventTimeList'
import ScheduleHeader from './components/Header'
import CourseDetailFloatLayout from '../../components/schedule-component/CourseDetailFloatLayout'
// import ColorPicker from '../../components/schedule-component/ColorPicker'
// import CustomScheduleFL from '../../components/schedule-component/CustomScheduleFL'

import './index.scss'
let startX = 0;
let startY = 0;
let moveX = 0;
let moveY = 0;
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
      dailyScheduleNumber: 0,
      dateZh: dayjs().format('YYYY/MM/DD'),
      //
      course: [],
      courseDetailIsOpened: false,
    }
  }
  componentWillMount() {
    this.getWeekDay(0)
    this.getScheduleMatrix()
  }
  getScheduleMatrix = (dateZh) => {
    const startTime = dayjs(dateZh).valueOf() + 25231231
    const endTime = dayjs(dateZh).valueOf() + 82800000
    getSchedule(startTime, endTime).then(res => {
      this.setState({
        scheduleMatrix: res.data.result
      })
    }).catch(err => {
      console.log(err)
    })
  }
  getWeekDay = (obs) => {
    const _weekData = []
    let _index = 0
    let _dateZh = this.state.dateZh
    var l = ["一", "二", "三", "四", "五", "六", "日"];
    const __today = dayjs().format('YYYY/MM/DD')

    if (obs !== 0) {
      const _otherWeek = dayjs().subtract(obs, 'weeks')
      for (var i = 1; i <= 7; i++) {
        const _dateZh = _otherWeek.startOf('week').add(i, 'day').format('YYYY/MM/DD')
        const _dayZh = "周" + l[i - 1]
        const _today = false
        _weekData.push({ dayZh: _dayZh, dateZh: _dateZh, today: _today })
      }
      this.setState({
        currentDayIndex: -1,
        dateZh: _weekData[6 - this.state.currentDayIndex].dateZh,
        weekData: _weekData
      })
    } else {
      for (var i = 1; i <= 7; i++) {
        const _dateZh = dayjs().startOf('week').add(i, 'day').format('YYYY/MM/DD')
        const _dayZh = "周" + l[i - 1]
        const _today = __today === _dateZh ? true : false
        if (_today) {
          _index = i - 1
        }
        _weekData.push({ dayZh: _dayZh, dateZh: _dateZh, today: _today })
      }
      this.setState({
        currentDayIndex: _index,
        dayIndex: _index,
        dateZh: _weekData[_index].dateZh,
        weekData: _weekData
      })
    }

  }

  getClickDayIndex = (_currentdayIndex) => {
    this.setState({
      dateZh: this.state.weekData[_currentdayIndex].dateZh,
      currentDayIndex: _currentdayIndex,
      dailyScheduleNumber: this.state.scheduleMatrix[_currentdayIndex]["allSchedule"]
    })
  }

  // touch翻页实现
  touchStart = (e) => {
    const { clientX, clientY } = e.touches[0]
    startX = clientX
    startY = clientY
  }
  touchMove = (e) => {
    const { clientX, clientY } = e.touches[0]
    moveX = clientX - startX
    moveY = clientY - startY
  }
  touchEnd = () => {
    if (Math.abs(moveX) > 50 && Math.abs(moveX) > Math.abs(moveY)) {
      if (moveX > 0) {
        startX = 0
        startY = 0
        moveX = 0
        moveY = 0
        this.swiperDayIndex(-1)
      } else {
        startX = 0
        startY = 0
        moveX = 0
        moveY = 0
        this.swiperDayIndex(1)
      }
    }
  }
  swiperDayIndex = (obs) => {
    const index = this.state.currentDayIndex + obs
    // 右滑到头 跳转至上个星期
    if (index < 0) {
      this.getWeekDay(this.state.otherWeek + 1)
      this.setState({
        otherWeek: this.state.otherWeek + 1,
        currentDayIndex: 6,
      })
      this.getScheduleMatrix()
      // 左滑到头、跳转至下个星期
    } else if (index > 6) {
      this.getWeekDay(this.state.otherWeek - 1)
      this.setState({
        otherWeek: this.state.otherWeek - 1,
        currentDayIndex: 0,
      })
      this.getScheduleMatrix()
    } else {
      this.setState({
        dateZh: this.state.weekData[index].dateZh,
        currentDayIndex: index,
        dailyScheduleNumber: this.state.scheduleMatrix[index]["allSchedule"]
      })
    }
  }

  handleClickCourse = (course) => {
    this.setState({
      course: course
    })
  }
  render() {
    return (
      <View className='event'>
        <ScheduleHeader
          dateZh={this.state.dateZh}
          currentWeekIndex={this.state.currentWeekIndex}
          weekData={this.state.weekData}
          currentDayIndex={this.state.currentDayIndex}
          dayIndex={this.state.dayIndex}
          handleClickDay={this.getClickDayIndex}
          dailyScheduleNumber={this.state.dailyScheduleNumber}>
        </ScheduleHeader>

        <View className='event-content' onTouchStart={(e) => this.touchStart(e)} onTouchMove={(e) => { this.touchMove(e) }} onTouchEnd={(e) => { this.touchEnd(e) }}>
          <EventTimeList swiperDayIndex={this.swiperDayIndex} isToday={this.state.dayIndex === this.state.currentDayIndex && this.state.weekIndex === this.state.currentWeekIndex} />
          {
            this.state.scheduleMatrix[1] != undefined ?
              <EventTable handleClickCourse={this.handleClickCourse} dayScheduleData={this.state.scheduleMatrix[this.state.currentDayIndex]} currentDayIndex={this.state.currentDayIndex} weekIndex={this.state.weekIndex} currentWeekIndex={this.state.currentWeekIndex} />
              : <View></View>

          }

        </View>

        <CourseDetailFloatLayout
          course={this.state.course}
          type={this.state.type}
          courseDetailIsOpened={this.state.courseDetailIsOpened}
          onClose={() => { this.setState({ courseDetailIsOpened: false }) }}
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

//       {/* <CustomScheduleFL
//         isOpened={customScheduleFLData.isOpened}
//         customScheduleFLData={customScheduleFLData}
//         updateData={(newData) => props.updateUiData({
//           customScheduleFLData: {
//             ...customScheduleFLData,
//             ...newData,
//           }
//         })}
//         source='event'
//         updateCourseDetailFL={(data) => props.updateUiData({
//           courseDetailFLData: {
//             ...courseDetailFLData,
//             ...data
//           }
//         })}
//         onClose={() => props.updateUiData({
//           customScheduleFLData: { isOpened: false },
//           courseDetailFLData: { ...courseDetailFLData, showMemo: true }
//         })}
//         scheduleMatrix={scheduleMatrix}
//         timeTable={timeTable}
//         weekIndex={weekIndex}
//         updateColorPicker={(handleColorChange, theme, color) => props.updateUiData({ colorPickerData: { isOpened: true, handleColorChange, theme, color } })}
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