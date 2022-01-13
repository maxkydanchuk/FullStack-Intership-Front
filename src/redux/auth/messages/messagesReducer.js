import { SET_MESSAGE, CLEAR_MESSAGE } from "./messagesTypes";

const initialState = {};

export const messagesReducer = (state = initialState, action) => {
    // eslint-disable-next-line default-case
    switch(action.type) {
        case SET_MESSAGE:
            return {
                message: action.payload
            }
        case CLEAR_MESSAGE: {
            return {
                initialState
            }
        }
        default:
            return state;
    }
}
