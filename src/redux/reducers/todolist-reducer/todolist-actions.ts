import {FilterValuesType} from "./todolists-reducer";
import {RequestStatusType, TodolistType} from "../../../api";


export const setTodolists = (todolists: Array<TodolistType>) => {
    return {type: "SET-TODOLISTS", todolists} as const
}
export const removeTodoListAC = (id: string) => {
    return {type: "REMOVE-TODOLIST", id} as const
}
export const addTodoListAC = (title: string,id:string) => {
    return {type: "ADD-TODOLIST", payload: {title, id}} as const
}
export const renameTodoListAC = (id: string, title: string) => {
    return {type: "CHANGE-TODOLIST-TITLE", payload: {id, title}} as const
}
export const changeFilterTodoListAC = (filter: FilterValuesType, id: string) => {
    return {type: "CHANGE-TODOLIST-FILTER", payload: {id, filter}} as const
}
export const changeTodolistEntityStatusAC = (id: string,entityStatus:RequestStatusType) => {
    return {type: "CHANGE-TODOLIST-ENTITY-STATUS", payload: {id, entityStatus}} as const
}