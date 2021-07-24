import axios from 'axios';
import { updateFlares } from '../actions/flare';

export const GET_TICKETS = 'GET_TICKETS';
export const CREATE_TICKET = 'CREATE_TICKET';
export const UPDATE_TICKET = 'UPDATE_TICKET';
export const DELETE_TICKET = 'DELETE_TICKET';
export const ADD_COMMENT = 'ADD_COMMENT';
export const GET_TICKET_STATUS_PRIORITY_TYPE =
  'GET_TICKET_STATUS_PRIORITY_TYPE';

export const getTickets = () => {
  return async (dispatch) => {
    const response = await axios.get('http://localhost:5000/api/v1/ticket/');
    if (response && response.data.success) {
      dispatch({
        type: GET_TICKETS,
        payload: response.data.data,
      });
    }
  };
};

export const createTicket = (ticket) => {
  return async (dispatch) => {
    const tempStatus = 1;
    const tempOwnerId = 2;
    const response = await axios.post('http://localhost:5000/api/v1/ticket/', {
      ticket: {
        ownerId: tempOwnerId,
        resolverId: null,
        subject: ticket.subject,
        description: ticket.description,
        createdAt: new Date(),
        closedAt: null,
        statusId: tempStatus,
      },
      flareList: ticket.flareIdsList,
      zoneList: ticket.zoneIdsList,
    });
    if (response && response.data.success) {
      console.log('create ticket succeeded');
      return dispatch(updateFlares(response.data.data));
    }
    console.log(response);
  };
};

export const updateTicket = (ticket) => {
  return {
    type: UPDATE_TICKET,
    payload: ticket,
  };
};

export const deleteTicket = (ticketId) => {
  return {
    type: DELETE_TICKET,
    payload: ticketId,
  };
};

export const addComment = (ticketId, comment) => {
  return {
    type: ADD_COMMENT,
    ticketId,
    payload: comment,
  };
};

export const getStatusPriorityType = () => {
  return async (dispatch) => {
    const response = await axios.get(
      'http://localhost:5000/api/v1/ticket/status-priority-type'
    );
    if (response && response.data.success) {
      dispatch({
        type: GET_TICKET_STATUS_PRIORITY_TYPE,
        payload: response.data.data,
      });
    }
  };
};
