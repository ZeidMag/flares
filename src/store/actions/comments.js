import axios from 'axios';
export const GET_COMMENTS = 'GET_COMMENTS';
export const CREATE_COMMENT = 'CREATE_COMMENT';
export const GET_COMMENT_TYPE = 'GET_COMMENT_TYPE';
export const CLEAR_COMMENTS = 'CLEAR_COMMENTS';

export const getComments = (ticketId) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/v1/comment/${ticketId}`
      );
      dispatch({
        type: GET_COMMENTS,
        payload: response.data.data,
      });
    } catch (error) {
      // TODO, some error handling
      console.log(error);
    }
  };
};

export const getCommentType = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        'http://localhost:5000/api/v1/comment/type'
      );
      dispatch({
        type: GET_COMMENT_TYPE,
        payload: response.data.data,
      });
    } catch (error) {
      // TODO, some error handling
      console.log(error);
    }
  };
};

export const createComment = (comment) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        'http://localhost:5000/api/v1/comment',
        { comment }
      );
      dispatch({
        type: CREATE_COMMENT,
        payload: response.data.data,
      });
    } catch (error) {
      // TODO, some error handling
      console.log(error);
    }
  };
};

export const clearComments = () => {
  return {
    type: CLEAR_COMMENTS,
  };
};
