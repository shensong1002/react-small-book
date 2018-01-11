import React, { Component } from 'react';
import InputWithUserName from './InputWithUserName'

class App extends Component {
  handleSetUserId() {
    localStorage.setItem('userId', '434673370')
  }

  render() {
    return (
      <div className="App">
        用户名：<InputWithUserName />
        <button onClick={this.handleSetUserId.bind(this)}>设置用户id</button>
      </div>
    );
  }
}

export default App;
