import {ThunkType} from "../../store/store";
import {taskAPI, TaskStatuses, TaskType} from "../../../api/api";
import {addTaskAC, changeTaskEntityStatusAC, removeTaskAC, setTasks, updateTaskAC} from "./task-actions";
import {TaskReducerActionsTypes} from "./tasks-actions-types";
import {TodolistReducerActionsTypes} from "../todolist-reducer/todolist-actions-types";
import {setOperationStatus} from "../ui-reducer/ui-actions";
import {resultCodes} from "../../../definitions/result-codes";
import {handleServerAppError, handleServerNetworkError} from "../../../utils/errorUtils";


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
            let newTask: TaskType = {...action.task, title: action.title, status: TaskStatuses.New}
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

        case "ADD-TODOLIST"://заюзан ActionCreator из редьюсера тудулиста, для добавления пустого массива тасок
            return {
                ...tasks,
                [action.payload.id]: []
            }
        case "REMOVE-TODOLIST"://заюзан ActionCreator из редьюсера тудулиста, для удаления массива тасок
            let copyTasks = {...tasks}
            delete copyTasks[action.id]
            return copyTasks
        case "CHANGE-TASK-ENTITY-STATUS":
            return {
                ...tasks,
                [action.payload.todolistID]: tasks[action.payload.todolistID].map(
                    task => task.id === action.payload.taskID ? {
                        ...task,
                        entityTaskStatus: action.payload.entityStatus
                    } : task
                )
            }
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
    try {
        dispatch(setOperationStatus("loading"))
        const response = await taskAPI.addTask(todolistID, title)
        if (response.resultCode === resultCodes.success) {
            //dispatch(getTasks(todolistID))
            dispatch(addTaskAC(todolistID, response.data.item, title))
            dispatch(setOperationStatus("succeeded"))
        } else {
            handleServerAppError<{ item: TaskType }>(dispatch, response)
        }
    } catch (e: any) {
        handleServerNetworkError(dispatch, e.message)
    }

}
export const removeTask = (todolistID: string, taskID: string): ThunkType => async dispatch => {
    dispatch(setOperationStatus("loading"))
    dispatch(changeTaskEntityStatusAC(todolistID, taskID, "loading"))
    const response = await taskAPI.removeTask(todolistID, taskID)
    if (response.data.resultCode === resultCodes.success) {
        //dispatch(getTasks(todolistID))
        dispatch(removeTaskAC(todolistID, taskID))
        dispatch(setOperationStatus("succeeded"))
    }
}
export const updateTask = (todolistID: string, taskID: string, change: Partial<TaskType>): ThunkType =>
    async (dispatch, getState) => {
        dispatch(setOperationStatus("loading"))
        const currentTask = getState().tasks[todolistID].find(t => t.id === taskID) as TaskType
        try {
            const response = await taskAPI.updateTask(todolistID, taskID, {...currentTask, ...change})
            if (response.data.resultCode === resultCodes.success) {
                dispatch(updateTaskAC({...currentTask, ...change}))
                dispatch(setOperationStatus("succeeded"))
            } else {
                handleServerAppError<{ items: TaskType }>(dispatch, response.data)
            }
        }
        catch (e:any){
            handleServerNetworkError(dispatch,e.message)
        }
    }

