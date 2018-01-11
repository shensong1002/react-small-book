import React, { Component } from 'react'
import styles from './CommentInput.less'
import PropTypes from 'prop-types'

class CommentInput extends Component {
  static propTypes = {
    onSubmit: PropTypes.func
  }

  constructor() {
    super()
    this.state = {
      username: '', // 用户名
      content: '' // 评论内容
    }
  }

  // 组件挂载前从localStorage获取username
  componentWillMount() {
    const username = localStorage.getItem('username')
    if (username) {
      this.setState({
        username
      })
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

  handleSubmit() {
    const { username, content } = this.state

    if (!username.trim()) {
      alert('请输入用户名')
      return
    }
    // 用户名验证通过后，将用户名保存在localStorage中
    localStorage.setItem('username', username)

    if (!content.trim()) {
      alert('请输入评论内容')
      return
    }

    if (this.props.onSubmit) {
      const createTime = +new Date() // 记录创建时间
      this.props.onSubmit({ username, content, createTime })
    }

    this.setState({
      content: ''
    })
  }

  render() {
    return (
      <div className={styles['comment-input']}>
        <div className={styles['comment-field']}>
          <span className={styles['comment-field-name']}>用户名：</span>
          <div className={styles['comment-field-input']}>
            <input value={this.state.username} onChange={this.handleUsernameChange.bind(this)} />
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
