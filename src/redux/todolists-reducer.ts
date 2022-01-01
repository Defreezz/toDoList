import {TodoListType} from "../App";
import {v1} from "uuid";

type ActionType =
    ReturnType<typeof removeTodoListAC> |
    ReturnType<typeof addTodoListAC> |
    ReturnType<typeof renameTodoListAC> |
    ReturnType<typeof changeFilterTodoListAC>

export function  todoListsReducer (todoLists:TodoListType[],action:ActionType) {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return [...todoLists.filter(t => t.id !== action.id)]
        case "ADD-TODOLIST":
            let inputTodoList:TodoListType  = {id: v1(), title: action.title,filter: "all"}
            return [...todoLists,inputTodoList]
        case "CHANGE-TODOLIST-TITLE":
            return [...todoLists.map(t => t.id === action.payload.id? {...t,title:action.payload.title}:t)]
        case "CHANGE-TODOLIST-FILTER":
            return [...todoLists.map(t => t.id === action.payload.id? {...t,filter:action.payload.filter}:t)]
        default:
            throw new Error("error")
    }
}

export const removeTodoListAC =(id:string)=>{
    return {type:"REMOVE-TODOLIST", id} as const
}
export const addTodoListAC =(title:string)=>{
    return {type:"ADD-TODOLIST", title} as const
}
export const renameTodoListAC =(id:string, title:string)=>{
    return {type:"CHANGE-TODOLIST-TITLE", payload:{id, title}} as const
}
export const changeFilterTodoListAC =( id:string,filter:string)=>{
    return {type:"CHANGE-TODOLIST-FILTER", payload:{ id, filter}} as const
}
