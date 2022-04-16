import React, { useState, useEffect } from 'react'
import Taro from '@tarojs/taro'
import { AtFloatLayout, AtAccordion, AtIcon } from 'taro-ui'
import { View, Text, Textarea } from '@tarojs/components'
import { useDispatch, useSelector } from 'react-redux'
import ColorButton from '../../../components/ColorButton'
import CustomButton from '../../../components/CustomButton'


import './index.scss'

export default (props) => {
  const { course, courseDetailIsOpened, onClose, type } = props
  if (course == []) { return "" }
  const { name, credits, clazzRoom, teacher, timeRange, lessonCode, lessonType, timeIndexes, dayIndex, studentClazzes, studentNumber, weekIndexes = [], weekIndexesZh, semestercode, color } = course
  const userType = "me"
  const theme = 0

  const [memo, setMemo] = useState(course.memo)
  const [showMemo, setShowMemo] = useState(true)
  const [showDetail, setShowDetail] = useState(false)

  useEffect(() => {
    if (courseDetailIsOpened) {
      setMemo(course.memo)
    }
  }, [courseDetailIsOpened, course.memo])

  const CDFLOnClose = () => {
    course.memo=memo
    onClose(course)
  }

  // icon先不要了啊
  let items = []
  let detailItems = []
  if (type === 'course') {
    let clazzString = ''
    if (studentClazzes) {
      studentClazzes.map((clazz) => {
        clazzString += clazz
        clazzString += (clazz === studentClazzes[studentClazzes.length - 1] ? '' : '、')
      })
    }
    items = [
      <><Text className='courseDetailFloatLayout-itemTitle'>教室：</Text><Text>{clazzRoom}</Text></>,
      <><Text className='courseDetailFloatLayout-itemTitle'>老师：</Text><Text>{teacher}</Text></>,
      <><Text className='courseDetailFloatLayout-itemTitle'>时间：</Text><Text>{timeRange}</Text></>,
      <><Text className='courseDetailFloatLayout-itemTitle'>开设周目：</Text><Text>{weekIndexesZh}</Text></>
    ]
    detailItems = [
      <><Text className='courseDetailFloatLayout-itemTitle'>学分：</Text><Text>{credits}</Text></>,
      <><Text className='courseDetailFloatLayout-itemTitle'>课堂人数：</Text><Text>{studentNumber}</Text></>,
      <><Text className='courseDetailFloatLayout-itemTitle'>课程类型：</Text><Text>{lessonType}</Text></>,
      <><Text className='courseDetailFloatLayout-itemTitle'>课程代码：</Text><Text>{lessonCode}</Text></>,
      <><Text className='courseDetailFloatLayout-itemTitle'>上课班级：</Text><Text>{clazzString}</Text></>
    ]
  } else if (type === 'custom' || type === 'exam') {
    let customWeeksZh = weekIndexes.map(weekIndex => (weekIndex !== weekIndexes[weekIndexes.length - 1]) ? weekIndex + ', ' : weekIndex)
    if (customWeeksZh.length === 20) {
      customWeeksZh = '整个学期'
    }
    items = [
      <><Text className='courseDetailFloatLayout-itemTitle'>地点：</Text><Text>{clazzRoom}</Text></>,
      <><Text className='courseDetailFloatLayout-itemTitle'>时间：</Text><Text>{timeRange}</Text></>,
      <><Text className='courseDetailFloatLayout-itemTitle'>周目：</Text><Text>{customWeeksZh}</Text></>,
    ]
  }


  const handleDeleteCustom = () => {
    Taro.showModal({
      title: '确定删除该事件吗',
      content: '此操作将无法恢复',
      confirmColor: '#f33f3f',
      cancelColor: '#60646b',
      success: function (res) {
        if (res.confirm) {
          //TODO 删除事件
        }
      }
    })
  }


  let RightBtn = null
  switch (type) {
    case 'course':
      // RightBtn = <CustomButton value='班级同学' onSubmit={handleClickClazzMates} />
      RightBtn = null
      break;
    case 'custom':
      RightBtn = <CustomButton value='删除事件' type='danger' onSubmit={handleDeleteCustom} />
      break;
    case 'exam':
      RightBtn = <CustomButton value='自习教室' type='call' onSubmit={() => Taro.navigateTo({ url: '/pages/home/pages/empty-clazz-room/index' })} />
      break;
    default:
      break;
  }

  return (
    <AtFloatLayout
      isOpened={courseDetailIsOpened}
      className='courseDetailFloatLayout'
      onClose={CDFLOnClose}
    >
      <View className='courseDetailFloatLayout-header'>
        {(type === 'exam' ? '考试：' : '') + name}
        <View className='courseDetailFloatLayout-header-close' onClick={CDFLOnClose}>
          <AtIcon value='close' size={24} color='#60646b'></AtIcon>
        </View>
      </View>

      <View className='courseDetailFloatLayout-content'>
        {
          items.map((item, index) => (
            <View className='courseDetailFloatLayout-content-item' key={`thisis${index}`}>
              <Text>{item}</Text>
            </View>
          ))
        }
        {
          (type === 'course') &&
          <View className='courseDetailFloatLayout-detail'>
            <AtAccordion
              open={showDetail}
              onClick={() => setShowDetail(!showDetail)}
              title='详细信息'
              hasBorder={false}
            >
              <View className='courseDetailFloatLayout-detail-content'>
                {
                  detailItems.map((item, index) => (
                    <View className='courseDetailFloatLayout-content-item courseDetailFloatLayout-content-item_detail' key={`thisis${index}`}>
                      <Text>{item}</Text>
                    </View>
                  ))
                }
              </View>
            </AtAccordion>
          </View>
        }

        <View className='courseDetailFloatLayout-content-memo'>
          <View className='courseDetailFloatLayout-content-memo-title'>
            <Text>备忘录</Text>
            <Text className='courseDetailFloatLayout-content-memo-title_comment'>（提示：关闭弹窗自动保存）</Text>
          </View>

          <Textarea
            placeholder={type === 'course' ? '记录作业、课堂测试、考试要求等' : '记录该事件的其他信息'}
            className='courseDetailFloatLayout-content-memo-input'
            value={memo}
            maxlength={-1}
            placeholder-style='color:#ccc;'
            onInput={e => setMemo(e.detail.value)}
          />
        </View>

      </View>

      <View className='courseDetailFloatLayout-footer'>
        <View className='courseDetailFloatLayout-footer-btnBox'>
          {
            type === 'custom' &&
            <CustomButton value='修改事件' onSubmit={() => openCustomScheduleFL({ dayIndex, startTime: timeIndexes[0], courseType: timeIndexes.length, chosenWeeks: weekIndexes })} />
          }

        </View>
        <View className='courseDetailFloatLayout-footer_blank'></View>

        <View className='courseDetailFloatLayout-footer-btnBox'>
          {RightBtn}
        </View>

      </View>
    </AtFloatLayout>
  )
}
