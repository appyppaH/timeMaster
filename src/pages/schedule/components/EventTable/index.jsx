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

  for (var i in dayScheduleData) {
    for (var j in dayScheduleData[i]) {
      dayScheduleData[i][j]["startTime"] = dayScheduleData[i][j]["timeRange"][0]
      dayScheduleData[i][j]["allTime"] = dayScheduleData[i][j].timeRange[1]- dayScheduleData[i][j].timeRange[0]
      dayScheduleData[i][j]["timeNum"] = dayScheduleData[i][j]["allTime"] / 50
    }
  }



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


  const touchLongPress = (e, schedule, type) => {
    handleClickCourse(schedule, type)
  }


  return (
    <View className='eventTable' style={{ top: '0' }}>
      {

        Object.keys(dayScheduleData).map((type) => {
          if (type != 'num') {
            return (<View style={{ width: "inherit" }}>
              {
                dayScheduleData[type].map((schedule, i) => {
                  return (<View
                    className={`eventTable-course courseBox-boxColor-${schedule.color}_${theme}`}
                    onLongPress={(e) => { touchLongPress(e, schedule, type) }}
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

