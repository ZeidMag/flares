import { useState, Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { createTicket } from '../../../store/actions/tickets';
import FlareListItem from '../../map/common/FlareListItem';

const CreateTicket = ({ selectedFlares, setSelectedFlares }) => {
  const dispatch = useDispatch();
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');

  const resetSelectedZones = () => {
    // remove selected flag from all zones
    setSelectedFlares([]);
  };

  const submitTicket = () => {
    if (!selectedFlares.length || !subject || !description) {
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
      })
    );
    resetSelectedZones();
    setSubject('');
    setDescription('');
  };
  return (
    <>
      <h4>Flares List</h4>
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
      <br />
      <button onClick={submitTicket}>Create new Ticket</button>
    </>
  );
};

export default CreateTicket;
