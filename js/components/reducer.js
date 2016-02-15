import { createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

// departures reducer
function tickets(
    state={fetching:false, result:{}},
    action) {
    switch (action.type) {
        case 'FETCH_DEPARTURES':
            console.log('FETCH_DEPARTURES');
            return {
                ...state,
                result:{},
                fetching:true
            };

        case 'RECEIVED_DEPARTURES':
            console.log('RECEIVED_DEPARTURES');
            return {
                ...state,
                result: action.result,
                fetching:false
            };

        case 'NO_RESULT':
            console.log('NO_RESULT');
            return {
                ...state,
                result: action.result,
                fetching:false
            };

        default:
            return state;
    }
}

// Sort departures reducer
function sortBy(state='SORT_BY_PRICE', action) {
    switch (action.type) {
        case 'SORT':
            return action.sortBy;
        default:
            return state;
    }
}

// function filter(state='', action) {
//     switch (action.type) {
//
//         case 'FILTER_BY':
//
//             return {
//                 ...state,
//                 ...filteredResult
//             };
//
//         case 'FILTER_BY':
//
//             return {
//                 ...state,
//                 ...filteredResult
//             };
//
//         default:
//             return state;
//     }
// }


// app Language reducer
function language(state='en', action) {
    switch (action.type) {
        case 'CHANGE_LANGUAGE':
            // console.log(action.language);
            return action.language;
        default:
            return state;
    }
}


//combine all reducers
const app = combineReducers({
    tickets,
    sortBy,
    // filter,
    language
});

let store = createStore(app,applyMiddleware(thunk));

export default {store};
