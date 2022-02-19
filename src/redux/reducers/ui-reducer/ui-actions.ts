import {RequestStatusType} from "./ui-reducer";

export const setStatusApp = (initializeStatus: RequestStatusType) => {
    return {type: "SET-STATUS-APP",initializeStatus} as const
}
export const setStatusProgress = (progress: number) => {
    return {type: "SET-PROGRESS", progress} as const
}
export const setOperationStatus = (operationStatus: RequestStatusType) => {
    return {type: "SET-OPERATION-STATUS",operationStatus} as const
}