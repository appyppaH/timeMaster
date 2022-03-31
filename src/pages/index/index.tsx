import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { useLogin } from "taro-hooks";

// type StateType = {
//     name: string;
//     number: number;
// };
type propType = {
    user: {
        isLogin: boolean,
        token: String
    };
};
class Index extends Component<any, propType> {
    constructor(props) {
        super(props)
    }
    static propTypes = {
        data: PropTypes.object.isRequired,
    }
    componentWillMount() {
        console.log("初始页挂载")
        if (this.props.user.isLogin) {
            Taro.switchTab({ url: '/pages/home/index' })
        }else{
            Taro.switchTab({ url: '/pages/home/index' })
        }
    }
    render() {
        return (
            <View>
                <View>dwadaw</View>
                {/* <Login fLogin={this.toLogin}></Login> */}
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

// export default connect(mapStateToProps , mapDispatchToProps)(Login);
export default connect(mapStateToProps)(Index)