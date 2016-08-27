import React  from 'react';
import ReactDOM  from 'react-dom';
import { Router, Route, IndexRedirect } from 'react-router';
import { createHistory } from 'history';
import getMomentDate from './lib/moment';

import App from './components/App';
import NotFound from './components/NotFound';
import Landing from './components/Landing';
import Home from './components/Home';
import Departures from './components/Departures';

const date = getMomentDate().format('YYYY-MM-DD');

const routes = (
    <Router history={createHistory()}>
        <Route path="/">
            <IndexRedirect to={`/coding-challenge-frontend-b/en/departures/dr5reg/f25dvk/${date}`}/>
            <Route path=":lang" component={Home}>
                <Route path="departures(/:origin/:dest/:date)" component={Departures}/>
            </Route>
            <Route path="*" component={NotFound}/>
        </Route>
    </Router>
)

ReactDOM.render(routes, document.querySelector('#app'));
