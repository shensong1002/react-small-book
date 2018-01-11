import React, { Component } from 'react'
import CommentInput from './components/CommentInput'
import CommentList from './components/CommentList'
import WrapWithLoadData from './common/WrapWithLoadData'
import styles from './CommentApp.less'
import PropTypes from 'prop-types'

class CommentApp extends Component {
  static propTypes = {
    data: PropTypes.any,
    saveData: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      comments: props.data // 评论数据
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
      this.props.saveData(comments)
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
    this.props.saveData(comments)
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

CommentApp = WrapWithLoadData(CommentApp, 'comments')
export default CommentApp
