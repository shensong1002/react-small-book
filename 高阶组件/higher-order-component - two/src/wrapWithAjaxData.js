import React, { Component } from 'react'
import ajax from 'jquery'

export default (WrappedComponent) => {
    class NewComponent extends Component {
        constructor() {
            super()
            this.state = {
                data: null
            }
        }

        componentWillMount() {
            console.log('2.然后将获取Id作为参数传入ajax请求: ' + this.props.data)
            ajax.get('https://www.easy-mock.com/mock/5a547f03193247790fce43f6/data/username?userId=' + this.props.data, (data) => {
                this.setState({
                    data: data.username
                })
            })
        }

        render() {
            return <WrappedComponent data={this.state.data} />
        }
    }

    return NewComponent
}