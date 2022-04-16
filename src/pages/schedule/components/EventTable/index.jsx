import React, { useEffect, useState } from 'react'
import { View } from '@tarojs/components'
import { useSelector } from 'react-redux'

// import EventBox from '../EventBox'
import './index.scss';
import './courseBox.scss'

export default (props) => {
  const eventBoxHeight = 0.8
  const theme = 0

  const { dayScheduleData, weekIndex, dayIndex, handleClickCourse } = props

  //计算课程与上一个课程距离 的以及总长度F
  const diffTime = (startTime, endTime) => {
    const startDate = new Date('2000/05/21 ' + startTime).getTime()
    const endDate = new Date('2000/05/21 ' + endTime).getTime()
    return (endDate - startDate) / 60000
  }
  for (var i in dayScheduleData) {
    for (var j in dayScheduleData[i]) {
      dayScheduleData[i][j]["startTime"] = diffTime("7:00", dayScheduleData[i][j].timeRange[0])
      dayScheduleData[i][j]["allTime"] = diffTime(dayScheduleData[i][j].timeRange[0], dayScheduleData[i][j].timeRange[1])
      dayScheduleData[i][j]["timeNum"] = dayScheduleData[i][j]["allTime"] / 50
    }

  }



  // console.log(dayScheduleData)
  // const timeTable = [
  //   // 基于早上七点计算的时间
  //   { "startTime": 60, "startTimeText": "08:00" },
  //   { "endTime": 230, "endTimeText": "10:50" }
  // ]
  // 958863600000  15981060
  // 958867200000  15981120 差60
  // 958924800000  15982080 差1020
  // dayScheduleData[周次][天] = 当天课程
  // const dayScheduleData = scheduleMatrix[weekIndex][dayIndex]
  // 当天课程

  // 确定是否带伞
  // let rainPre = 0
  // if (weatherHourly && dayLineMatrix.length !== 0 && weatherHourly.precipitation && name) {
  //   // 这里加(减)了15分钟，为了更大范围的预测
  //   const eventStartMoment = moment(dayLineMatrix[weekIndex][dayIndex].dateZh + ' ' + timeTable[startTime].startTimeText).subtract(15, 'minutes')
  //   const eventEndMoment = moment(dayLineMatrix[weekIndex][dayIndex].dateZh + ' ' + timeTable[endTime].endTimeText).add(15, 'minutes')
  //   weatherHourly.precipitation.map(hourPre => {
  //     const { datetime, value } = hourPre
  //     const preMoment = moment(datetime)

  //     if (preMoment.isAfter(eventStartMoment) && preMoment.isBefore(eventEndMoment)) {
  //       rainPre += value
  //     }
  //   })
  // }




  return (
    <View className='eventTable' style={{ top: '0' }}>
      {

        Object.keys(dayScheduleData).map((type) => {
          if (type != 'allSchedule') {
            return (<View style={{ width: "inherit" }}>
              {
                dayScheduleData[type].map((schedule, i) => {
                  return (<View
                    className={`eventTable-course courseBox-boxColor-${schedule.color}_${theme}`}
                    style={{
                      height: (schedule.allTime) * eventBoxHeight + 'px',
                      paddingLeft: 18 * eventBoxHeight + 'px',
                      paddingRight: 18 * eventBoxHeight + 'px',
                      top: schedule.startTime * eventBoxHeight + 'px',
                    }}
                    onClick={() => handleClickCourse(schedule, type)}
                  >
                    <View
                      className={`eventTable-course-name courseBox-fontColor-${schedule.color}_${theme}`}
                      style={{ fontSize: (eventBoxHeight === 1 ? 14 : 16) + 'px' }}
                    >{schedule.name}</View>
                    {
                      schedule.timeNum > 1 &&
                      <View
                        className={`eventTable-course-clazzRoom courseBox-fontColor-${schedule.color}_${theme}`}
                        style={{
                          fontSize: (eventBoxHeight === 1 ? 12 : 14) + 'px',
                        }}
                      >{schedule.clazzRoom}</View>
                    }
                    {
                      schedule.timeNum >= 2 &&
                      <View
                        className={`eventTable-course-clazzRoom courseBox-fontColor-${schedule.color}_${theme}`}
                        style={{
                          fontSize: (eventBoxHeight === 1 ? 12 : 14) + 'px',
                        }}
                      >{schedule.memo}</View>
                    }
                  </View>)
                })
              }
            </View>)
          }

        })

      }
    </View>
  )
}

