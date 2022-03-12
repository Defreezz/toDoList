import {resultCodes} from "../../../definitions/result-codes";
import {handleServerAppError, handleServerNetworkError} from "../../../utils";
import {createSlice} from "@reduxjs/toolkit";
import {authAPI, LoginParamsType} from "../../../api";
import {AuthReducerActionsTypes} from "./auth-actions-types";
import {setInitializedApp, setOperationStatus, setProgress} from "../ui-reducer/ui-reducer";
import {getTodolists} from "../todolist-reducer/todolists-reducer";


const slice = createSlice({
    name:'auth',
    initialState: {isLoggedIn: false},
    reducers:{
        setIsLoggedIn (state, action:AuthReducerActionsTypes) {
            state.isLoggedIn = action.payload.value
        }
    }
})

export const authReducer = slice.reducer

const {setIsLoggedIn} = slice.actions

// thunks

export const initializeApp = ()  => async (dispatch:any) => {

    let timer: any
    try {
        let progress = 0
         timer = setInterval(() => {
            if (progress < 100) {
                progress += 10
                dispatch(setProgress({progress}))
            } else {
                clearInterval(timer)
                dispatch(setInitializedApp({initializeStatus:true}))
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

export const login = (data: LoginParamsType) => async (dispatch:any) => {
    try {
        dispatch(setOperationStatus({operationStatus :'loading'}))
        const response = await authAPI.login(data)
        if (response.resultCode === resultCodes.success) {
            dispatch(setIsLoggedIn({value:true}))
            dispatch(setOperationStatus({operationStatus:'succeeded'}))
        } else {
            handleServerAppError<{ userId: number }>(dispatch, response)
            dispatch(setOperationStatus({operationStatus:'failed'}))
        }
    } catch (e: any) {
        handleServerNetworkError(dispatch, e.message)
        dispatch(setOperationStatus({operationStatus:'failed'}))
    }
}

export const logout = () => async (dispatch:any) => {
    try {
        dispatch(setOperationStatus({operationStatus:'loading'}))
        const response = await authAPI.logout()
        if (response.resultCode === resultCodes.success) {

            dispatch(setIsLoggedIn({value:false}))
            dispatch(setOperationStatus({operationStatus:'succeeded'}))
        } else {
            handleServerAppError<{}>(dispatch, response)
            dispatch(setOperationStatus({operationStatus:'failed'}))
        }
    } catch (e: any) {
        handleServerNetworkError(dispatch, e.message)
        dispatch(setOperationStatus({operationStatus:'failed'}))
    }
}

//type InitialStateType = typeof initialState
// export const authReducer = (state: InitialStateType = initialState, action: AuthReducerActionsTypes): InitialStateType => {
//     switch (action.type) {
//         case 'login/SET-IS-LOGGED-IN':
//             return {...state, isLoggedIn: action.value}
//         default:
//             return state
//     }
// }