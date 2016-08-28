import React from 'react';
import Paper from 'material-ui/lib/paper';
import Ticket from './Ticket';
import CircularProgress from 'material-ui/lib/circular-progress';
import {loadDepartures} from './actionCreators';
import getMomentDate from '../lib/moment';

const TicketList = React.createClass({
    componentDidMount(){
        const {store} = this.props;
        this.unsubscribe = store.subscribe(() => this.forceUpdate());
        store.dispatch(loadDepartures(this.props));
    },
    componentWillUnmount() {
        this.unsubcribe();
    },
    componentWillReceiveProps(nextProps){
        const {store} = nextProps;
        store.dispatch(loadDepartures(nextProps));
    },
    getDeparturesList(){
      const {store} = this.props;
      const {sortBy,tickets} = store.getState();
      const departures = tickets.result.departures || [];
      // console.log(departures);
       switch (sortBy) {
           case 'SORT_BY_PRICE':
               return departures.sort(function(a,b){
                   return a.prices.total > b.prices.total;
               });
           case 'SORT_BY_DEPARTURE_TIME':
               return departures.sort(function(a,b){
                   const aTime = new Date(Date.parse(a.departure_time));
                   const bTime = new Date(Date.parse(b.departure_time));
                   return aTime > bTime;
               });
           default:
               return departures;
       }
    },
    renderProgress(){
        const {tickets, count} = this.props.store.getState();
        const departures = tickets.result.departures || [];

        if (tickets.fetching) {
            // console.log('is fetching');
            return (
                <li className="ticket_item ticket_item_fetching">
                    <CircularProgress/>
                </li>
            )
        }
        else if (!departures.length) {
            return (
              <li className="ticket_item ticket_item_refresh">
                No results. Try refreshing the page.
              </li>
            )
        }
    },
    render() {
        const departuresList = this.getDeparturesList();

        return (
            <ul className="ticket_list column">
                {
                    departuresList.map((departure) => {
                        return (
                            <Ticket key={departure.id} {...this.props} departure={departure}/>
                        )
                    })
                }
                {this.renderProgress()}
            </ul>
        )
    }
});

export default TicketList;
