import { useState, useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  createTicket,
  getStatusPriorityType,
} from '../../../store/actions/tickets';
import FlareListItem from '../../map/common/FlareListItem';

const CreateTicket = ({ selectedFlares, setSelectedFlares }) => {
  const dispatch = useDispatch();
  const { ticketPriority, ticketType } = useSelector((state) => state.tickets);
  useEffect(() => {
    if (!ticketPriority.length || !ticketType.length) {
      dispatch(getStatusPriorityType());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [priorityId, setPriorityId] = useState(0);
  const [typeId, setTypeId] = useState(0);

  const handleTypeChange = (event) => {
    setTypeId(event.target.value);
  };
  const handlePriorityChange = (event) => {
    setPriorityId(event.target.value);
  };

  const resetSelectedZones = () => {
    // remove selected flag from all zones
    setSelectedFlares([]);
  };

  const submitTicket = () => {
    if (
      !selectedFlares.length ||
      !subject ||
      !description ||
      !priorityId ||
      !typeId
    ) {
      alert('please fill all fields');
    }
    dispatch(
      createTicket({
        flareIdsList: selectedFlares.map((selectedFlare) => selectedFlare.id),
        zoneIdsList: [
          ...new Set(
            selectedFlares.map((selectedFlare) => selectedFlare.zone.id)
          ),
        ],
        subject,
        description,
        priorityId,
        typeId,
      })
    );
    resetSelectedZones();
    setSubject('');
    setDescription('');
  };
  return (
    <>
      <h4>Flares List</h4>
      <button onClick={() => console.log(parseInt(priorityId))}>
        show priority
      </button>
      <ol>
        {selectedFlares.length
          ? selectedFlares.map((flare, i) => (
              <Fragment key={i}>
                <FlareListItem flare={flare} />
              </Fragment>
            ))
          : null}
      </ol>
      <label>Subject</label>
      <input
        type="text"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      />
      <label>Description</label>
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <label>Priority</label>
      <select name="priority" defaultValue="0" onChange={handlePriorityChange}>
        <option disabled value="0" hidden>
          Select
        </option>
        {ticketPriority.length ? (
          ticketPriority.map((item) => (
            <option key={item.id} value={item.id}>
              {item.priority}
            </option>
          ))
        ) : (
          <option value={null}>-</option>
        )}
      </select>
      <label>Type</label>
      <select name="type" defaultValue="0" onChange={handleTypeChange}>
        <option disabled value="0" hidden>
          Select
        </option>
        {ticketType.length ? (
          ticketType.map((item) => (
            <option key={item.id} value={item.id}>
              {item.type}
            </option>
          ))
        ) : (
          <option value={null}>-</option>
        )}
      </select>
      <br />
      <button onClick={submitTicket}>Create new Ticket</button>
    </>
  );
};

export default CreateTicket;
