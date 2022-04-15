/* eslint-disable import/prefer-default-export */
import HTTPREQUEST from "./http"
import Taro from '@tarojs/taro'


export function checkBinding(code) {
  Taro.showLoading({
    title: '检查当前微信是否绑定账户',
    mask: true
  })
  return HTTPREQUEST.post("wxmini/checkBinding", { code })
}

export function wxLogin(username, password, type, code) {
  Taro.showLoading({
    title: '登录中，请稍后',
    mask: true
  })
  return HTTPREQUEST.post("wxmini/login", { userName: username, password: password, type: type, code: code })
}

export function notice(kcmc, sksj, skdd, skls, tx) {
  return HTTPREQUEST.post("wxmini/notice", { kcmc: kcmc, sksj: sksj, skdd: skdd, skls: skls, tx: tx })
}

export function getUserName() {
  return HTTPREQUEST.get('wxmini/username')
}
export function getPages() {
  return HTTPREQUEST.get('wxmini/pages')
}

export function getSchedule(startTime, endTime) {
  Taro.showLoading({
    title: '加载中',
  })
  return HTTPREQUEST.post('schedule', { startTime: startTime, endTime: endTime })
}

export function getCalendar(value) {
  Taro.showLoading({
    title: '加载中',
  })
  if (value === "year") {
    return HTTPREQUEST.post('calendar', { status: "Year" })
  } else if (value === "bus") {
    return HTTPREQUEST.post('calendar', { status: "Bus" })
  } else {
    console.log("getCalendar:参数出错：", value)
  }
}

export function getAllScores() {
  Taro.showLoading({
    title: '加载中',
  })
  return HTTPREQUEST.get('student/scores')
}

export function getScoreMeta() {
  return HTTPREQUEST.get('student/score/meta')
}

export function getEmptyClassroom(campus, date, starttime, endtime) {
  Taro.showLoading({
    title: '查询时间约15s',
  })

  return HTTPREQUEST.post('emptyRoom', { campus: campus + '校区', time: date + '-' + date, lesson: starttime + '-' + endtime })
}

