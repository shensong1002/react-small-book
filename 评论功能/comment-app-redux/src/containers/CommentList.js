import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import CommentList from '../components/CommentList'
import { initComments, deleteComment } from '../reducers/comments'

class CommentListContainer extends Component {
  static propTypes = {
    comments: PropTypes.array,
    initComments: PropTypes.func,
    onDeleteComment: PropTypes.func
  }

  componentWillMount() { // 初始化评论
    this._loadComments()
  }

  _loadComments() {
    let comments = localStorage.getItem('comments') // 从LocalStorage中加载评论
    comments = comments ? JSON.parse(comments) : []
    this.props.initComments(comments) // this.props.initComments是connect传进来的，可以帮我们把数据初始化到state里面去
  }

  handleDeleteComment(index) {
    const { comments } = this.props
    const newComments = [ // props是不能变的，所以这里新建一个删除了特定下标的评论列表
      ...comments.slice(0, index),
      ...comments.slice(index + 1)
    ]
    localStorage.setItem('comments', JSON.stringify(newComments)) // 保存最新的评论列表到LocalStorage
    if (this.props.onDeleteComment) { // this.props.onDeleteComment是connect传进来的，会dispatch一个action去删除评论
      this.props.onDeleteComment(index)
    }
  }

  render() {
    console.log(this.props.comments.length)
    return (
      <div>
        {
          this.props.comments.length ? <CommentList comments={this.props.comments} onDeleteComment={this.handleDeleteComment.bind(this)} /> : null
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => { // 评论列表从state.comments中获取
  return {
    comments: state.comments
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // 提供给CommentListContainer
    // 当从LocalStorage 加载评论列表以后就会通过这个方法
    // 把评论列表初始化到 state 当中
    initComments: (comments) => {
      dispatch(initComments(comments))
    },
    onDeleteComment: (commentIndex) => { // 删除评论
      dispatch(deleteComment(commentIndex))
    }
  }
}

// 将 CommentListContainer connect 到 store
// 会把 comments、initComments、onDeleteComment 传给 CommentListContainer
export default connect(mapStateToProps, mapDispatchToProps)(CommentListContainer)
