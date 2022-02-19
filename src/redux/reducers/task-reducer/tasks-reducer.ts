import {AllActionsType, ThunkType} from "../../store/store";
import {taskAPI, TaskStatuses, TaskType} from "../../../api/api";
import {addTaskAC, removeTaskAC, setTasks, updateTaskAC} from "./task-actions";
import {TaskReducerActionsTypes} from "./tasks-actions-types";
import {TodolistReducerActionsTypes} from "../todolist-reducer/todolist-actions-types";


export type TaskStateType = {
    [key: string]: TaskType[]
}

export function tasksReducer(tasks: TaskStateType = {}, action: TaskReducerActionsTypes | TodolistReducerActionsTypes): TaskStateType {
    switch (action.type) {
        case 'SET-TODOLISTS': {
            const tasksCopy = {...tasks}
            action.todolists.forEach((tl) => {
                tasksCopy[tl.id] = []
            })
            return tasksCopy;
        }
        case "SET-TASKS":
            return {
                ...tasks,
                [action.todolistID]: [...action.tasks]
            }
        case "REMOVE-TASK":
            return {
                ...tasks,
                [action.todolistID]: tasks[action.todolistID].filter(task => task.id !== action.taskID)
            }
        case "ADD-TASK":
            let newTask: TaskType = {...action.task,title: action.title, status: TaskStatuses.New}
            return {
                ...tasks,
                [action.todolistID]: [newTask, ...tasks[action.todolistID]]
            }
        case "UPDATE-TASK":
            return {
                ...tasks,
                [action.updateTask.todoListId!]: tasks[action.updateTask.todoListId!].map(
                    task => task.id === action.updateTask.id ? action.updateTask : task
                )
            }
        // case "CHANGE-TASK-TITLE":
        //     return {
        //         ...tasks,
        //         [action.todolistID]: tasks[action.todolistID].map(
        //             task => task.id === action.taskID ? {...task, title: action.title} : task
        //         )
        //     }

        //actionЫ todoList-reducer(при добавлениии/удалении тудулиста
        // добавляет пустой массив тасок/удаляет массив тасок
        // ключ(id) создается в ActionCreator todoList-reducer
        case "ADD-TODOLIST"://заюзан ActionCreator из редьюсера тудулиста, для добавления пустого массива тасок
            return {
                ...tasks,
                [action.payload.id]: []
            }
        case "REMOVE-TODOLIST"://заюзан ActionCreator из редьюсера тудулиста, для удаления массива тасок
            let copyTasks = {...tasks}
            delete copyTasks[action.id]
            return copyTasks
        default:
            return tasks
    }
}

//Thunk
export const getTasks = (todolistID: string): ThunkType => async dispatch => {
    const response = await taskAPI.getTasks(todolistID)
    if (response.data.error === null) {
        dispatch(setTasks(todolistID, response.data.items))
    }
}
export const addTask = (todolistID: string, title: string): ThunkType => async dispatch => {
    const response = await taskAPI.addTask(todolistID, title)
    if (response.data.resultCode === 0) {
        //dispatch(getTasks(todolistID))
        dispatch(addTaskAC(todolistID, response.data.data.item, title))
    }
}
export const removeTask = (todolistID: string, taskID: string): ThunkType => async dispatch => {
    const response = await taskAPI.removeTask(todolistID, taskID)
    if (response.data.resultCode === 0) {
        //dispatch(getTasks(todolistID))
        dispatch(removeTaskAC(todolistID, taskID))
    }
}
// export const renameTask = (todolistID: string, taskID: string, title: string): ThunkType => async dispatch => {
//     const response = await taskAPI.renameTask(todolistID, taskID, title)
//     if (response.data.resultCode === 0) {
//         //dispatch(getTasks(todolistID))
//         dispatch(renameTaskAC(todolistID, taskID, title))
//     }
// }
export const updateTask = (todolistID: string, taskID: string, change:Partial<TaskType>): ThunkType =>
    async (dispatch, getState) => {
    const currentTask = getState().tasks[todolistID].find(t => t.id === taskID) as TaskType

        const response = await taskAPI.updateTask(todolistID, taskID, {...currentTask,...change})
        if (response.data.resultCode === 0) {
            //dispatch(getTasks(todolistID))
            dispatch(updateTaskAC({...currentTask,...change}))
        }
    }
