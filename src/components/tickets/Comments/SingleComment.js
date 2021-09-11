import Moment from 'react-moment';
import './SingleComment.css';

const SingleComment = ({
  comment: { id, author, comment, createdAt, type },
}) => {
  return (
    <div className="ticket-container">
      {/* <button onClick={() => console.log(type)}>show comment</button> */}
      <div className="comment-header d-flex">
        <h3>{author.username}</h3>
        <h4>{type.type}</h4>
      </div>
      <div className="comment-main">{comment}</div>
      <Moment format="YYYY-MMM-DD hh:mm A">{createdAt}</Moment>
    </div>
  );
};

export default SingleComment;
