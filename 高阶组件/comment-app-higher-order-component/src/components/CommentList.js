import React, { Component } from 'react'
import Comment from './Comment'
import styles from './CommentList.less'
import PropTypes from 'prop-types'

class CommentList extends Component {
  static propTypes = {
    comments: PropTypes.array.isRequired
  }

  static defaultProps = {
    comments: []
  }

  render() {
    const { comments, onDelete } = this.props
    return (
      <div className={styles['comment-list']}>
        {comments.map((comment, index) => <Comment comment={comment} onDelete={onDelete} key={index} />)}
      </div>
    )
  }
}

export default CommentList
