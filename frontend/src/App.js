// App.js

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './index.css';

//pages
import RegistrationPage from './pages/RegistrationPage';
import LoginPage from './pages/LoginPage';
import ConnectFBPage from './pages/ConnectFBPage';
import DeleteIntegrationPage from './pages/DeleteIntegrationPage';
import MessengerPage from './pages/MessengerPage';


function App() {
  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/" exact component={RegistrationPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/connect-fb-page" component={ConnectFBPage} />
          <Route path="/delete-integration" component={DeleteIntegrationPage} />
          <Route path="/messenger" component={MessengerPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;