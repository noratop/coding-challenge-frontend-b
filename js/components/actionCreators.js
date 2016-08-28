import request from 'superagent';
import { mergeResult, bindLocations, bindOperators } from '../lib/helpers';

function fetch(params,query,poll=false) {
    return request
        .get(`https://napi.busbud.com/x-departures/${params.origin}/${params.destination}/${params.outbound_date}${(()=>{return poll? '/poll':''})()}`)
        .set('Accept', 'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/')
        .query(query)
}

function getParams(props){
  const {params} = props;
  return {
      origin: params.origin,
      destination: params.dest,
      outbound_date: params.date
  };
}

function getQuery(props){
  const {params} = props;
  return {
      adult:1,
      child:0,
      senior:0,
      lang:params.lang,
      currency:"CAD"
  };
}

function loadDepartures(props, count=0) {
  const params = getParams(props);
  const query = getQuery(props);

  return function(dispatch,getState) {
    dispatch({
        type:'FETCH_DEPARTURES',
        params,
        query
    });

    fetch(params,query)
      .end((err,res) => {
        if (err) {
            dispatch({
                type:'NO_RESULT',
                result: {},
            });
        }
        else {
          let result = bindLocations(bindOperators(res.body));
          //let result = {...res.body,complete:false}; // testing poll

          if (!result.departures.length && !count) {
            console.log('retried fetching data once');
            loadDepartures(props, 1);
          }
          else {
            dispatch({
              type:'RECEIVED_DEPARTURES',
              result
            });
          }

          if (!result.complete) {

            console.log('poll');
            const index = result.departures.length;
            const pollQuery = {...query,index};

            fetch(params,pollQuery,true)
                .end((err,res) => {
                    if (err) {
                        //dispatch error
                    }
                    else {
                        // console.log(res.body);
                        const {result} = getState().tickets;
                        const pollResult = bindLocations(bindOperators(res.body));

                        dispatch({
                            type:'RECEIVED_DEPARTURES',
                            result: mergeResult(result,pollResult)
                        });
                    }
                });

          }
        }
      })
    }
}


export default {
  loadDepartures
};
