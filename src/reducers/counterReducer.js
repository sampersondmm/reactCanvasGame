const defaultState = {
    count: 0,
}

function counterReducer(state = defaultState, action) {
    let newState;
    switch(action.type){
        case 'ADD':
            newState = {...state};
            newState.count++;
            return newState;

        case 'SUBTRACT':
            if(state.count > 0){
                newState = {...state};
                newState.count--;
                return newState;
            } else {
                return state;
            }

        default:
            return state;
    }
}

export default counterReducer;