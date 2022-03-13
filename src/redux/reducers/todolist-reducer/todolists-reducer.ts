import {resultCodes} from "../../../definitions/result-codes";
import {handleServerAppError, handleServerNetworkError} from "../../../utils";
import {getTasks} from "../task-reducer/tasks-reducer";
import {RequestStatusType, todolistAPI, TodolistType} from "../../../api";
import {setInitializedApp, setOperationStatus} from "../ui-reducer/ui-reducer";
import {createSlice} from "@reduxjs/toolkit";
import {
    AddTodoListType,
    ChangeFilterTodoListType,
    changeTodolistEntityStatusType,
    RemoveTodoListType,
    RenameTodoListType,
    SetTodolistsType
} from "./todolist-actions-types";
import {DispatchType} from "../../store/store";
import {ThunkActionDispatch} from "redux-thunk";

export type FilterValuesType = "all" | "active" | "completed"
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}

const slice = createSlice({
    name: 'todoLists',
    initialState: [] as TodolistDomainType[],
    reducers: {
        setTodolists(state, action: SetTodolistsType) {
           return  action.payload.todolists.map<TodolistDomainType>(tl => ({...tl,entityStatus:'idle', filter: 'all'}))
        },
        removeTodoList(state, action: RemoveTodoListType) {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            state.splice(index, 1)
        },
        addTodoList(state, action: AddTodoListType) {
            state.unshift({
                ...action.payload,
                addedDate: "",
                order: 0,
                filter: "all",
                entityStatus: "idle"
            })
        },
        renameTodoList(state, action: RenameTodoListType) {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            state[index].title = action.payload.title
        },
        changeFilterTodoList(state, action: ChangeFilterTodoListType) {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            state[index].filter = action.payload.filter
        },
        changeTodolistEntityStatus(state, action: changeTodolistEntityStatusType) {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            state[index].entityStatus = action.payload.entityStatus
        },
    },
})

export const {
    changeFilterTodoList,
    removeTodoList,
    renameTodoList,
    addTodoList,
    changeTodolistEntityStatus,
    setTodolists
} = slice.actions
export const todoListsReducer = slice.reducer


//Thunk
export const getTodolists = () => async (dispatch: ThunkActionDispatch<DispatchType>) => {

    try {
        const response = await todolistAPI.getTodolists()
        console.log(response)
        dispatch(setTodolists({todolists: response}))
        //dispatch(setInitializedApp({initializeStatus: true}))
        response.forEach((ts) => {
            dispatch(getTasks(ts.id))
        })
    } catch (e: any) {
        dispatch(setInitializedApp({initializeStatus: true}))
        handleServerNetworkError(dispatch, e.message)
    }

}
export const CreateTodolist = (title: string) => async (dispatch: ThunkActionDispatch<DispatchType>) => {
    try {
        dispatch(setOperationStatus({operationStatus: "loading"}))
        const response = await todolistAPI.createTodolist(title)
        if (response.resultCode === resultCodes.success) {
            //dispatch(getTodolists())}
            dispatch(addTodoList({title, id: response.data.item.id}))
            dispatch(setOperationStatus({operationStatus: "succeeded"}))
        } else {
            handleServerAppError<{ item: TodolistType }>(dispatch, response)
        }
    } catch (e: any) {
        handleServerNetworkError(dispatch, e.message)
    }

}
export const removeTodolist = (id: string) => async (dispatch: ThunkActionDispatch<DispatchType>) => {
    dispatch(changeTodolistEntityStatus({id, entityStatus: "loading"}))
    dispatch(setOperationStatus({operationStatus: "loading"}))
    const response = await todolistAPI.removeTodolist(id)
    if (response.resultCode === resultCodes.success) {
        //dispatch(getTodolists())
        dispatch(removeTodoList({id}))
        dispatch(setOperationStatus({operationStatus: "succeeded"}))
    }
}
export const renameTodolist = (id: string, title: string) => async (dispatch: ThunkActionDispatch<DispatchType>) => {
    dispatch(setOperationStatus({operationStatus: "loading"}))
    const response = await todolistAPI.renameTodolist(id, title)
    if (response.resultCode === resultCodes.success) {
        //dispatch(getTodolists())
        dispatch(renameTodoList({id, title}))
        dispatch(setOperationStatus({operationStatus: "succeeded"}))
    }
}

//
// export function _todoListsReducer(todoLists: TodolistDomainType[] = [], action: TodolistReducerActionsTypes): TodolistDomainType[] {
//     switch (action.type) {
//         case 'SET-TODOLISTS':
//             return action.todolists.map(tl => ({...tl, filter: 'all', entityStatus: "idle"}))
//         case "REMOVE-TODOLIST":
//             return [...todoLists.filter(t => t.id !== action.id)]
//         case "ADD-TODOLIST":
//             return [{
//                 ...action.payload,
//                 addedDate: "",
//                 order: 0,
//                 filter: "all",
//                 entityStatus: "idle"
//             },
//                 ...todoLists,]
//         case "CHANGE-TODOLIST-TITLE":
//             return [...todoLists.map(t => t.id === action.payload.id ? {
//                 ...t,
//                 title: action.payload.title
//             } : t)]
//         case "CHANGE-TODOLIST-FILTER":
//             return [...todoLists.map(t => t.id === action.payload.id ? {
//                 ...t,
//                 filter: action.payload.filter
//             } : t)]
//         case "CHANGE-TODOLIST-ENTITY-STATUS":
//             return [...todoLists.map(t => t.id === action.payload.id ? {
//                 ...t,
//                 entityStatus: action.payload.entityStatus
//             } : t)]
//
//         default:
//             return todoLists
//     }
// }