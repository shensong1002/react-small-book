import React, { Component } from 'react'

export default (WrappedComponent, name) => {
    class NewComponent extends Component {
        constructor() {
            super()
            this.state = {
                data: null
            }
        }

        componentWillMount() {
            const data = localStorage.getItem(name)
            console.log('1.先从本地localStorage获取用户Id: ' + data)
            this.setState({
                data
            })
        }

        render() {
            return <WrappedComponent data={this.state.data} />
        }
    }

    return NewComponent
}