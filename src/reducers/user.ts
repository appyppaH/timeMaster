import Taro from "@tarojs/taro"
import { LOGIN } from "../actions/actions";

const INITIAL_STATE = {
    isLogin: Taro.getStorageSync("isLogin") || false,
    Authorization: Taro.getStorageSync("Authorization") || "",
}

export default function counter(state = INITIAL_STATE, action) {
    switch (action.type) {
        case LOGIN:
            Taro.setStorageSync("isLogin", true)
            Taro.setStorageSync('Authorization', action.payload)
            return Object.assign({}, state, { 'isLogin': true, 'Authorization': action.payload })
        default:
            return { state }
    }
}