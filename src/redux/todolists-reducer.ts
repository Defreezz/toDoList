import {v1} from "uuid";

export type ActionsTodoListReducerType =
    ReturnType<typeof removeTodoListAC> |
    ReturnType<typeof addTodoListAC> |
    ReturnType<typeof renameTodoListAC> |
    ReturnType<typeof changeFilterTodoListAC>
export type FilterValuesType = "all" | "active" | "completed"
export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type InitialStateType = TodoListType[]

export const todolistID_1 = v1()
export const todolistID_2 = v1()
const initialState:InitialStateType = [
    // {id: todolistID_1, title: 'What to learn', filter: "all"},
    // {id: todolistID_2, title: 'What to buy', filter: "all"},
]

export function  todoListsReducer (todoLists:InitialStateType = initialState,action:ActionsTodoListReducerType):InitialStateType {
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
            return todoLists
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
export const changeFilterTodoListAC =(filter:FilterValuesType, todoListID:string)=>{
    return {type:"CHANGE-TODOLIST-FILTER", payload:{ id: todoListID, filter}} as const
}
