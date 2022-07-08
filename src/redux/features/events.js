const initialState = {
    events: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "addEvent":
            return {
                ...state,
                events: [...state.events, action.payload] 
            }
            ;

        default:
            return state;
    }
}

export default reducer 