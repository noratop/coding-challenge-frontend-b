import React from 'react';
import getText from '../lib/language_pack';
import getMomentDate from '../lib/moment';

const SearchBar = React.createClass({
    componentDidMount(){
        const {store} = this.props;
        this.unsubscribe = store.subscribe(() => this.forceUpdate());
    },
    componentWillUnmount() {
        this.unsubcribe();
    },
    render() {
        const date = getMomentDate().format('LL');

        return (
            <div className="search-bar row">
                <div className="columns">
                    <p className="search-bar_text">{getText('selectTrip')}</p>
                    <h2 className="search-bar_cities">New York {getText('to')} Montreal</h2>
                    <p className="search-bar_date">{date}</p>
                    <p>{getText('oneWay')}</p>
                </div>
                <div className="columns">
                </div>
            </div>
        )
    }
});

export default SearchBar;
