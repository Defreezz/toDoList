import {todolistAPI, TodolistType} from "../../../api/api";
import {ThunkType} from "../../store/store";
import {TodolistReducerActionsTypes} from "./todolist-actions-types";
import {
    addTodoListAC,
    changeTodolistEntityStatusAC,
    removeTodoListAC,
    renameTodoListAC,
    setTodolists
} from "./todolist-actions";
import {setInitializedApp, setOperationStatus} from "../ui-reducer/ui-actions";
import {RequestStatusType} from "../ui-reducer/ui-reducer";
import {resultCodes} from "../../../definitions/result-codes";
import {handleServerAppError, handleServerNetworkError} from "../../../utils/errorUtils";
import {getTasks} from "../task-reducer/tasks-reducer";


export type FilterValuesType = "all" | "active" | "completed"

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType

}


export function todoListsReducer(todoLists: TodolistDomainType[] = [], action: TodolistReducerActionsTypes): TodolistDomainType[] {
    switch (action.type) {
        case 'SET-TODOLISTS':
            return action.todolists.map(tl => ({...tl, filter: 'all',entityStatus:"idle"}))
        case "REMOVE-TODOLIST":
            return [...todoLists.filter(t => t.id !== action.id)]
        case "ADD-TODOLIST":
            return [{
                ...action.payload,
                addedDate: "",
                order: 0,
                filter: "all",
                entityStatus:"idle"
            },
                ...todoLists,]
        case "CHANGE-TODOLIST-TITLE":
            return [...todoLists.map(t => t.id === action.payload.id ? {
                ...t,
                title: action.payload.title
            } : t)]
        case "CHANGE-TODOLIST-FILTER":
            return [...todoLists.map(t => t.id === action.payload.id ? {
                ...t,
                filter: action.payload.filter
            } : t)]
        case "CHANGE-TODOLIST-ENTITY-STATUS":
            return [...todoLists.map(t => t.id === action.payload.id ?{
                ...t,
                entityStatus:action.payload.entityStatus
            }:t)]

        default:
            return todoLists
    }
}

//Thunk
export const getTodolists = (): ThunkType => async dispatch => {
    try {
        const response = await todolistAPI.getTodolists()
        dispatch(setTodolists(response))
        dispatch(setInitializedApp(true))
        response.forEach((ts)=>{
            dispatch(getTasks(ts.id))
        })
    } catch (e:any){
        dispatch(setInitializedApp(true))
        handleServerNetworkError(dispatch,e.message)
    }

}
export const CreateTodolist = (title: string): ThunkType => async dispatch => {
    try{
        dispatch(setOperationStatus("loading"))
        const response = await todolistAPI.createTodolist(title)
        if (response.resultCode === resultCodes.success) {
            //dispatch(getTodolists())}
            dispatch(addTodoListAC(title, response.data.item.id))
            dispatch(setOperationStatus("succeeded"))
        } else {
            handleServerAppError<{item:TodolistType}>(dispatch,response)
        }
    }
    catch (e:any) {
        handleServerNetworkError(dispatch,e.message)
    }

}
export const removeTodolist = (todolistID: string): ThunkType => async dispatch => {
    dispatch(changeTodolistEntityStatusAC(todolistID,"loading"))
    dispatch(setOperationStatus("loading"))
    const response = await todolistAPI.removeTodolist(todolistID)
    if (response.resultCode === resultCodes.success) {
        //dispatch(getTodolists())
        dispatch(removeTodoListAC(todolistID))
        dispatch(setOperationStatus("succeeded"))
    }
}
export const renameTodolist = (todolistID: string, title: string): ThunkType => async dispatch => {
    dispatch(setOperationStatus("loading"))
    const response = await todolistAPI.renameTodolist(todolistID, title)
    if (response.resultCode === resultCodes.success) {
        //dispatch(getTodolists())
        dispatch(renameTodoListAC(todolistID, title))
        dispatch(setOperationStatus("succeeded"))
    }
}
