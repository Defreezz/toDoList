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
            let inputTodoList:TodoListType  = {id:action.payload.todolistId, title: action.payload.title,filter: "all"}
            return [...todoLists,inputTodoList]
        case "CHANGE-TODOLIST-TITLE":
            return [...todoLists.map(t => t.id === action.payload.id? {...t,title:action.payload.title}:t)]
        case "CHANGE-TODOLIST-FILTER":
            return [...todoLists.map(t => t.id === action.payload.id? {...t,filter:action.payload.filter}:t)]
        default:
            throw new Error("error")
    }
}

export const removeTodoListAC =(todoListID:string)=>{
    return {type:"REMOVE-TODOLIST", id: todoListID} as const
}
export const addTodoListAC =(title:string)=>{
    return {type:"ADD-TODOLIST", payload:{title,todolistId:v1()}} as const
}
export const renameTodoListAC =(todoListID:string, title:string)=>{
    return {type:"CHANGE-TODOLIST-TITLE", payload:{id: todoListID, title}} as const
}
export const changeFilterTodoListAC =(todoListID:string, filter:string)=>{
    return {type:"CHANGE-TODOLIST-FILTER", payload:{ id: todoListID, filter}} as const
}
