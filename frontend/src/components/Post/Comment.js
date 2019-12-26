import React from 'react';
import { connect } from 'react-redux';

const Comment = ({ comment }) => {
  return (
    <div className="comment">
      <span className="author">#1816 commented</span>
      <p className="message">{comment.text}</p>
      <span className="created-at">10.03.17 03:45pm</span>
    </div>
  );
}

const mapStateToProps = (state) => ({
	auth: state.auth
});

export default connect(mapStateToProps, { })(Comment);