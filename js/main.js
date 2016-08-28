import React  from 'react';
import ReactDOM  from 'react-dom';
import { Router, Route, Redirect, hashHistory } from 'react-router';
// import { createHistory } from 'history';
import getMomentDate from './lib/moment';

import App from './components/App';
import NotFound from './components/NotFound';
import Home from './components/Home';
import Departures from './components/Departures';

const date = getMomentDate().format('YYYY-MM-DD');

const onEnter = () => {
  const hash = window.location.hash.split('?');

  if (hash[0] !== '#/en/departures/dr5reg/f25dvk/2016-09-30') {
    window.location.hash = '#/en/departures/dr5reg/f25dvk/2016-09-30';
  }
};

const routes = (
  <Router history={hashHistory}>
    <Route path="/" component={App} onEnter={onEnter}>
      <Route path=":lang" component={Home} onEnter={onEnter}>
        <Route path="departures(/:origin/:dest/:date)" component={Departures} onEnter={onEnter}/>
      </Route>
      <Route path="*" onEnter={onEnter}/>
    </Route>
  </Router>
)

ReactDOM.render(routes, document.querySelector('#app'));
