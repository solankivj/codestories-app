import React from 'react';
import { connect } from 'react-redux';
import format from 'date-fns/format'

const Comment = ({ comment }) => {
  return (
    <div className="comment">
      <span className="author">#1816 commented</span>
      <p className="message">{comment.text}</p>
      <span className="created-at">
        {format(new Date(comment.createdAt), "dd.MM.yy h:mm aa")}
      </span>
    </div>
  );
}

const mapStateToProps = (state) => ({
	auth: state.auth
});

export default connect(mapStateToProps, { })(Comment);
