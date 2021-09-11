import {
  GET_COMMENTS,
  CREATE_COMMENT,
  GET_COMMENT_TYPE,
  CLEAR_COMMENTS,
} from '../actions/comments';

const initialState = {
  comments: [],
  commentType: [],
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_COMMENTS:
      return {
        ...state,
        comments: action.payload,
      };
    case GET_COMMENT_TYPE:
      return {
        ...state,
        commentType: action.payload,
      };
    case CREATE_COMMENT:
      return {
        ...state,
        comments: action.payload,
      };
    case CLEAR_COMMENTS:
      return {
        ...state,
        comments: [],
      };
    default:
      return state;
  }
};
