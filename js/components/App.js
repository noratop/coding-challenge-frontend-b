import React from 'react';
import {store} from './reducer';

import injectTapEventPlugin from "react-tap-event-plugin";
injectTapEventPlugin();

const App = React.createClass({
    getChildrenWithProps(){ //inject store in each App child
        const comp = this;
        return React.Children.map(this.props.children, function(child) {
            return React.cloneElement(child, { store });
        });
    },
    render() {
        return (
            <div>
                {this.getChildrenWithProps()}
            </div>
        )
    }
});

export default App;
