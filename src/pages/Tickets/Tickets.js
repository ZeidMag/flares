import './TicketItem';
import TicketItem from './TicketItem';
import { useSelector } from 'react-redux';
import './Tickets.css';

const Tickets = () => {
  const { tickets } = useSelector((state) => state.tickets);
  if (!tickets.length) {
    return <p>no tickets available</p>;
  }
  console.log(tickets[0]);
  return (
    <>
      <h1>All Tickets</h1>
      {tickets.map((ticket) => (
        <TicketItem
          key={ticket.id}
          subject={ticket.subject}
          status={ticket.status}
          description={ticket.description}
          createdAt={ticket.createdAt}
          zonesList={ticket.zonesList}
          owner={ticket.ownerId}
          id={ticket.id}
        />
      ))}
    </>
  );
};

export default Tickets;
