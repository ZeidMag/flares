import './SingleComment.css';

const SingleComment = () => {
  return (
    <div className="ticket-container">
      <div className="comment-header d-flex">
        <h3>Author</h3>
        <h4>Type</h4>
      </div>
      <div className="comment-main">comment</div>
      <div className="comment-footer">Date</div>
    </div>
  );
};

export default SingleComment;
