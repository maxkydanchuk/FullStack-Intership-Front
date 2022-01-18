import apiService from "../../services/api-service";
import { REGISTER_SUCCESS, REGISTER_FAIL, LOGIN_SUCCESS, LOGIN_FAIL, SET_IS_AUTHENTICATED} from "./authTypes";
import {clearMessage, setMessage} from "./messages/messagesAction";

const api = new apiService();


export const registerSuccess = () => ({
    type: REGISTER_SUCCESS
})

export const registerFail = (payload) => ({
    type: REGISTER_FAIL,
    payload
})
export const loginSuccess = (token, email) => ({
    type: LOGIN_SUCCESS,
    token,
    email
})

export const loginFail = (bool) => ({
    type: LOGIN_FAIL,
    isFailed: bool
})


export const setIsAuthenticated = (bool) => ({
    type: SET_IS_AUTHENTICATED,
    isAuthenticated: bool
})

export function addLoginSuccessThunk(item, closeAndReset) {
    return (dispatch) => {
        api.getUser(item)
            .then((response) => {
                dispatch(loginSuccess(response.token, response.email));
                dispatch(setIsAuthenticated(true));
                dispatch(clearMessage());
                closeAndReset();
            })
            .catch((e) => {
                dispatch(loginFail(true))
                dispatch(setMessage(e.message))
            });
    };
}

export function addRegisterSuccessThunk(item) {
    return (dispatch) => {
        api.registerUser(item)
            .then((response) => dispatch(registerSuccess(response)));
    }
}


