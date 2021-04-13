
export enum ReducerAction {
    SET_LINK,
    SET_SESSION_ID
}


const Reducer = (state: any, action: { type: ReducerAction; payload: string; }) => {
    switch (action.type) {
        case ReducerAction.SET_LINK:
            return {
                ...state,
                link: action.payload
            };
        case ReducerAction.SET_SESSION_ID:
            return {
                ...state,
                sessionId: action.payload
            };
        default:
            return state;
    }
};

export default Reducer;