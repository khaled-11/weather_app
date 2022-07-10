import data from './data'
import radio from './radio'
import coordinates from './coordinates'
import loadingStatus from './loading_status'
import lastSearchData from './last_search'

import { combineReducers} from 'redux';

const allReducers = combineReducers({
    weatherData:data,
    selectedRadioOption:radio,
    coordinates:coordinates,
    loadingStatus:loadingStatus,
    lastSearchData:lastSearchData
})

export default allReducers;