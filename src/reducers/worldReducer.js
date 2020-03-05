import {world} from '../data/maps';

const defaultState = {
    ...world
}

function worldData(state = defaultState, action){
    switch(action.type){
        case 'MAP_1':
            return defaultState.level1;
        case 'MAP_2':
            return state.level2;
        case 'MAP_3':
            return defaultState.level3;
        case 'MAP_4':
            return defaultState.level4;
        default:
            return defaultState;
    }
}

export default worldData;