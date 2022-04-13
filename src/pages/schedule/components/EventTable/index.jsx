import React from 'react'
import { View } from '@tarojs/components'
import { useSelector } from 'react-redux'

import EventBox from '../EventBox'
import './index.scss';

export default () => {
  const eventBoxHeight = 0.8

  const scheduleMatrix  = []
  const timeTable = []
  const weekIndex =0
  const dayIndex = 0
  if (scheduleMatrix || timeTable ) {
    return ''
  }
  // dayScheduleData[周次][天] = 当天课程
  const dayScheduleData = scheduleMatrix[weekIndex][dayIndex]

  const boxTypeList = []
  // 当天课程数据
  dayScheduleData.map((courseBoxList) => {
    const { timeIndexes = [] } = courseBoxList[0]
    const boxType = timeIndexes[timeIndexes.length - 1] - timeIndexes[0] + 1
    boxTypeList.push(boxType ? boxType : 1)
  })

  boxTypeList.map((boxType, boxi) => {
    if (boxType === 2) {
      boxTypeList[boxi + 1] = 0
    } else if (boxType === 3) {
      boxTypeList[boxi + 1] = 0
      boxTypeList[boxi + 2] = 0
    } else if (boxType === 4) {
      boxTypeList[boxi + 1] = 0
      boxTypeList[boxi + 2] = 0
      boxTypeList[boxi + 3] = 0
    }
  })

  const { startTime: startTime_ } = timeTable[0]
  // let paddingTop = 97 + 48 + (startTime_ - 800) * 1.5
  let paddingTop = 62 * eventBoxHeight + 48 + (startTime_ - 800) * eventBoxHeight

  return (
    <View className='eventTable' style={{ top: paddingTop + 'rpx' }}>
      {
        dayScheduleData.map((courseBoxList, startTime) => (
          <EventBox
            boxType={boxTypeList[startTime]}
            courseBoxList={courseBoxList}
            key={startTime}
            dayIndex={dayIndex}
            startTime={startTime}
            timeTable={timeTable}
          />
        ))
      }
    </View>
  )
}

