/* eslint-disable import/no-anonymous-default-export */
import {
  CREATE_TICKET,
  GET_TICKETS,
  ADD_COMMENT,
  //   UPDATE_TICKET,
  //   DELETE_TICKET,
  GET_TICKET_STATUS_PRIORITY_TYPE,
} from '../actions/tickets';
// import Ticket from '../../model/Ticket';

const initialState = {
  tickets: [],
  ticketStatus: [],
  ticketPriority: [],
  ticketType: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_TICKETS:
      return {
        ...state,
        tickets: action.payload,
      };
    case CREATE_TICKET:
      // const ticket = new Ticket(...action.payload);
      return {
        ...state,
        // tickets: [...state.tickets, ticket],
        tickets: action.payload,
      };
    case ADD_COMMENT:
      const updateTickets = state.tickets.map((ticket) => {
        if (ticket.id === action.ticketId) {
          ticket.commentsList.push(action.payload);
        }
        return ticket;
      });
      return {
        ...state,
        tickets: [...updateTickets],
      };
    case GET_TICKET_STATUS_PRIORITY_TYPE:
      return {
        ...state,
        ticketStatus: action.payload.status,
        ticketPriority: action.payload.priority,
        ticketType: action.payload.type,
      };
    default:
      return state;
  }
};
