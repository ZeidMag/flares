import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Provider from './store/Provider';
import Home from './pages/Home/Home';
import Tickets from './pages/Tickets/Tickets';
import SingleTicket from './pages/SingleTicket/SingleTicket';
import Layout from './layout/Main';

const App = () => {
  return (
    <Router>
      <Provider>
        <Layout>
          <Switch>
            <Route path="/flares" component={Home} />
            <Route path="/tickets" component={Tickets} />
            <Route path="/single-ticket/:id" component={SingleTicket} />
          </Switch>
        </Layout>
      </Provider>
    </Router>
  );
};

export default App;
