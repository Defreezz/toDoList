import {UiReducerActionsTypes} from "./ui-actions-types";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type InitialStateType = {
    initializeStatus: RequestStatusType
    operationStatus: RequestStatusType
    progress: number
}

const initialState: InitialStateType = {
    initializeStatus: "idle",
    operationStatus: "idle",
    progress: 0
}

export function uiReducer(state: InitialStateType = initialState, action: UiReducerActionsTypes):InitialStateType {
    switch (action.type) {
        case 'SET-STATUS-APP':
            return {
                ...state,
                initializeStatus: action.initializeStatus
            }
        case 'SET-PROGRESS':
            return {
                ...state,
                progress: action.progress
            }
        case "SET-OPERATION-STATUS":
            return {
                ...state,
                operationStatus:action.operationStatus
            }
        default:
            return state
    }

}



