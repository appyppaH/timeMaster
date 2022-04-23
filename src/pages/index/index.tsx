import React, { Component } from 'react'
import { connect } from 'react-redux'
// import PropTypes from 'prop-types'
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import Login from "./components/Login"
import { wxLogin, checkBinding } from "../../servers/servers"
import { login } from '../../actions/actions'
// import { useLogin } from "taro-hooks";

// type StateType = {
//     name: string;
//     number: number;
// };
type propType = {
    user: {
        isLogin: boolean,
        token: String
    };
    loginClick: Function;
};
class Index extends Component<any, propType> {
    constructor(props) {
        super(props)
    }

    componentWillMount() {
        // console.log(this.props)
        if (this.props.user.isLogin) {
            Taro.switchTab({ url: '/pages/home/index' })
            
        } else {
            console.log("未登录")
            Taro.switchTab({ url: '/pages/schedule/index' })
        }
    }
    toLogin = (username, password) => {
        Taro.login({
            success: (res) => {
                wxLogin(username, password, 1001, res.code).then((res) => {
                    if (res.data.errcode === 200) {
                        this.props.loginClick(res.data.token)
                        Taro.reLaunch({
                            url: '/pages/schedule/index'
                        })
                    } else {
                        Taro.atMessage({
                            'message': res.data.errmsg,
                            'type': 'warning',
                            duration: 2000,
                        })
                    }
                })
            }
        })
    }
    render() {
        return (
            <View>
                <Login fLogin={this.toLogin} />
            </View>
        )
    }
}
const mapStateToProps = (state) => {
    // console.log(state.user);//可持续更新
    return {
        user: state.user//组件AppContent的this.props.user始终为空
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loginClick: token => {
            dispatch(login(token))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Index);
// export default connect(mapStateToProps)(Index)