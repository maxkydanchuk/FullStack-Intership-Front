import {SET_MESSAGE, CLEAR_MESSAGE} from "./messagesTypes";

export const setMessage = (payload) => ({
    type: SET_MESSAGE,
    payload
})

export const clearMessage = () => ({
    type: CLEAR_MESSAGE
})