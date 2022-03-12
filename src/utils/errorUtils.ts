import {ThunkType} from "../redux/store/store";
import {CommonResponseType} from "../api";
import {setOperationStatus, setUiError} from "../redux/reducers/ui-reducer/ui-reducer";

export  const handleServerNetworkError = (dispatch:ThunkType,message:string) => {
    dispatch(setUiError({error:message}))
    dispatch(setOperationStatus({operationStatus:"failed"}))
}

export  const handleServerAppError = <T> (dispatch:ThunkType,response:CommonResponseType<T>) => {
    if (response.messages.length) {
        dispatch(setUiError({error: response.messages[0]}))
    } else {
        dispatch(setUiError({error:'some error'}))
    }
    dispatch(setOperationStatus({operationStatus:"succeeded"}))
}