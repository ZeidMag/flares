import { useEffect } from 'react';
import TicketItem from './TicketItem';
import { useSelector, useDispatch } from 'react-redux';
import { getTickets } from '../../store/actions/tickets';
import './Tickets.css';
import './TicketItem';

const Tickets = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTickets());
  }, [dispatch]);
  const { tickets } = useSelector((state) => state.tickets);
  if (!tickets.length) {
    return (
      <>
        <p>no tickets available</p>;
      </>
    );
  }

  return (
    <>
      <h1>All Tickets</h1>
      <button onClick={() => console.log(tickets)}>show tickets</button>
      {tickets.length &&
        tickets.map((ticket) => (
          <TicketItem
            key={ticket.id}
            id={ticket.id}
            subject={ticket.subject}
            status={ticket.status}
            priority={ticket.priority}
            type={ticket.type}
            description={ticket.description}
            createdAt={ticket.createdAt}
            flaresList={ticket.flare}
            zonesList={ticket.zone}
            owner={ticket.owner.username}
          />
        ))}
    </>
  );
};

export default Tickets;
