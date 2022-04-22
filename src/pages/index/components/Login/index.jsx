import React, { Component,useState }  from 'react'
import Taro from "@tarojs/taro"
import { View, Text, Input, Picker, Button } from '@tarojs/components'
import { AtMessage, AtList, AtListItem } from 'taro-ui'

import IconFont from '../../../../components/iconfont'
import StandardFloatLayout from '../../../../components/StandardFloatLayout'


import "./Index.scss"


export default function Login(props) {
   
    const [userName, setuserName] = useState("")
    const [passWord, setpassWord] = useState("")
    const [showPwd, setshowPwd] = useState(false)
    const [inputInfo,setInputInfo] = useState("请输入学号")
    const [showPwdHelp, setshowPwdHelp] = useState(false)
    const [showLoginHelp, setshowLoginHelp] = useState(false)


    const submitHandleClick = () => {
        if (!userName || !passWord) {
            Taro.atMessage({
                'message': `请填写${!userName ? inputInfo : '密码'}`,
                'type': 'warning',
                duration: 2000,
            })
            return null
        }
        props.fLogin(userName,passWord)
    }

    return (
        <View className='login'>
            <View className='login-header'>
                <View className='login-header-title'>
                    登录
                </View>
                <Text className='login-header-secondary'>请绑定教务系统账号</Text>
            </View>

            <View className='login-content'>
                <View className='login-content-item'>
                    <Input
                      className='login-content-item-input'
                      type='number'
                      border={false}
                      placeholder={inputInfo}
                      placeholder-style='color:#ccc;'
                      value={userName}
                      onInput={(e) => setuserName(e.detail.value)}
                    />
                </View>

                <View className='login-content-item'>
                    <Input
                      className='login-content-item-input'
                      password={!showPwd}
                      border={false}
                      placeholder='请输入统一认证密码'
                      placeholder-style='color:#ccc;'
                      value={passWord}
                      onInput={(e) => setpassWord(e.detail.value)}
                    />
                    
                    <View
                      className='login-content-item-icon'
                      onClick={() => setshowPwd(!showPwd)}
                    >
                        {
                            showPwd ?
                                <IconFont name='eyes_close' size={46} color='#60646b' />
                                :
                                <IconFont name='Eyes' size={46} color='#60646b' />
                        }
                    </View>

                </View>

                <View className='login-content-pwdHelp' onClick={() => setshowPwdHelp(true)}>
                    遇到问题
                </View>

                <Button
                  className='relative-circle-button login-content-submit'
                  openType='getUserInfo'
                  onGetUserInfo={() => submitHandleClick()}
                >登录</Button>

            </View>


            <View className='login-footer footer' onClick={() => setshowLoginHelp(true)}>
                关于这个
                </View>


            <AtMessage />

            <StandardFloatLayout
              isOpened={showLoginHelp}
              onClose={() => setshowLoginHelp(false)}
              title='河大智慧教务'
              content={` 功能：成绩查询、空教室查询、图书馆检索、课程/教师、查看全校课表、自定义课程颜色、情侣课表等特色功能~`}
            />

            <StandardFloatLayout
              isOpened={showPwdHelp}
              onClose={() => setshowPwdHelp( false )}
                title='遇到问题'
                content={`
                        忘记密码：\n
                        这是你的教务系统密码，21级新生默认为身份证后六位+@hbu\n
                        （例如：身份证后六位为：98721X，则密码为：98721X@hbu。）\n
                        如果你自己修改了密码且忘记了该密码，请前往PC端教务（信息门户-本科教务）修改新密码。\n
                        前往PC端教务（信息门户-本科教务）修改新密码，使用新密码登录即可~
                        `}
                buttons={[{
                    value: '联系客服解决',
                    openType: 'contact',
                }]}
            />
        </View>
    )
}

