import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCommentType, createComment } from '../../../store/actions/comments';
import { useParams } from 'react-router-dom';

const CreateComment = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { commentType } = useSelector((state) => state.comments);
  useEffect(() => {
    if (!commentType.length) {
      dispatch(getCommentType());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const [text, setText] = useState(null);
  const [type, setType] = useState(null);

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleSelectChange = (event) => {
    setType(event.target.value);
  };

  const handleSubmit = () => {
    if (text == null || type == null) {
      return alert('Please fill out all fields');
    }
    const tempAuthorId = 2;
    const newComment = {
      ticketId: id,
      authorId: tempAuthorId,
      comment: text,
      typeId: parseInt(type),
      createdAt: new Date(),
    };
    dispatch(createComment(newComment));
  };

  return (
    <div>
      {/* <button onClick={() => console.log(commentType)}>
        show comment type
      </button> */}
      <textarea name="test" onChange={handleTextChange} />

      <select defaultValue="0" onChange={handleSelectChange}>
        <option value="0" hidden>
          Select
        </option>
        {commentType.length ? (
          commentType.map((commentType) => (
            <option key={commentType.id} value={commentType.id}>
              {commentType.type}
            </option>
          ))
        ) : (
          <option value="0" disabled>
            Error
          </option>
        )}
      </select>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default CreateComment;
