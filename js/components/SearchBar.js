import React from 'react';
import getText from '../lib/language_pack';

const SearchBar = React.createClass({
    render() {

        const store = this.props.store;
        // const lg = store.getState().language;

        return (
            <div className="search-bar row">
                <div className="columns">
                    <p className="search-bar_text">{getText('selectTrip')}</p>
                    <h2 className="search-bar_cities">New York to Montreal</h2>
                    <p className="search-bar_date">February, 5 2016</p>
                    <p>One-way ticket</p>
                </div>
                <div className="columns">
                    <div className="search-bar_igloo-logo"><a href="http://igloofest.ca/" target="'blank" alt="igloofest"><img src="http://igloofest.ca/public/app/uploads/images/5661d13eecfee.png" alt="igloofest logo"/></a></div>
                </div>
            </div>
        )
    }
});

export default SearchBar;
