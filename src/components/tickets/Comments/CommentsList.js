import { useEffect } from 'react';
import SingleComment from './SingleComment';
import { useDispatch, useSelector } from 'react-redux';
import { getComments, clearComments } from '../../../store/actions/comments';
import { useParams } from 'react-router-dom';

const CommentsList = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { comments } = useSelector((state) => state.comments);
  useEffect(() => {
    dispatch(getComments(id));
    return () => {
      dispatch(clearComments());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  if (!comments.length) {
    return <h3>No comments Available</h3>;
  }

  return (
    <div>
      {comments.map((comment, i) => (
        <SingleComment key={i} comment={comment} />
      ))}
    </div>
  );
};

export default CommentsList;
