import React from 'react';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Divider from 'material-ui/lib/divider';
import Checkbox from 'material-ui/lib/checkbox';
import getText from '../lib/language_pack';

const VisibilityLink = React.createClass({
    dispatchAction(){
        const actionType = this.props.actionType;
        const store = this.props.store;

        store.dispatch({
            type: "SORT",
            sortBy: actionType
        });
    },
    render(){
        const text = this.props.text;

        return (
            <ListItem
                className="sortType"
                primaryText={text}
                onTouchTap={this.dispatchAction}
            />
        )
    }
});

const FilterBar = React.createClass({
    render() {
        const {store} = this.props;

        return (
            <div className="filter-bar column small-12 medium-3" id="filter-bar">
                <List className='filter-bar_sort' subheader={getText('sortBy')} style={{borderRadius:0}}>
                    <VisibilityLink store={store} text={getText('price')} actionType='SORT_BY_PRICE'/>
                    <VisibilityLink store={store} text={getText('departure_time')} actionType='SORT_BY_DEPARTURE_TIME'/>
                </List>
                {
                //<Divider />
                //<List subheader="Filter" style={{borderRadius:0}}>
                //    <ListItem
                //        leftCheckbox={<Checkbox />}
                //        primaryText="Operators"
                //        secondaryText="list"
                //    />
                //    <ListItem
                //        leftCheckbox={<Checkbox />}
                //        primaryText="..."
                //        secondaryText=".."
                //    />
                //    <ListItem
                //        leftCheckbox={<Checkbox />}
                //        primaryText="..."
                //        secondaryText=".."
                //    />
                //</List>
                }
            </div>
        )
    }
});

export default FilterBar;
