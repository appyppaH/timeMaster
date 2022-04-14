import React, { useState } from 'react'
import { View } from '@tarojs/components'
import { useSelector } from 'react-redux'

// import EventBox from '../EventBox'
import './index.scss';
import './courseBox.scss'

export default (props) => {
  const eventBoxHeight = 0.8
  const scheduleMatrix = []
  const theme = 0
  // const timeTable = [
  //   // 基于早上七点计算的时间
  //   { "startTime": 60, "startTimeText": "08:00" },
  //   { "endTime": 230, "endTimeText": "10:50" }
  // ]
  // 958863600000  15981060
  // 958867200000  15981120 差60
  // 958924800000  15982080 差1020
  const weekIndex = 0
  const dayIndex = 0

  // dayScheduleData[周次][天] = 当天课程
  // const dayScheduleData = scheduleMatrix[weekIndex][dayIndex]
  // 当天课程
  const diffTime = (startTime, endTime) => {
    const startDate = new Date('2000/05/21 ' + startTime).getTime()
    const endDate = new Date('2000/05/21 ' + endTime).getTime()
    return (endDate - startDate) / 60000
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
  const dayScheduleData = [
    {
      "name": "计算机组成原理",
      "clazzRoom": "A3教学楼",
      "teacher": "",
      "timeRange": "",
      "timeIndexes": [1, 2],
      "startTimeText": "08:00",
      "endTimeText": "10:50",
      "lessonCode": "",
      "lessonType": "",
      "weekIndexes": "",
      "studentClazzes": "",
      "studentNumber": "",
      "color": "blue",
      "lessonId": "",
      "credits": "",
      "campus": "",
      "weekIndexesZh": "",
      "semesterId": "",
      "semestercode": "",
      "memo": ""
    }, {
      "name": "计算机网络",
      "clazzRoom": "A2教学楼",
      "teacher": "",
      "timeRange": "",
      "timeIndexes": [3, 4],
      "startTimeText": "11:00",
      "endTimeText": "11:50",
      "lessonCode": "",
      "lessonType": "",
      "weekIndexes": "",
      "studentClazzes": "",
      "studentNumber": "",
      "color": "red",
      "lessonId": "",
      "credits": "",
      "campus": "",
      "weekIndexesZh": "",
      "semesterId": "",
      "semestercode": "",
      "memo": ""
    }, {
      "name": "操作系统",
      "clazzRoom": "A2教学楼",
      "teacher": "",
      "timeRange": "",
      "timeIndexes": [6, 8],
      "startTimeText": "14:00",
      "endTimeText": "15:50",
      "lessonCode": "",
      "lessonType": "",
      "weekIndexes": "",
      "studentClazzes": "",
      "studentNumber": "",
      "color": "yellow",
      "lessonId": "",
      "credits": "",
      "campus": "",
      "weekIndexesZh": "",
      "semesterId": "",
      "semestercode": "",
      "memo": ""
    }
  ]

  const handleClickCourse = (course) => {
    console.log(course)
  }

  //计算课程与上一个课程距离 的以及总长度
  dayScheduleData.map((course, index) => {
    if (index === 0) {
      course["startTime"] = diffTime("7:00", course.startTimeText)
    } else {
      course["startTime"] = diffTime(dayScheduleData[index - 1].endTimeText, course.startTimeText)
    }
    course["endTime"] = diffTime(course.startTimeText, course.endTimeText)
    const indexes = course["timeIndexes"]
    course["timeNum"] = indexes[indexes.length - 1] - indexes[0] + 1
  }, [])

  return (
    <View className='eventTable' style={{ top: '249px' }}>
      {
        dayScheduleData.map((course, i) => (
          <View
            className={`eventTable-course courseBox-boxColor-${course.color}_${theme}`}
            style={{
              top: course.startTime * eventBoxHeight + 'px',
              height: (course.endTime) * eventBoxHeight + 'px',
              paddingLeft: 18 * eventBoxHeight + 'px',
              paddingRight: 18 * eventBoxHeight + 'px',
            }}
            onClick={() => handleClickCourse(course)}
          >
            <View
              className={`eventTable-course-name courseBox-fontColor-${course.color}_${theme}`}
              style={{ fontSize: (eventBoxHeight === 1 ? 14 : 16) + 'px' }}
            >{course.name}</View>
            {
              course.timeNum > 1 &&
              <View
                className={`eventTable-course-clazzRoom courseBox-fontColor-${course.color}_${theme}`}
                style={{
                  fontSize: (eventBoxHeight === 1 ? 12 : 14) + 'px',
                }}
              >{course.clazzRoom}</View>
            }
          </View>
        ))
      }
    </View>
  )
}

