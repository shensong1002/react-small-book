import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import CommentInput from './CommentInput'
import CommentList from './CommentList'
import styles from './CommentApp.less'

class CommentApp extends Component {
  static propTypes = {
    comments: PropTypes.array
  }

  render() {
    return (
      <div className={styles.wrapper}>
        <CommentInput />
        <CommentList />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    comments: state.comments
  }
}

export default connect(mapStateToProps)(CommentApp)
