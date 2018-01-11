import React, { Component } from 'react'
import WrapWithLoadData from './WrapWithLoadData'

class TextareaWithContent extends Component {
    render() {
        return (
            <textarea value={this.props.data} style={{width:'100px', height:'50px'}} />
        )
    }
}

TextareaWithContent = WrapWithLoadData(TextareaWithContent, 'content')

export default TextareaWithContent
