import React, { Component } from 'react'
import CommentInput from './components/CommentInput'
import CommentList from './components/CommentList'
import styles from './CommentApp.less'

class CommentApp extends Component {
  constructor() {
    super()
    this.state = {
      comments: [] // 评论数据
    }
  }

  // 组件挂在前从localStorage中获取comments数据
  componentWillMount() {
    const comments = JSON.parse(localStorage.getItem('comments')) || []
    this.setState({
      comments
    })
  }

  handleSubmitComment(comment) {
    this.setState((prevState) => {
      const comments = prevState.comments
      comments.push(comment)
      localStorage.setItem('comments', JSON.stringify(comments))
      return {
        comments
      }
    })
  }

  handleDeleteComment(comment, index) {
    let { comments } = this.state
    comments = comments.filter((item, index) => {
      return item.createTime !== comment.createTime
    })
    localStorage.setItem('comments', JSON.stringify(comments))
    this.setState({
      comments
    })
  }

  render() {
    return (
      <div className={styles.wrapper}>
        <CommentInput onSubmit={this.handleSubmitComment.bind(this)} />
        {
          this.state.comments.length ? <CommentList comments={this.state.comments} onDelete={this.handleDeleteComment.bind(this)} /> : null
        }
      </div>
    )
  }
}

export default CommentApp
