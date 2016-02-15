//merge fetch and poll results: res2 can only complete or update res1.
//return a new result object
function mergeResult(res1,res2){

    // We first rebuild res2 to include res1 values, so that res2 properties can safely replace res1 properties
    var mergedRes2 = Object.keys(res2).reduce(function(acc,key){
        var val = res2[key];
        if (typeof val === 'object') { //'complete' the value if object
            if (Array.isArray(val)){
                acc[key]= [...res1[key],...res2[key]];
            }
            else {
                acc[key] = {...res1[key],...res2[key]};
            }
        }
        else { // assign the new value if not object
            acc[key]=res2[key];
        }
        return acc;
    },{});
    return {...res1,...mergedRes2}
}

// Return the time (hour, minute) for a localisation given as the language. NOT SUPPORTED BY SAFARI WHICH RETURN FULL TIME IN US FORMAT
function getFormattedTime(timeString,lang){
    let options = {
        hour: '2-digit',
        minute: '2-digit'
    };

    let date = new Date(Date.parse(timeString));

    return date.toLocaleTimeString(lang,options)
}


// Bind the full origin and destination {location} objects + associated {city} object to each departure.
function bindLocations(result){
    if(!result.locations) {return result;}

    //parse locations array to objects
    const locationsObj = result.locations.reduce(function(acc,el){
        acc[el.id]=el;
      return acc
    },{});

    //bind the locations object to each departure
    result.departures = result.departures.map(function(el){
      //bind the origin/city
      el.origin_location_obj = {
        ...locationsObj[el.origin_location_id],
        city: result.cities[0].id === locationsObj[el.origin_location_id].city_id? result.cities[0]: result.cities[1]
      };
      //bind the destination/city
      el.destination_location_obj = {
        ...locationsObj[el.destination_location_id],
        city: result.cities[0].id === locationsObj[el.destination_location_id].city_id? result.cities[0]: result.cities[1]
      }

      return el;
    })

    return result;
}


//Bind the full operator object to each departure
function bindOperators(result){
    if(!result.operators) {return result;}

    const operatorsObj = result.operators.reduce(function(acc,el){
        acc[el.id]=el;
      return acc
    },{});

    result.departures = result.departures.map(function(el){
        el.operator_obj = operatorsObj[el.operator_id];
        return el;
    });

    return result;
}

//Resize the operator logo
function getResizedLogo(url){
    return url.replace(/{[^{]+}/g,'100');
    //return url.replace(/{width}/g,width).replace(/{height}/g,height);
}


export default {
    mergeResult,
    getFormattedTime,
    bindLocations,
    bindOperators,
    getResizedLogo,
}
