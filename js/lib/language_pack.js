import {store} from '../components/reducer';

const languagePack = {
    french:{
        sortBy:'Trier par',
        price:'Prix',
        departure_time:'Heure de départ',
        selectTrip:"Sélectionnez votre voyage",
        changeLangText:'Changer la langue',
        to:'à',
        oneWay:'Billet aller-simple'
    },
    english:{
        sortBy:'Sort By',
        price:'Price',
        departure_time:'Departure Time',
        selectTrip: "Select your trip",
        changeLangText:'Change language',
        to:'to',
        oneWay:'One-way ticket'
    }
};

//Get text in current language
function getText(textKey){
    const {language} = store.getState();
    switch (language) {
        case 'fr':
            return languagePack.french[textKey];
        default:
            return languagePack.english[textKey];
    }
}

export default getText;
