import { Link } from 'react-router-dom';
import './TicketItem.css';

const TicketItem = ({
  id,
  subject,
  description,
  zonesList,
  status,
  ownerId,
  createdAt,
}) => {
  return (
    <div className="ticket-container">
      <div className="ticket-header">
        <div>
          <h2>
            <Link to={`/single-ticket/${id}`}>{subject}</Link>
          </h2>
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
            {zonesList.map((zone, i) => (
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
  );
};

export default TicketItem;
