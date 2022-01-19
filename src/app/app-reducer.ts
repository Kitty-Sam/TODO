import {Dispatch} from "redux";
import {authAPI} from "../api/auth-api";
import {loginAC} from "../features/Login/authReducer";

const initialState: InitialStateType = {
    status: 'idle',
    error: null,
    initialised: false
}

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        case "APP/SET-INIT":
            return {...state, initialised: action.value}
        default:
            return {...state}
    }
}

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type InitialStateType = {
    status: RequestStatusType
    error: string | null,
    initialised: boolean

}

export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const)
export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)

export const setInitialisedAC = (value: boolean) => ({type: "APP/SET-INIT", value} as const)


export const initAppTC = () => (dispatch: Dispatch) => {
    authAPI.me().then(res => {
        if (res.data.resultCode === 0) {
            dispatch(loginAC(true))

        } else {

        }
        dispatch(setInitialisedAC(true))
    })
}


export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>
export type setInitialisedActionType = ReturnType<typeof setInitialisedAC>

type ActionsType =
    | SetAppErrorActionType
    | SetAppStatusActionType
    | setInitialisedActionType
