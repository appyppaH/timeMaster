import React, { Component } from "react";
import { Provider } from 'react-redux'
import configStore from './store'
import "./app.scss";


const store = configStore()

class App extends Component {
  // this.props.children 是将要会渲染的页面
  render() {
    return (
      <Provider store={store}>
        {this.props.children}
      </Provider>
    );
  }
}

export default App;
