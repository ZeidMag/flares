import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Provider from './store/Provider';
// import Home from './pages/Home/Home';
import Tickets from './pages/Tickets/Tickets';
import SingleTicket from './pages/SingleTicket/SingleTicket';
import Layout from './layout/Main';
import Login from './pages/Login/Login';
import './App.css';

const App = () => {
  return (
    <Router>
      <Provider>
        <Switch>
          <Route path="/flares" component={Login} />
          <Layout>
            {/* <Route path="/flares" component={Home} /> */}
            <Route path="/tickets" component={Tickets} />
            <Route path="/single-ticket/:id" component={SingleTicket} />
          </Layout>
        </Switch>
      </Provider>
    </Router>
  );
};

export default App;
