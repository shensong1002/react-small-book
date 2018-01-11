import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from './Comment.less'

class Comment extends Component {
  // 组件参数prop验证
  static propTypes = {
    comment: PropTypes.object.isRequired,
    onDeleteComment: PropTypes.func,
    index: PropTypes.number
  }

  constructor() {
    super()
    this.state = {
      timeString: ''
    }
  }

  // 组件挂在前安装定时器
  componentWillMount() {
    this._updateTimeString()
    this._timer = setInterval(this._updateTimeString.bind(this), 5000)
  }

  componentWillUnmount() {
    clearInterval(this._timer)
  }

  _updateTimeString() {
    const comment = this.props.comment
    const duration = (+Date.now() - comment.createdTime) / 1000
    this.setState({
      timeString: duration > 60
        ? `${Math.round(duration / 60)} 分钟前`
        : `${Math.round(Math.max(duration, 1))} 秒前`
    })
  }

  _getProcessedContent(content) {
    return content
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;")
      .replace(/`([\S\s]+?)`/g, '<code>$1</code>')
  }

  handleDeleteComment() {
    if (this.props.onDeleteComment) {
      this.props.onDeleteComment(this.props.index)
    }
  }

  render() {
    const comment = this.props.comment
    return (
      <div className={styles['comment']}>
        <div className={styles['comment-user']}>
          <span>{comment.username}</span>：
        </div>
        <p className={styles['comment-content']} dangerouslySetInnerHTML={{ __html: this._getProcessedContent(comment.content) }} />
        <span className={styles['comment-time']}>{this.state.timeString}</span>
        <span className={styles['comment-delete']} onClick={this.handleDeleteComment.bind(this)}>删除</span>
      </div>
    )
  }
}

export default Comment
