import React, { Component } from 'react';
import InputWithUserName from './InputWithUserName'
import TextareaWithContent from './TextareaWithContent'

class App extends Component {
  handleSetUsername() {
    localStorage.setItem('username', 'shensong')
  }

  handleSetContent() {
    localStorage.setItem('content', '大家好，我是内容！')
  }

  render() {
    return (
      <div className="App">
        用户名：<InputWithUserName />
        内容：<TextareaWithContent />
        <div>
          <button onClick={this.handleSetUsername.bind(this)}>设置username</button>
        </div>
        <br/>
        <div>
          <button onClick={this.handleSetContent.bind(this)}>设置content</button>
        </div>
      </div>
    );
  }
}

export default App;
