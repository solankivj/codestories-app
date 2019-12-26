import React from 'react';
import { connect } from 'react-redux';
import { addLike, removeLike } from '../../store/actions/postActions';

const BeenThereBtn = ({likes, id, auth, removeLike, addLike, fetchSingle}) => {
  const onClickLike = (likes, id) => {
    if (likes.filter((like) => like.user === auth.user.id).length > 0) {
      fetchSingle ? removeLike(id, fetchSingle) : removeLike(id);
    } else {
      fetchSingle ? addLike(id, fetchSingle) : addLike(id);
    }
  };

  return (
    <button 
      className="been-there" 
      onClick={() => onClickLike(likes, id)}>
        {Object.keys(likes).length > 0 ? `${Object.keys(likes).length} ` : ""}Been There <span role="img">🙌</span>
    </button>
  );
};

const mapStateToProps = (state) => ({
	auth: state.auth
});

export default connect(mapStateToProps, { addLike, removeLike })(BeenThereBtn);
