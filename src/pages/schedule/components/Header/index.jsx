import React, { useState, useEffect } from 'react'
import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.scss'
import Weather from './components/Weather'
export default (props) => {
    const [statusBarHeight, setStatusBarHeight] = useState(28)
    const { dateZh, currentDayIndex, currentWeekIndex, weekData, handleClickDay, dayIndex,dailyScheduleNumber } = props
    const showCalendar = false

    useEffect(() => {
        setStatusBarHeight(Taro.getSystemInfoSync().statusBarHeight)
    }, [])

    return (
        <View className='schedule-header' style={{ paddingTop: statusBarHeight + 44 }}>
            <Weather statusBarHeight={statusBarHeight} />
            <View className='schedule-header-Title'>
                <View className='schedule-header-Title-title-left'>
                    {/* TODO: 这里要设置点击事件选择日历 */}
                    <View className='schedule-header-Title-title'>
                        <Text style={{ marginRight: 8 }}>第{currentWeekIndex}周 {dateZh}</Text>
                        {/* <IconFont name='arrow-down-filling' size={24} color='#aaaaaa' /> */}
                    </View>
                    <View className='schedule-header-Title-comment'>
                        <Text>今日有</Text>
                        <Text className='schedule-header-Title-comment-number'>{dailyScheduleNumber}项</Text>
                        <Text>日程</Text>
                    </View>
                </View>

                <View className='schedule-header-Title-title-right'>
                    {/* TODO：这里要设置点击事件定位 */}
                    <View className='schedule-header-Title-title-right-operation' style={{ marginRight: '8rpx' }}>
                        {/* <IconFont name='dingwei' size={48} color='#aaaaaa' /> */}
                    </View>
                    {/* TODO：点击事件 展开选项 */}
                    <View className='schedule-header-Title-title-right-operation'>
                        {/* <IconFont name='moreandroid' size={48} color='#aaaaaa' /> */}
                    </View>
                </View>

                {/* <SettingFloatLayout
        isOpened={showSetting}
        onClose={() => setShowSetting(false)}
      /> */}
            </View>
            <View className='schedule-header-timePicker'>
                {
                    showCalendar ?
                        <View className='schedule-header-timePicker-calendar'>
                            {/* TODO: onSelectDate={e => handleClickCalendarDay(e)} */}
                            {/* <AtCalendar isSwiper={false} minDate='2020/9/7' maxDate='2021/1/24' /> */}
                            {/* <View className='schedule-header-timePicker-calendar-back' onClick={() => dispatch(updateUiData({ showCalendar: false }))}>收起</View> */}
                        </View>
                        :
                        <View className='schedule-header-timePicker-dayLine'>
                            {weekData.map((dayData, _currentdayIndex) => (
                                <View className='schedule-header-timePicker-dayLine-item' key={dayData.dateZh}>
                                    <View
                                        className={`schedule-header-timePicker-dayLine-box schedule-header-timePicker-dayLine-box${_currentdayIndex === currentDayIndex ? '_active' : ''} schedule-header-timePicker-dayLine-box_static${dayIndex === _currentdayIndex&& _currentdayIndex !== currentDayIndex  ? '_current' : ''}  `}
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