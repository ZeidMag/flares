import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import MapContainer from '../../components/map/Map';
import { Marker } from '@react-google-maps/api';
import { getTickets, getStatusPriorityType } from '../../store/actions/tickets';
import { countBy } from 'lodash';
import Comment from '../../components/tickets/Comments/SingleComment';

import './SingleTicket.css';
import '../Tickets/TicketItem.css';

const SingleTicket = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { tickets, ticketStatus, ticketPriority, ticketType } = useSelector(
    (state) => state.tickets
  );
  const { id } = useParams();
  const ticket = tickets.find((ticket) => ticket.id.toString() === id);
  useEffect(() => {
    if (!tickets.length) {
      dispatch(getTickets());
    }
  }, [tickets, dispatch]);

  useEffect(() => {
    if (!ticketStatus.length || !ticketPriority.length || !ticketType.length) {
      dispatch(getStatusPriorityType());
    }
  }, [ticketStatus, ticketPriority, ticketType, dispatch]);

  if (!ticket) return <p>no ticket, maybe incorrect id?</p>;

  const { subject, description, status, priority, type, owner, createdAt } =
    ticket;

  // Extract and combine flares & zones to obtain list of zones with flare count
  const zonesList = ticket.zone;
  const flareList = ticket.flare;
  const zonesInFlares = countBy(flareList, 'zoneId');

  const zoneListWithCount = zonesList.map((zone) => ({
    ...zone,
    count: zonesInFlares[zone.id],
  }));
  //////////////////////////////////////////////////////////////////////////////

  const toggleModal = () => {
    setIsModalOpen((prevState) => !prevState);
  };

  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  return (
    <>
      <button onClick={() => console.log(ticketStatus)}>show status</button>
      <button onClick={() => console.log(ticketPriority)}>show priority</button>
      <button onClick={() => console.log(ticketType)}>show type</button>
      <button onClick={() => console.log(ticket)}>show ticket</button>
      <h1>Single Ticket</h1>
      <MapContainer
        center={{ lat: zonesList[0].latitude, lng: zonesList[0].longitude }}
      >
        {zoneListWithCount.map((zone, i) => (
          <Marker
            key={i}
            position={{ lat: zone.latitude, lng: zone.longitude }}
            label={{
              color: 'hsl(240, 100%, 80%)',
              fontWeight: 'bold',
              fontSize: '1.5rem',
              text: `${zone.count}`,
            }}
            icon={{
              path: 'M8 12l-4.7023 2.4721.898-5.236L.3916 5.5279l5.2574-.764L8 0l2.3511 4.764 5.2574.7639-3.8043 3.7082.898 5.236z',
              fillColor: 'hsl(240, 100%, 97%)',
              fillOpacity: 0.9,
              scale: 2,
              strokeColor: 'hsl(240, 40%, 60%)',
              strokeWeight: 2,
            }}
          ></Marker>
        ))}
      </MapContainer>
      <div className="ticket-container">
        <div className="ticket-header">
          <div>
            <h2>{subject}</h2>
            <h6>{owner.username}</h6>
          </div>
          <div className="ticket-status">
            <h5 className={`ticket-status-${status.id}`} onClick={toggleModal}>
              {status.status}
            </h5>
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
          <div className="ticket-zones d-flex">
            <h4>Zones:</h4>
          </div>
          <div className="ticket-creation-date">
            <h6>{new Date(createdAt).toISOString().substring(0, 10)}</h6>
          </div>
        </div>
      </div>
      <Comment />
      <h3>
        <Link to="/tickets">Go back to All Tickets</Link>
      </h3>
      <div
        className={`status-modal-container ${!isModalOpen && 'remove-element'}`}
        onClick={toggleModal}
      >
        <div className="status-modal" onClick={stopPropagation}>
          <h2>change status</h2>
          <ul className="status-list">
            {/* change status immediately by updating ticket row and insert new row in comment table describing old and new status */}
            <li onClick={() => {}}>New</li>
            <li onClick={() => {}}>Open</li>
            <li onClick={() => {}}>Closed</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default SingleTicket;
