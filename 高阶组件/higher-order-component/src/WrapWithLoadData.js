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