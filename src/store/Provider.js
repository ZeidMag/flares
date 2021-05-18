import { createStore, combineReducers, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';

// import newsReducer from './reducers/news';
// import projectsReducer from './reducers/projects';
// import mainReducer from './reducers/main';

const rootReducer = combineReducers({
  //   news: newsReducer,
  //   projects: projectsReducer,
  //   main: mainReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const MainProvider = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default MainProvider;
