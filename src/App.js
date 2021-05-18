import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Provider from './store/Provider';
import Home from './pages/Home/Home';

const App = () => {
  return (
    <Router>
      <Switch>
        <Provider>
          <Route path="/flares" component={Home} />
        </Provider>
      </Switch>
    </Router>
  );
};

export default App;
