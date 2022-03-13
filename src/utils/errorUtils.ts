import {DispatchType} from "../redux/store/store";
import {CommonResponseType} from "../api";
import {setOperationStatus, setUiError} from "../redux/reducers/ui-reducer/ui-reducer";
import {ThunkActionDispatch} from "redux-thunk";

export  const handleServerNetworkError = (dispatch:ThunkActionDispatch<DispatchType>, message:string) => {
    dispatch(setUiError({error:message}))
    dispatch(setOperationStatus({operationStatus:"failed"}))
}

export  const handleServerAppError = <T> (dispatch:ThunkActionDispatch<DispatchType>, response:CommonResponseType<T>) => {
    if (response.messages.length) {
        dispatch(setUiError({error: response.messages[0]}))
    } else {
        dispatch(setUiError({error:'some error'}))
    }
    dispatch(setOperationStatus({operationStatus:"succeeded"}))
}