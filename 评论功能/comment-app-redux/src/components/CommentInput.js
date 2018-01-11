import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from './CommentInput.less'

class CommentInput extends Component {
  static propTypes = {
    username: PropTypes.any,
    onSubmit: PropTypes.func,
    onUserNameInputBlur: PropTypes.func
  }

  static defaultProps = {
    username: ''
  }

  constructor(props) {
    super(props)
    this.state = {
      username: props.username,
      content: ''
    }
  }

  // 组件挂载后让textarea聚焦
  componentDidMount() {
    this.textarea.focus()
  }

  handleUsernameChange(event) {
    this.setState({
      username: event.target.value
    })
  }

  handleContentChange(event) {
    this.setState({
      content: event.target.value
    })
  }

  handleUsernameBlur(event) {
    if (this.props.onUserNameInputBlur) {
      this.props.onUserNameInputBlur(event.target.value)
    }
  }

  handleSubmit() {
    if (this.props.onSubmit) {
      this.props.onSubmit({
        username: this.state.username,
        content: this.state.content,
        createdTime: +new Date()
      })
    }
    this.setState({ content: '' })
  }

  render() {
    return (
      <div className={styles['comment-input']}>
        <div className={styles['comment-field']}>
          <span className={styles['comment-field-name']}>用户名：</span>
          <div className={styles['comment-field-input']}>
            <input value={this.state.username} onChange={this.handleUsernameChange.bind(this)} onBlur={this.handleUsernameBlur.bind(this)} />
          </div>
        </div>
        <div className={styles['comment-field']}>
          <span className={styles['comment-field-name']}>评论内容：</span>
          <div className={styles['comment-field-input']}>
            <textarea value={this.state.content} onChange={this.handleContentChange.bind(this)} ref={(textarea) => { this.textarea = textarea }} />
          </div>
        </div>
        <div className={styles['comment-field-button']}>
          <button onClick={this.handleSubmit.bind(this)}>发布</button>
        </div>
      </div>
    )
  }
}

export default CommentInput
