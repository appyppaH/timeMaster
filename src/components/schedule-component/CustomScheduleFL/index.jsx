import React, { useState, useEffect } from 'react'
import Taro from '@tarojs/taro'
import { View, Input, Text } from '@tarojs/components'
import { AtFloatLayout, AtInputNumber, AtIcon } from 'taro-ui'
import CustomButton from '../../../components/CustomButton'
import dayjs from 'dayjs'

import './index.scss'


export default (props) => {
  const theme = 0
  const type = 'add'

  const { isOpened, onClose, addedEvent, currentWeekIndex, currentDayIndex, updateData, scheduleMatrix } = props
  const { name, clazzRoom, timeRange, memo, color = 'blue' } = addedEvent

  const [evnetName, setEventName] = useState(name)
  const [eventPlace, setEventPlace] = useState(clazzRoom)
  const [eventMemo, setEventMemo] = useState(memo)
  const [eventWeeks, setEventWeeks] = useState([])

  const [multChosen, setMultChosen] = useState('')

  const weekIndexes = []
  for (let i = 1; i <= 18; i++) {
    weekIndexes.push(i)
  }

  const handleClickWeekBox = (weekIndex) => {
    const chosenIndex = eventWeeks.indexOf(weekIndex)

    const newChosenWeeks = [...eventWeeks]

    if (chosenIndex >= 0) {
      newChosenWeeks.splice(chosenIndex, 1)
    } else {
      newChosenWeeks.push(weekIndex)
    }
    setEventWeeks(newChosenWeeks)

  }

  const handleMultChosen = (method) => {
    let newChosenWeeks = []

    if (method === multChosen) {
      setMultChosen('')
      switch (method) {
        case '单周':
          eventWeeks.map(chosenWeek => {
            if (chosenWeek % 2 !== 1) {
              newChosenWeeks.push(chosenWeek)
            }
          })
          break;
        case '双周':
          eventWeeks.map(chosenWeek => {
            if (chosenWeek % 2 !== 0) {
              newChosenWeeks.push(chosenWeek)
            }
          })
          break;
        case '全选':
          break;
        default:
          break;
      }
    } else {
      setMultChosen(method)
      switch (method) {
        case '单周':
          for (let i = 1; i < 21; i++) {
            if (i % 2 === 1) {
              newChosenWeeks.push(i)
            }
          }
          break;
        case '双周':
          for (let i = 1; i < 21; i++) {
            if (i % 2 === 0) {
              newChosenWeeks.push(i)
            }
          }
          break;
        case '全选':
          for (let i = 1; i < 21; i++) {
            newChosenWeeks.push(i)
          }
          break;
        default:
          break;
      }
    }
    setEventWeeks(newChosenWeeks)
    // addedEvent.chosenWeeks = newChosenWeeks
  }
  const timeText = (time) => {
    const _day = dayjs("2020-01-01 07:00").add(time, 'minutes')
    return _day.format('HH:mm')
  }
  const handleClickSubmit = () => {
    if (!evnetName) {
      Taro.showToast({
        title: '请填写事件名',
        icon: 'none',
        duration: 1000
      })
      return null
    }
    else if (eventWeeks.length === 0) {
      Taro.showToast({
        title: '请选择至少一个周目',
        icon: 'none',
        duration: 1000
      })
      return null
    }
    updateData({ "name": evnetName, "clazzRoom": eventPlace, "chosenWeeks": eventWeeks, "timeRange": addedEvent.timeRange, "memo": eventMemo, "color": "red" })
    Taro.showToast({
      title: '添加成功',
      duration: 1000
    })
    onClose()
  }

  return (
    <AtFloatLayout
      isOpened={isOpened}
      className='customScheduleFL'
      onClose={onClose}
    >
      <View className='customScheduleFL-header'>
        新增事件
        <View className='customScheduleFL-header-close' onClick={onClose}>
          <AtIcon value='close' size={24} color='#60646b'></AtIcon>
        </View>
      </View>

      <View className='customScheduleFL-content'>

        <View className='customScheduleFL-content-item'>
          <View className='customScheduleFL-content-item-inputBox'>
            <Text>事件</Text>
            <Input
              className='customScheduleFL-content-item-input'
              placeholder='必填'
              value={evnetName ? evnetName : ''}
              onInput={e => setEventName(e.detail.value)}
            />
          </View>
        </View>

        <View className='customScheduleFL-content-item'>
          <View className='customScheduleFL-content-item-inputBox'>
            <Text>地点</Text>
            <Input
              className='customScheduleFL-content-item-input'
              placeholder='非必填'
              value={eventPlace ? eventPlace : ''}
              onInput={e => setEventPlace(e.detail.value)}
            />
          </View>
        </View>
        <View className='customScheduleFL-content-item'>
          <View className='customScheduleFL-content-item-inputBox'>
            <Text>备注</Text>
            <Input
              className='customScheduleFL-content-item-input'
              placeholder='非必填'
              value={eventMemo ? eventMemo : ''}
              onInput={e => setEventMemo(e.detail.value)}
            />
          </View>
        </View>
        <View className='customScheduleFL-content-item'>
          <View className='customScheduleFL-content-item-timeIndexBox'>
            <View className='customScheduleFL-content-item-timeIndexBox-jieshuBox'>
              <Text className='customScheduleFL-content-item-timeIndexBox-jieshuBox_title'>时间</Text>

              <Text className='customScheduleFL-content-item-timeIndexBox-jieshuBox_time'>{`${timeText(addedEvent.timeRange[0])}-`}</Text>

              <Text className={`customScheduleFL-content-item-timeIndexBox-jieshuBox_time customScheduleFL-content-item-timeIndexBox-jieshuBox_time`}>
                {timeText(addedEvent.timeRange[1])}</Text>
            </View>
            {/* TODO 时间选择 */}
            {/* <AtInputNumber
              min={1}
              max={4}
              step={1}
              // value={courseType}
              // onChange={value => updateData({ courseType: value })}
            /> */}
          </View>
        </View>

        <View className='customScheduleFL-content-item'>
          <View className='customScheduleFL-content-item-weekIndexHeader'>
            <Text>重复</Text>
            <View className='customScheduleFL-content-item-weekIndexHeader-popGroup'>
              <View className='customScheduleFL-content-item-weekIndexHeader-popGroup-item'
                onClick={() => handleMultChosen('单周')}
              >
                <View className={`customScheduleFL-content-item-weekIndexHeader-pop customScheduleFL-content-item-weekIndexHeader-pop_${multChosen === '单周' && 'active'}`}></View>
                <Text>单周</Text>
              </View>
              <View className='customScheduleFL-content-item-weekIndexHeader-popGroup-item'
                onClick={() => handleMultChosen('双周')}
              >
                <View className={`customScheduleFL-content-item-weekIndexHeader-pop customScheduleFL-content-item-weekIndexHeader-pop_${multChosen === '双周' && 'active'}`}></View>
                <Text>双周</Text>
              </View>
              <View className='customScheduleFL-content-item-weekIndexHeader-popGroup-item'
                onClick={() => handleMultChosen('全选')}
              >
                <View className={`customScheduleFL-content-item-weekIndexHeader-pop customScheduleFL-content-item-weekIndexHeader-pop_${multChosen === '全选' && 'active'}`}></View>
                <Text>全选</Text>
              </View>
            </View>
          </View>
        </View>

        <View className='customScheduleFL-content-item'>
          <View className='customScheduleFL-content-item-weekIndexContent'>
            {
              weekIndexes.map((selectWeekIndex, i) => {

                const isChosen = eventWeeks.indexOf(selectWeekIndex) !== -1

                return (
                  <View key={`key${selectWeekIndex}`}
                    className={`customScheduleFL-content-item-weekIndexContent-week customScheduleFL-content-item-weekIndexContent-week_${isChosen ? 'chosen' : ''}`}
                    style={`opacity: ${selectWeekIndex > 20 ? 0 : 1}`}
                    onClick={() => handleClickWeekBox(selectWeekIndex)}
                  >
                    {selectWeekIndex === currentWeekIndex + 1 ? '本周' : selectWeekIndex}
                  </View>
                )
              })
            }
          </View>
        </View>

      </View>

      <View className='customScheduleFL-footer'>
        <View className='customScheduleFL-footer_blank'></View>

        <View className='customScheduleFL-footer-btnBox'>
          <CustomButton value={`确认${type === 'add' ? '添加' : '修改'}`} onSubmit={handleClickSubmit} />
        </View>

      </View>

    </AtFloatLayout>
  )
}
