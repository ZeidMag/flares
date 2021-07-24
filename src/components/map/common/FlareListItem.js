import Moment from 'react-moment';
import '../FlaresModal/FlaresModal.css';

const FlareListItem = ({ flare, children }) => {
  return (
    <li className="flare-item">
      <span>Zone: {flare.zone.id}</span> <span>info: {flare.info}</span>{' '}
      <span>
        creation date:
        <Moment format="YYYY-MM-DD">{flare.createdAt}</Moment>
      </span>
      <span className="flare-type flare-item-pill">{flare.type}</span>
      {flare.status ? (
        <span
          className={`flare-item-pill ${
            flare.status.status === 'pending'
              ? 'flares-status-pending'
              : 'flares-status-resolved'
          } `}
        >
          {flare.status.status}
        </span>
      ) : null}
      {flare.customer.verified ? (
        <span className="flare-item-pill customer-verified">&#10004;</span>
      ) : (
        <span className="flare-item-pill customer-unverified">&#10006;</span>
      )}
      {children}
    </li>
  );
};

export default FlareListItem;
