import {ThunkType} from "../../store/store";
import {AuthReducerActionsTypes} from "./auth-actions-types";
import {setInitializedApp, setOperationStatus, setStatusProgress} from "../ui-reducer/ui-actions";
import {authAPI, LoginParamsType} from "../../../api/api";
import {resultCodes} from "../../../definitions/result-codes";
import {handleServerAppError, handleServerNetworkError} from "../../../utils/errorUtils";
import {createSlice} from "@reduxjs/toolkit";


const initialState = {
    isLoggedIn: false
}
//type InitialStateType = typeof initialState


 const slice = createSlice({
    name:'auth',
    initialState:initialState,
    reducers:{
        setIsLoggedIn (state, action: AuthReducerActionsTypes) {
            state.isLoggedIn = action.payload.value
        }
    }
})
export const authReducer = slice.reducer
const {setIsLoggedIn} = slice.actions
// export const authReducer = (state: InitialStateType = initialState, action: AuthReducerActionsTypes): InitialStateType => {
//     switch (action.type) {
//         case 'login/SET-IS-LOGGED-IN':
//             return {...state, isLoggedIn: action.value}
//         default:
//             return state
//     }
// }


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
            dispatch(setIsLoggedIn({value:true}))
        } else {
            dispatch(setIsLoggedIn({value:false}))
        }
    } catch (e: any) {

    }
}

export const login = (data: LoginParamsType): ThunkType => async dispatch => {
    try {
        dispatch(setOperationStatus('loading'))
        const response = await authAPI.login(data)
        if (response.resultCode === resultCodes.success) {
            dispatch(setIsLoggedIn({value:true}))
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

            dispatch(setIsLoggedIn({value:false}))
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

