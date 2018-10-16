const postReducer = (state = [], action) => {
    switch(action.type) {
        case 'SELECTED_ITEM':
            state = [];
            state.items = state.concat([action.data]);
            return state;
        case 'GO_BACK':
            state = [];
            return state;
        default:
            return state;
    }
}

export default postReducer;