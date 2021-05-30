import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './SingleTicket.css';

const SingleTicket = () => {
  const { tickets } = useSelector((state) => state.tickets);
  const { id } = useParams();
  const ticket = tickets.filter((ticket) => ticket.id === id);

  if (!ticket.length) return <p>no ticket, maybe incorrect id?</p>;
  const { subject, ownerId, status, description, zonesList, createdAt } =
    ticket[0];
  return (
    <>
      <h1>Single Ticket</h1>
      <div className="ticket-container">
        <div className="ticket-header">
          <div>
            <h2>{subject}</h2>
            <h6>{ownerId}</h6>
          </div>
          <div className="ticket-status">
            <h5 className="ticket-new">{status}</h5>
          </div>
        </div>
        <div className="ticket-description">
          <p>{description}</p>
        </div>
        <div className="ticket-footer">
          <div className="ticket-zones d-flex">
            <h4>Zones:</h4>
            <ul>
              {zonesList?.map((zone, i) => (
                <li key={i}>
                  {zone.lat}, {zone.lng} ({zone.count})
                </li>
              ))}
            </ul>
          </div>
          <div className="ticket-creation-date">
            <h6>{new Date(createdAt).toISOString().substring(0, 10)}</h6>
          </div>
        </div>
      </div>
      <h3>
        <Link to="/tickets">Go back to All Tickets</Link>
      </h3>
    </>
  );
};

export default SingleTicket;
