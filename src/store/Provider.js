import { createStore, combineReducers, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';

// import tempReducer from './reducers/temp';
import ticketsReducer from './reducers/tickets';
import flareReducer from './reducers/flare';

const rootReducer = combineReducers({
  flare: flareReducer,
  tickets: ticketsReducer,
  // temp: tempReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const MainProvider = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default MainProvider;
