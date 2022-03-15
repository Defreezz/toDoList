import {RequestStatusType, TodolistType} from "../../../api";
import {FilterValuesType} from "./todolists-reducer";

// import * as actions from './todolist-actions'
//
// type ActionsType = typeof actions // actions
// type ActionCreatorsNamesType = keyof ActionsType // Object.keys(actions)[1] --> 'addTaskAC,'
// type ActionCreatorType = ActionsType[ActionCreatorsNamesType] // actions['addTaskAC'] -->  addTaskAC
// export type TodolistReducerActionsTypes = ReturnType<ActionCreatorType> //  addTaskAC()


export type SetTodolistsType = {
    payload: {
        todolists: Array<TodolistType>
    }
}
export type RemoveTodoListType = {
    payload: {
        id: string
    }
}
export type AddTodoListType = {
    payload: TodolistType
}
export type RenameTodoListType = {
    payload: {
        title: string
        id: string
    }
}
export type ChangeFilterTodoListType = {
    payload: {
        filter: FilterValuesType
        id: string
    }
}
export type changeTodolistEntityStatusType = {
    payload: {
        id: string,
        entityStatus: RequestStatusType
    }
}
export type reorderTodolistType = {
    payload: {
        id: string,
        order: number
    }
}