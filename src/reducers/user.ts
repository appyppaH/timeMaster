import Taro from "@tarojs/taro"
import { LOGIN } from "../actions/actions";

const INITIAL_STATE = {
    isLogin: Taro.getStorageSync("isLogin")||false,
    token: Taro.getStorageSync("Authorization")||"",
}

export default function counter(state = INITIAL_STATE, action) {
    switch (action.type) {
        case LOGIN:
            return Object.assign({}, state, { 'isLogin': true, 'token': action.payload })
        default:
            return { state }
    }
}