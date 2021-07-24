import { Link } from 'react-router-dom';
import './TicketItem.css';

const TicketItem = ({
  id,
  subject,
  description,
  status,
  priority,
  type,
  owner,
  createdAt,
  flaresList,
  zonesList,
}) => {
  return (
    <div className="ticket-container">
      <div className="ticket-header">
        <div>
          <h2>
            <Link to={`/single-ticket/${id}`}>{subject}</Link>
          </h2>
          <h6>{owner}</h6>
        </div>
        <div className="ticket-status">
          <h5 className={`ticket-status-${status.id}`}>{status.status}</h5>
          <h5 className={`ticket-priority-${priority.id}`}>
            {priority.priority}
          </h5>
          <h5 className={`ticket-type-${type.id}`}>{type.type}</h5>
        </div>
      </div>
      <div className="ticket-description">
        <p>{description}</p>
      </div>
      <div className="ticket-footer">
        <div className="ticket-zones">
          <h4># Flares:{flaresList.length}</h4>
          <h4># Zones:{zonesList.length}</h4>
          {/* <ul>
            {zonesList.map((zone, i) => (
              <li key={i}>
                {zone.lat}, {zone.lng} ({zone.count})
              </li>
            ))}
          </ul> */}
        </div>
        <div className="ticket-creation-date">
          <h6>{new Date(createdAt).toISOString().substring(0, 10)}</h6>
        </div>
      </div>
    </div>
  );
};

export default TicketItem;
