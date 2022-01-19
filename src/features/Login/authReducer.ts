import {Dispatch} from "redux";

import {authAPI, LoginParamsType} from "../../api/auth-api";
import {setAppStatusAC} from "../../app/app-reducer";
import {handleServerNetworkError} from "../../utils/error-utils";

const initialState = {
    isLoggedIn: false
}


type initialStateType = {
    isLoggedIn: boolean
}


export const LoginReducer = (state: initialStateType = initialState, action: LoginActionCreatorType):initialStateType => {
    switch (action.type) {
        case "LOGIN":
            return {...state, isLoggedIn: action.value}


        default:
            return state;
    }
}

//action

export const loginAC = (value: boolean) => {
    return ({type: "LOGIN", value} as const)
}

type LoginActionCreatorType = ReturnType<typeof loginAC>



//tnunks
export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC("loading"))
    authAPI.login(data)
        .then(res => {
            if (res.data.resultCode === 0){
                dispatch(loginAC(true))
                dispatch(setAppStatusAC("succeeded"))
            }/*else {
                handleServerAppError(res.data, dispatch)
            }*/
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch)
        })
}

export const logOutTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC("loading"))
    authAPI.logOut()
        .then(res => {
            if (res.data.resultCode === 0){
                dispatch(loginAC(false))
                dispatch(setAppStatusAC("succeeded"))
            }/*else {
                handleServerAppError(res.data, dispatch)
            }*/
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch)
        })
}


