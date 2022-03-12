import {RequestStatusType} from "../../../api";

export type SetInitializedAppType = {
    payload: {
        initializeStatus: boolean
    }
}

export type SetProgressType = {
    payload: {
        progress: number
    }
}

export type SetOperationStatusType = {
    payload: {
        operationStatus: RequestStatusType
    }
}

export type SetUiErrorType = {
    payload: {
        error: string
    }
}
