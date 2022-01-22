
import {v1} from "uuid";
import {addTodoListAC, removeTodoListAC, todolistID_1, todolistID_2} from "./todolists-reducer";

export type ActionTaskReducerType =
    ReturnType<typeof removeTaskAC> |
    ReturnType<typeof addTaskAC> |
    ReturnType<typeof changeTaskStatusAC> |
    ReturnType<typeof changeTaskTitleAC>|
    ReturnType<typeof addTodoListAC> |
    ReturnType<typeof removeTodoListAC>

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type TaskStateType = {
    [key: string]: TaskType[]
}

const initialState:TaskStateType = {
    // [todolistID_1]: [
    //     {id: v1(), title: "HTML", isDone: false},
    //     {id: v1(), title: "Css", isDone: false},
    //     {id: v1(), title: "Redux", isDone: true}
    // ],
    // [todolistID_2]: [
    //     {id: v1(), title: "Milk", isDone: false},
    //     {id: v1(), title: "Bear", isDone: false},
    //     {id: v1(), title: "Fish", isDone: true}
    // ]
}

export function  tasksReducer (tasks:TaskStateType = initialState,action:ActionTaskReducerType):TaskStateType {
    switch (action.type) {
        case "REMOVE-TASK":
            return {
                ...tasks,
                [action.payload.todoListID]:tasks[action.payload.todoListID].filter(task => task.id !== action.payload.id)
            }
        case "ADD-TASK":
            let newTask:TaskType  = {id: v1(), title: action.payload.title,isDone:false}
            return {
                ...tasks,
                [action.payload.todoListID]:[newTask,...tasks[action.payload.todoListID]]
            }
        case "CHANGE-TASK-STATUS":
            return {
                ...tasks,
                [action.payload.todoListID]:tasks[action.payload.todoListID].map(
                    task => task.id === action.payload.id?{...task,isDone:action.payload.isDone}:task
                )
            }
        case "CHANGE-TASK-TITLE":
            return {
                ...tasks,
                [action.payload.todoListID]:tasks[action.payload.todoListID].map(
                    task => task.id === action.payload.id?{...task,title:action.payload.title}:task
                )
            }

            //actionЫ todoList-reducer(при добавлениии/удалении тудулиста
            // добавляет пустой массив тасок/удаляет массив тасок
            // ключ(id) создается в ActionCreator todoList-reducer
        case "ADD-TODOLIST"://заюзан ActionCreator из редьюсера тудулиста, для добавления пустого массива тасок
            return {
                ...tasks,
                [action.payload.todolistId]:[]
            }
        case "REMOVE-TODOLIST"://заюзан ActionCreator из редьюсера тудулиста, для удаления массива тасок
            let copyTasks = {...tasks}
            delete copyTasks[action.id]
            return copyTasks
        default:
            return tasks
    }
}

export const removeTaskAC =(id:string,todoListID:string)=>{
    return {type:"REMOVE-TASK", payload:{id, todoListID}} as const
}
export const addTaskAC =(title:string,todoListID:string)=>{
    return {type:"ADD-TASK", payload:{title,todoListID}} as const
}
export const changeTaskStatusAC =(id:string,isDone:boolean, todoListID:string, )=>{
    return {type:"CHANGE-TASK-STATUS", payload:{id,isDone,todoListID}} as const
}
export const changeTaskTitleAC =( id:string,todoListID:string,title:string)=>{
    return {type:"CHANGE-TASK-TITLE", payload:{ id, todoListID,title}} as const
}
