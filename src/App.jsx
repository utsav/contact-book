import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import Contacts from './pages/Contacts';

const App = () => (
  <Router>
    <Switch>
      <Redirect exact from="/" to="/contacts/a" />
      <Redirect exact from="/contacts" to="/contacts/a" />
      <Route exact path="/contacts/:alphabet" component={Contacts} />
    </Switch>
  </Router>
);

export default App;
