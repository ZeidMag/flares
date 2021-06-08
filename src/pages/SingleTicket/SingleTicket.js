import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import MapContainer from '../../components/map/Map';
import { Marker } from '@react-google-maps/api';
import { addComment } from '../../store/actions/tickets';

import './SingleTicket.css';
const user = 'Zeid';

const SingleTicket = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ticketStatus, setTicketStatus] = useState('');

  const [comment, setComment] = useState('');
  const { tickets } = useSelector((state) => state.tickets);
  const { id } = useParams();
  const ticket = tickets.find((ticket) => ticket.id === id);
  const {
    subject,
    ownerId,
    status,
    description,
    zonesList,
    createdAt,
    commentsList,
  } = ticket;
  useEffect(() => {
    if (status) {
      setTicketStatus(status);
    }
  }, [status]);

  if (!ticket) return <p>no ticket, maybe incorrect id?</p>;
  const handleAddComment = () => {
    dispatch(addComment(id, { user, date: new Date(), body: comment }));
    setComment('');
  };

  const toggleModal = () => {
    setIsModalOpen((prevState) => !prevState);
  };

  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  const changeStatus = (status) => {
    setTicketStatus(status);
    toggleModal();
  };

  return (
    <>
      <h1>Single Ticket</h1>
      <MapContainer center={{ lat: zonesList[0].lat, lng: zonesList[0].lng }}>
        {zonesList.map((zone, i) => (
          <Marker
            key={i}
            position={{ lat: zone.lat, lng: zone.lng }}
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
            <h6>{ownerId}</h6>
          </div>
          <div className="ticket-status">
            <h5
              className={
                ticketStatus === 'new'
                  ? 'ticket-new'
                  : ticketStatus === 'open'
                  ? 'ticket-open'
                  : 'ticket-closed'
              }
              onClick={toggleModal}
            >
              {ticketStatus}
            </h5>
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
      <div className="comments-list-container">
        {commentsList.length
          ? commentsList.map((comment, i) => (
              <div key={i}>
                <h1>{comment.user}</h1>
                <h6>
                  added on:
                  {new Date(comment.date).toISOString().substring(0, 10)}
                </h6>
                <p>{comment.body}</p>
              </div>
            ))
          : ''}
      </div>
      <div className="add-comment-container">
        <input
          type="text"
          name="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button onClick={handleAddComment}>add comment</button>
      </div>
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
            <li onClick={changeStatus.bind(this, 'new')}>New</li>
            <li onClick={changeStatus.bind(this, 'open')}>Open</li>
            <li onClick={changeStatus.bind(this, 'closed')}>Closed</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default SingleTicket;
