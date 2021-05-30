export const CREATE_TICKET = 'CREATE_TICKET';
export const UPDATE_TICKET = 'UPDATE_TICKET';
export const DELETE_TICKET = 'DELETE_TICKET';

export const createTicket = (ticket) => {
  return {
    type: CREATE_TICKET,
    payload: ticket,
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
