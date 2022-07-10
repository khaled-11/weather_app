import data from './data'
import radio from './radio'
import { combineReducers} from 'redux';

const allReducers = combineReducers({
    weatherData:data,
    selectedRadioOption:radio
})

export default allReducers;