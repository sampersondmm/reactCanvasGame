const defaultState = {
    todoList: [
        'first todo',
        'second todo',
        'third todo',
        'fourth todo'
    ]
}

function todoListReducer(state = defaultState, action){
    let newState;
    switch(action.type){
        case 'ADD_TODO':
            const input = action.payload,
                defaultTodoList = state.todoList;

            newState = {todoList: [...defaultTodoList, input]};
            return newState;
        case 'REMOVE_TODO':
            const index = action.payload;

            newState = {...state};

            const newList = {todoList: newState.todoList.filter((el, i) => i !== index)}
            return newList;
        default:
            return state;
    }
}

export default todoListReducer;