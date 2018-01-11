import React, { Component } from 'react'
import styles from './Comment.less'
import timeFormat from '../util/timeFormat'
import PropTypes from 'prop-types'

class Comment extends Component {
  // 组件参数prop验证
  static propTypes = {
    comment: PropTypes.object.isRequired
  }

  constructor() {
    super()
    this.state = {
      startTime: +new Date()
    }
  }

  // 组件挂在前安装定时器
  componentWillMount() {
    this.timer = setInterval(() => {
      this.setState({
        startTime: +new Date()
      })
    }, 5000)
  }

  handleDelete() {
    if(this.props.onDelete) {
      this.props.onDelete(this.props.comment)
    }
  }

  // 组件销毁前清除浏览器
  componentWillUnmount() {
    clearInterval(this.timer)
  }

  render() {
    const { comment } = this.props
    const { startTime } = this.state
    const timeInterval = timeFormat(comment.createTime, startTime)

    let content = comment.content
    const re = /(`)(.+?)(`)/g
    let newContent = content.replace(re, function($0, $1, $2) {
      return `<code>${$2}</code>`
    })

    return (
      <div className={styles['comment']}>
        <div className={styles['comment-user']}>
          <span>{comment.username}</span>：
        </div>
        <p className={styles['comment-content']} dangerouslySetInnerHTML={{__html: newContent}} />
        <span className={styles['comment-time']}>{`${timeInterval}前`}</span>
        <span className={styles['comment-delete']} onClick={this.handleDelete.bind(this)}>删除</span>
      </div>
    )
  }
}

export default Comment
