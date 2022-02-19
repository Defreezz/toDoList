import {todolistAPI, TodolistType} from "../../../api/api";
import {ThunkType} from "../../store/store";
import {TodolistReducerActionsTypes} from "./todolist-actions-types";
import {addTodoListAC, removeTodoListAC, renameTodoListAC, setTodolists} from "./todolist-actions";
import {setOperationStatus, setStatusApp, setStatusProgress} from "../ui-reducer/ui-actions";


export type FilterValuesType = "all" | "active" | "completed"

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}


export function todoListsReducer(todoLists: TodolistDomainType[] = [], action: TodolistReducerActionsTypes): TodolistDomainType[] {
    switch (action.type) {
        case 'SET-TODOLISTS':
            return action.todolists.map(tl => ({...tl, filter: 'all'}))
        case "REMOVE-TODOLIST":
            return [...todoLists.filter(t => t.id !== action.id)]
        case "ADD-TODOLIST":
            return [{
                ...action.payload,
                addedDate: "",
                order: 0,
                filter: "all"
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
        default:
            return todoLists
    }
}

//Thunk
export const getTodolists = (): ThunkType => async dispatch => {
    try {
        dispatch(setStatusApp("loading"))
        let progress = 0
        const timer = setInterval(() => {
            if (progress < 100) {
                progress += 10
                dispatch(setStatusProgress(progress))
            } else {
                clearInterval(timer)
                dispatch(setStatusApp("succeeded"))
            }
        }, 100)
        const response = await todolistAPI.getTodolists()
        dispatch(setTodolists(response))
    }
    catch (e){
        console.log(e)
    }

}
export const CreateTodolist = (title: string): ThunkType => async dispatch => {
    dispatch(setOperationStatus("loading"))
    const response = await todolistAPI.createTodolist(title)
    if (response.resultCode === 0) {
        //dispatch(getTodolists())}
        dispatch(addTodoListAC(title, response.data.item.id))
        dispatch(setOperationStatus("succeeded"))
    }
}
export const removeTodolist = (todolistID: string): ThunkType => async dispatch => {
    dispatch(setOperationStatus("loading"))
    const response = await todolistAPI.removeTodolist(todolistID)
    if (response.resultCode === 0) {
        //dispatch(getTodolists())
        dispatch(removeTodoListAC(todolistID))
        dispatch(setOperationStatus("succeeded"))
    }
}
export const renameTodolist = (todolistID: string, title: string): ThunkType => async dispatch => {
    dispatch(setOperationStatus("loading"))
    const response = await todolistAPI.renameTodolist(todolistID, title)
    if (response.resultCode === 0) {
        //dispatch(getTodolists())
        dispatch(renameTodoListAC(todolistID, title))
        dispatch(setOperationStatus("succeeded"))
    }
}
