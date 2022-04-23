import React, { useState, useEffect } from 'react'
import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtCalendar } from 'taro-ui'
import './index.scss'
import Weather from './components/Weather'
import IconFont from '../../../../components/iconfont'
import { AtIcon } from 'taro-ui'

export default (props) => {
    const [statusBarHeight, setStatusBarHeight] = useState(28)
    const { handleClickCalendarDay, dateZh, dayIndex, currentDayIndex, weekIndex, currentWeekIndex, weekData, handleClickDay, dailyScheduleNumber } = props
    const [showCalendar, setShowCalendar] = useState(false)

    useEffect(() => {
        setStatusBarHeight(Taro.getSystemInfoSync().statusBarHeight)
    }, [])

    return (
        <View className='schedule-header' style={{ paddingTop: statusBarHeight + 44 }}>
            <Weather  statusBarHeight={statusBarHeight} />
            <View className='schedule-header-Title'>
                <View className='schedule-header-Title-title-left'>
                    <View className='schedule-header-Title-title' onClick={() => setShowCalendar(!showCalendar)}>
                        <Text style={{ marginRight: 8 }}>第{currentWeekIndex + 1}周 {dateZh}</Text>
                        <AtIcon value='chevron-down' size='24' color='#aaaaaa' />
                    </View>
                    <View className='schedule-header-Title-comment'>
                        <Text>今日有</Text>
                        <Text className='schedule-header-Title-comment-number'>{dailyScheduleNumber}项</Text>
                        <Text>日程</Text>
                    </View>
                </View>

                <View className='schedule-header-Title-right'>
                    {/* TODO：这里要设置点击事件定位 */}
                    <View className='schedule-header-Title-right-operation' style={{ marginRight: '8rpx' }}>
                        {/* <IconFont name='dingwei' size={48} color='#aaaaaa' /> */}
                    </View>
                    {/* TODO：点击事件 展开选项 */}
                    <View className='schedule-header-Title-right-operation'>
                        <AtIcon value='list' size='24' color='#aaaaaa' />
                    </View>
                </View>

            </View>
            <View className='schedule-header-timePicker'>
                {
                    showCalendar ?
                        <View className='schedule-header-timePicker-calendar'>
                            <AtCalendar isSwiper={false} minDate='2022/2/28' maxDate='2022/6/30' onSelectDate={e => handleClickCalendarDay(e)} />
                            <View className='schedule-header-timePicker-calendar-back' onClick={() => setShowCalendar(false)}>收起</View>
                        </View>
                        :
                        <View className='schedule-header-timePicker-dayLine'>
                            {weekData.map((dayData, _currentdayIndex) => (
                                <View className='schedule-header-timePicker-dayLine-item' key={dayData.dateZh}>
                                    <View
                                        className={`schedule-header-timePicker-dayLine-box schedule-header-timePicker-dayLine-box${_currentdayIndex === currentDayIndex ? '_active' : ''} schedule-header-timePicker-dayLine-box_static${dayIndex === _currentdayIndex && _currentdayIndex !== currentDayIndex && weekIndex == currentWeekIndex ? '_current' : ''}  `}
                                        onClick={() => handleClickDay(_currentdayIndex)}
                                    >
                                        <View className='schedule-header-timePicker-dayLine-box_day'>
                                            {dayData.dayZh}
                                        </View>
                                        <View className='schedule-header-timePicker-dayLine-box_date'>
                                            {parseInt(dayData.dateZh.split('/')[2])}
                                        </View>
                                    </View>
                                </View>
                            ))}
                        </View>}
            </View>

        </View>

    )
}