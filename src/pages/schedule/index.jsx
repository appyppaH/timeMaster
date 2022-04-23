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
      //本周所有事件
      scheduleMatrix: [],
      // 本学期所有事件，使用慢加载
      allSchedule: [],
      dailyScheduleNumber: 0,
      dateZh: dayjs().format('YYYY/MM/DD'),
      hasDataWeek: 20,
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
      _allSchedule[_week] = res.data.result
      this.setState({
        allSchedule: _allSchedule,
        weekIndex: _week,
        hasDataWeek: _week,
        currentWeekIndex: _week,
        currentDayIndex: _index,
        dayIndex: _index,
        dateZh: _weekData[_index].dateZh,
        weekData: _weekData,
        scheduleMatrix: res.data.result,
        dailyScheduleNumber: res.data.result[this.state.currentDayIndex]["num"]
      })
    }).catch(err => {
      console.log(err)
    })
  }


  swiperOtherWeek = (e) => {

    const _sub = (this.state.currentDayIndex - e.detail.current) % 7
    // console.log("e.detail.current", e.detail.current)
    // console.log("_sub", _sub)
    if ((e.detail.current % 7 === 6 && _sub == 1) || _sub === -6) {
      // 切换至上一周
      // console.log("切换至上一周u")
      this.getWeekDay(this.state.otherWeek - 1, 6, this.state.currentWeekIndex - 1)
    } else if ((e.detail.current % 7 === 0 && _sub == -1) || _sub === 6) {
      // 切换至下一周
      this.getWeekDay(this.state.otherWeek + 1, 0, this.state.currentWeekIndex + 1)
    } else {
      // console.log("页面切换，但没有切换周")
      this.setState({
        currentDayIndex: e.detail.current,
        dateZh: this.state.weekData[e.detail.current % 7].dateZh,
        dailyScheduleNumber: this.state.scheduleMatrix[e.detail.current % 7]["num"],
        // currentWeekIndex: e.detail.current / 7 + this.state.currentWeekIndex
      })
    }

  }
  getWeekDay = (obs, _currentdayIndex, _currentWeekIndex) => {
    const _weekData = []
    var l = ["一", "二", "三", "四", "五", "六", "日"];
    let _scheduleMatrix = []
    let _hasDataWeek = this.state.hasDataWeek
    let _normalDauIndex = _currentdayIndex
    let _swiperWeekObs = 0

    if (_hasDataWeek > _currentWeekIndex) {
      _hasDataWeek = _currentWeekIndex
    }

    if (_currentdayIndex === 6) {
      // 切换至上一周
      _swiperWeekObs = _currentWeekIndex - _hasDataWeek + 1
      _normalDauIndex = _swiperWeekObs * 7 - 1

    } else if (_currentdayIndex === 0) {
      // 切换至下一周
      _swiperWeekObs = _currentWeekIndex - _hasDataWeek
      _normalDauIndex = _swiperWeekObs * 7
    }
    const _otherWeek = dayjs().add(obs, 'weeks')
    for (var i = 1; i <= 7; i++) {
      const _dateZh = _otherWeek.startOf('week').add(i, 'day').format('YYYY/MM/DD')
      const _dayZh = "周" + l[i - 1]
      const _today = false
      _weekData.push({ dayZh: _dayZh, dateZh: _dateZh, today: _today })
    }
    const startTime = dayjs(_weekData[0].dateZh).valueOf() + 25231231
    const endTime = dayjs(_weekData[0].dateZh).add(6, "day").valueOf() + 82800000
    const _nAllSchedule = this.state.allSchedule

    if (_nAllSchedule[_currentWeekIndex].length !== 0) {
      this.setState({
        dateZh: _weekData[_currentdayIndex].dateZh,
        weekData: _weekData,
        scheduleMatrix: _nAllSchedule[_currentWeekIndex],
        dailyScheduleNumber: _nAllSchedule[_currentWeekIndex][_currentdayIndex]["num"],
        currentDayIndex: _normalDauIndex,
        currentWeekIndex: _currentWeekIndex,
        otherWeek: obs
      })
    } else {
      getSchedule(startTime, endTime).then(res => {
        const _nAllSchedule = this.state.allSchedule
        _nAllSchedule[_currentWeekIndex] = res.data.result
        this.setState({
          dateZh: _weekData[_normalDauIndex % 7].dateZh,
          hasDataWeek: _hasDataWeek,
          weekData: _weekData,
          allSchedule: _nAllSchedule,
          scheduleMatrix: res.data.result,
          dailyScheduleNumber: res.data.result[_normalDauIndex % 7]["num"],
          currentDayIndex: _normalDauIndex,
          currentWeekIndex: _currentWeekIndex,
          otherWeek: obs
        })
      }).catch(err => {
        // TODO
        console.log(err)
      })
    }


  }

  getClickDayIndex = (_currentdayIndex) => {
    const _currentWeekIndex = this.state.currentWeekIndex
    const _hasDataWeek = this.state.hasDataWeek
    const _obs = _currentWeekIndex - _hasDataWeek
    this.setState({
      dateZh: this.state.weekData[_currentdayIndex].dateZh,
      currentDayIndex: _obs * 7 + _currentdayIndex,
      dailyScheduleNumber: this.state.scheduleMatrix[_currentdayIndex]["allSchedule"]
    })
  }

  handleClickCourse = (course, type) => {
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
  handleUpdateSchedule = (evnet) => {
    const _scheduleMatrix = this.state.scheduleMatrix
    if (_scheduleMatrix.event != undefined && _scheduleMatrix.event.length > 0) {
      _scheduleMatrix.event = [..._scheduleMatrix.event, evnet]
    } else {
      _scheduleMatrix.event = [evnet]
    }
    const _allSchedule = this.state.allSchedule
    _allSchedule[this.state.currentWeekIndex][this.state.currentDayIndex].event = _scheduleMatrix.event
    this.setState({
      scheduleMatrix: _scheduleMatrix,
      allSchedule: _allSchedule
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
  handleClickCalendarDay = (e) => {
    const _currentWeekIndex = dayjs(e.value.start).diff(dayjs('2022/02/28'), 'week')
    const _currentDayIndex = dayjs(e.value.start).day()
    if (_currentWeekIndex < this.state.hasDataWeek) {
      Taro.showToast({
        title: '暂未加载课程',
        icon: 'none',
        duration: 2000
      })
      return
    }
    this.setState({
      dateZh: dayjs(e.value.start).format('YYYY/MM/DD'),
      currentWeekIndex: _currentWeekIndex,
      currentDayIndex: _currentDayIndex,
      dailyScheduleNumber: this.state.allSchedule[_currentWeekIndex][_currentDayIndex]["allSchedule"],
      scheduleMatrix: this.state.allSchedule[_currentWeekIndex],

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
          currentDayIndex={this.state.currentDayIndex % 7}
          dayIndex={this.state.dayIndex}
          handleClickDay={this.getClickDayIndex}
          handleClickCalendarDay={this.handleClickCalendarDay}
          dailyScheduleNumber={this.state.dailyScheduleNumber}>
        </ScheduleHeader>
        {
          this.state.scheduleMatrix.length > 0 &&
          <Swiper
            className="event-content"
            indicatorColor="#999"
            indicatorActiveColor="#333"
            indicatorDots
            circular
            current={this.state.currentDayIndex}
            onChange={(e) => this.swiperOtherWeek(e)}
          >
            {
              this.state.allSchedule.map((scheduleMatrix, i) => {
                if (scheduleMatrix.length !== 0) {
                  return (scheduleMatrix.map((day, index) => {
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
                  }))
                }
              })
            }
          </Swiper>

        }



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
          onClose={this.handleAddEventClose}
          scheduleMatrix={this.state.scheduleMatrix}
          weekIndex={this.state.weekIndex}
        />
      </View>
    )
  }
}


export default connect()(Schedule);