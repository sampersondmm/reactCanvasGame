import worldReducer from './worldReducer';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
    world: worldReducer
})

export default rootReducer;