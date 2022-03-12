import {createSlice} from "@reduxjs/toolkit";
import {SetInitializedAppType, SetOperationStatusType, SetProgressType, SetUiErrorType} from "./types";


const slice = createSlice({
    name: 'ui',
    initialState: {
        initializeStatus: false,
        operationStatus: "idle",
        progress: 0,
        error: ''
    },
    reducers: {
        setInitializedApp(state, action: SetInitializedAppType) {
            state.initializeStatus = action.payload.initializeStatus
        },
        setProgress(state, action: SetProgressType) {
            state.progress = action.payload.progress
        },
        setOperationStatus(state, action: SetOperationStatusType) {
            state.operationStatus = action.payload.operationStatus
        },
        setUiError(state, action: SetUiErrorType) {
            state.error = action.payload.error
        }
    }
})

export const uiReducer = slice.reducer

export const {setInitializedApp,setProgress,setOperationStatus,setUiError} = slice.actions


// export const uiReducer = (state: InitialStateType = initialState, action: UiReducerActionsTypes): InitialStateType => {
//     switch (action.type) {
//         case 'UI/SET-INITIALIZED-APP':
//             return {
//                 ...state,
//                 initializeStatus: action.initializeStatus
//             }
//         case 'UI/SET-PROGRESS':
//             return {
//                 ...state,
//                 progress: action.progress
//             }
//         case "UI/SET-OPERATION-STATUS":
//             return {
//                 ...state,
//                 operationStatus: action.operationStatus
//             }
//         case "UI/SET-Error":
//             return {
//                 ...state,
//                 error:action.error
//             }
//         default:
//             return state
//     }
//
// }



