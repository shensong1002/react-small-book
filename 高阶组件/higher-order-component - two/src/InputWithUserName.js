import React, { Component } from 'react'
import WrapWithLoadData from './WrapWithLoadData'
import wrapWithAjaxData from './wrapWithAjaxData'

class InputWithUserName extends Component {
    render() {
        if(this.props.data) {
            console.log('3.最后将获取到的用户名，通过props传递给InputWithUserName组件：' + this.props.data)
        }

        return (
            <input value={this.props.data || ''} />
        )
    }
}

InputWithUserName = wrapWithAjaxData(InputWithUserName)
InputWithUserName = WrapWithLoadData(InputWithUserName, 'userId')

export default InputWithUserName
