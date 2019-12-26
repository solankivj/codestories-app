import React from 'react';
import { connect } from 'react-redux';
import { addLike, removeLike } from '../../store/actions/postActions';

const BeenThereBtn = ({likes, id, auth, removeLike, addLike}) => {
  const onClickLike = (likes, id) => {
    if (likes.filter((like) => like.user === auth.user.id).length > 0) {
      removeLike(id);
    } else {
      addLike(id);
    }
  };

  return (
    <button 
      className="been-there" 
      onClick={() => onClickLike(likes, id)}>
        Been There <span role="img">✋</span>
    </button>
  );
};

const mapStateToProps = (state) => ({
	auth: state.auth
});

export default connect(mapStateToProps, { addLike, removeLike })(BeenThereBtn);
