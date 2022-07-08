import data from './data'
import { combineReducers} from 'redux';

const allReducers = combineReducers({
    weatherData:data
})

export default allReducers;