import {setOperationStatus, setUiError} from "../redux/reducers/ui-reducer/ui-actions";
import {Dispatch} from "redux";
import {AllActionsType} from "../redux/store/store";
import {CommonResponseType} from "../api/api";

export  const handleServerNetworkError = (dispatch:Dispatch<AllActionsType>,message:string) => {
    dispatch(setUiError(message))
    dispatch(setOperationStatus("failed"))
}

export  const handleServerAppError = <T> (dispatch:Dispatch<AllActionsType>,response:CommonResponseType<T>) => {
    if (response.messages.length) {
        dispatch(setUiError(response.messages[0]))
    } else {
        dispatch(setUiError('some error'))
    }
    dispatch(setOperationStatus("succeeded"))
}