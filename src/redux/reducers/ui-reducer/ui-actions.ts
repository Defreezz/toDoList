import {RequestStatusType} from "./ui-reducer";

export const setInitializedApp = (initializeStatus: boolean) => {
    return {type: "UI/SET-INITIALIZED-APP",initializeStatus} as const
}
export const setStatusProgress = (progress: number) => {
    return {type: "UI/SET-PROGRESS", progress} as const
}
export const setOperationStatus = (operationStatus: RequestStatusType) => {
    return {type: "UI/SET-OPERATION-STATUS",operationStatus} as const
}
export const setUiError = (error: string|null) => {
    return {type: "UI/SET-Error",error} as const
}
