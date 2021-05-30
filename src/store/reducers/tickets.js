/* eslint-disable import/no-anonymous-default-export */
import {
  CREATE_TICKET,
  //   UPDATE_TICKET,
  //   DELETE_TICKET,
} from '../actions/tickets';
import Ticket from '../../model/Ticket';

const initialState = {
  tickets: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_TICKET:
      const ticket = new Ticket(...action.payload);
      return {
        ...state,
        tickets: [...state.tickets, ticket],
      };

    default:
      return state;
  }
};
