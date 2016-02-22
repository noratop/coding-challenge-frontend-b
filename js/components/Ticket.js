import React from 'react';
import {getFormattedTime,getResizedLogo} from '../lib/helpers';
import Amenities from './Amenities';
import moment from 'moment';

const Ticket = React.createClass({
  getFormattedTime(timeString){
      const {store} = this.props;
      const language = store.getState().language;

      moment.locale(language);
      const date = moment(timeString);

      return date.format('LT');
  },
  render() {
        const {departure,store} = this.props;

        return (
            <li className="ticket_item">
                <div className="row">
                    <div className="columns small-12 medium-8 ticket_item_route">
                        <div className="row align-middle align-spaced">
                            <div className="columns small-5">
                                <p className="ticket_item_cityname">{departure.origin_location_obj.city.name}</p>
                                <p className="ticket_item_time"><b>{this.getFormattedTime(departure.departure_time)}</b></p>
                                <p>{departure.origin_location_obj.name}</p>
                            </div>
                            <div className="columns small-1 ticket_item_arrow"><i className="material-icons">arrow_forward</i></div>
                            <div className="columns small-5">
                                <p className="ticket_item_cityname">{departure.destination_location_obj.city.name}</p>
                                <p className="ticket_item_time"><b>{this.getFormattedTime(departure.arrival_time)}</b></p>
                                <p>{departure.destination_location_obj.name}</p>
                            </div>
                        </div>
                    </div>
                    <div className="column small-12 medium-4 ticket_item_detail">
                        <div className="ticket_item_operator">
                            <img className="ticket_item_operator_logo" src={getResizedLogo(departure.operator_obj.logo_url)} alt={departure.operator_obj.name}/>
                        </div>
                        <div className="ticket_item_price">
                            <b>&#36;{Math.round(parseFloat(departure.prices.total)/100)} <span className="ticket_item_currency">CAD</span></b>
                        </div>
                        <div className="ticket_item_class">
                            <div className="">{departure.class_name}</div>
                            <div className=""><Amenities amenities={departure.amenities}/></div>
                        </div>
                    </div>
                </div>
            </li>
        )
    }
});

export default Ticket;
