import React from 'react';
import LanguageSelector from './LanguageSelector';

const Home = React.createClass({
    componentDidMount(){
        const {store} = this.props;
        const lang = this.props.params.lang;
        // console.log(lang);
        store.dispatch({
            type:'CHANGE_LANGUAGE',
            language: lang
        })
    },
    componentWillReceiveProps(newProps){
        const {store} = newProps;
        const lang = newProps.params.lang;

        store.dispatch({
            type:'CHANGE_LANGUAGE',
            language: lang
        })
    },
    getChildrenWithStore(){//inject store in each Home child
        const comp = this;
        return React.Children.map(this.props.children, function(child) {
            return React.cloneElement(child, { store: comp.props.store });
        });
    },
    render() {
        const store = this.props.store;
        return (
            <div className="wrapper">
                <div className="header row align-middle align-justify">
                    <LanguageSelector store={store} currentPath={this.props.location.pathname}/>
                </div>
                {this.getChildrenWithStore()}
            </div>
        )
    }
});

export default Home;
