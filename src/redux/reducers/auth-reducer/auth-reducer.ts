import {ThunkType} from "../../store/store";
import {AuthReducerActionsTypes} from "./auth-actions-types";
import {setOperationStatus, setInitializedApp, setStatusProgress} from "../ui-reducer/ui-actions";
import {authAPI, LoginParamsType} from "../../../api/api";
import {resultCodes} from "../../../utils/resultCodes/result-codes";
import {setIsLoggedInAC} from "./auth-actions";
import {handleServerAppError, handleServerNetworkError} from "../../../utils/error-util/error-utils";


const initialState = {
    isLoggedIn: false
}
type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: AuthReducerActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}


// thunks

export const initializeApp = (): ThunkType => async dispatch => {

    let timer: any
    try {
        let progress = 0
         timer = setInterval(() => {
            if (progress < 100) {
                progress += 10
                dispatch(setStatusProgress(progress))
            } else {
                clearInterval(timer)
                dispatch(setInitializedApp(true))
            }
        }, 100)
        const response = await authAPI.me()
        if (response.resultCode === resultCodes.success) {
            dispatch(setIsLoggedInAC(true))
        } else {
            dispatch(setIsLoggedInAC(false))
        }
    } catch (e: any) {

    }
}

export const login = (data: LoginParamsType): ThunkType => async dispatch => {
    try {
        dispatch(setOperationStatus('loading'))
        const response = await authAPI.login(data)
        if (response.resultCode === resultCodes.success) {
            dispatch(setIsLoggedInAC(true))
            dispatch(setOperationStatus('succeeded'))
        } else {
            handleServerAppError<{ userId: number }>(dispatch, response)
            dispatch(setOperationStatus('failed'))
        }
    } catch (e: any) {
        handleServerNetworkError(dispatch, e.message)
        dispatch(setOperationStatus('failed'))
    }
}

export const logout = (): ThunkType => async dispatch => {
    try {
        dispatch(setOperationStatus('loading'))
        const response = await authAPI.logout()
        if (response.resultCode === resultCodes.success) {

            dispatch(setIsLoggedInAC(false))
            dispatch(setOperationStatus('succeeded'))
        } else {
            handleServerAppError<{}>(dispatch, response)
            dispatch(setOperationStatus('failed'))
        }
    } catch (e: any) {
        handleServerNetworkError(dispatch, e.message)
        dispatch(setOperationStatus('failed'))
    }
}

