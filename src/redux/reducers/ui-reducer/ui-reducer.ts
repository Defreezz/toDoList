import {UiReducerActionsTypes} from "./ui-actions-types";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type InitialStateType = {
    initializeStatus: boolean
    operationStatus: RequestStatusType
    progress: number
    error: string | null
}

const initialState: InitialStateType = {
    initializeStatus: false,
    operationStatus: "idle",
    progress: 0,
    error: null
}

export function uiReducer(state: InitialStateType = initialState, action: UiReducerActionsTypes): InitialStateType {
    switch (action.type) {
        case 'UI/SET-INITIALIZED-APP':
            return {
                ...state,
                initializeStatus: action.initializeStatus
            }
        case 'UI/SET-PROGRESS':
            return {
                ...state,
                progress: action.progress
            }
        case "UI/SET-OPERATION-STATUS":
            return {
                ...state,
                operationStatus: action.operationStatus
            }
        case "UI/SET-Error":
            return {
                ...state,
                error:action.error
            }
        default:
            return state
    }

}



