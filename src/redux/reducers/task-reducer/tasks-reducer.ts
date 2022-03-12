import {resultCodes} from "../../../definitions/result-codes";
import {handleServerAppError, handleServerNetworkError} from "../../../utils";
import {taskAPI, TaskStatuses, TaskType} from "../../../api";
import {setOperationStatus} from "../ui-reducer/ui-reducer";
import {createSlice} from "@reduxjs/toolkit";
import {
    AddTaskType,
    ChangeTaskEntityStatusType,
    RemoveTaskType,
    SetTasksType,
    UpdateTaskType
} from "./task-actions-types";
import {addTodoList, removeTodoList, setTodolists} from "../todolist-reducer/todolists-reducer";


export type TaskStateType = {
    [key: string]: TaskType[]
}

const slice = createSlice({
    name: 'tasks',
    initialState: {} as TaskStateType,
    reducers: {
        setTasks(state, action: SetTasksType) {
            state[action.payload.todolistID] = action.payload.tasks
        },
        deleteTask(state, action: RemoveTaskType) {
            const tasks = state[action.payload.todolistID]
            const index = tasks.findIndex(t => t.id === action.payload.taskID)
            tasks.splice(index, 1)
        },
        addNewTask(state, action: AddTaskType) {
            debugger
            const newTask: TaskType = {
                ...action.payload.task,
                title: action.payload.title,
                status: TaskStatuses.New
            }
            state[action.payload.todolistID].unshift(newTask)
        },
        modifyTask(state, action: UpdateTaskType) {
            const tasks = state[action.payload.todolistID]
            const index = tasks.findIndex(t => t.id === action.payload.taskID)
            tasks[index] = {...action.payload.updateTask}
        },
        changeTaskEntityStatus(state, action: ChangeTaskEntityStatusType) {
            const tasks = state[action.payload.todolistID]
            const index = tasks.findIndex(t => t.id = action.payload.taskID)
            tasks[index].entityTaskStatus = action.payload.entityStatus
        },
    },
    extraReducers: (builder) => {
        builder.addCase(setTodolists, (state, action) => {
            action.payload.todolists.forEach(tl => state[tl.id] = [])
        })
        builder.addCase(addTodoList, (state, action) => {
            state[action.payload.id] = []
        })
        builder.addCase(removeTodoList, (state, action) => {
            delete state[action.payload.id]
        })
    }
})


export const {changeTaskEntityStatus, setTasks, deleteTask, addNewTask, modifyTask} = slice.actions
export const tasksReducer = slice.reducer


//Thunk
export const updateTask = (todolistID: string, taskID: string, change: Partial<TaskType>) =>
    async (dispatch: any, getState: any) => {
        dispatch(setOperationStatus({operationStatus: "loading"}))
        const currentTask = getState().tasks[todolistID].find((t: TaskType) => t.id === taskID) as TaskType
        try {
            const response = await taskAPI.updateTask(todolistID, taskID, {...currentTask, ...change})
            if (response.data.resultCode === resultCodes.success) {
                dispatch(modifyTask({todolistID,taskID,updateTask: {...currentTask, ...change}}))
                console.log({...currentTask, ...change})
                dispatch(setOperationStatus({operationStatus: "succeeded"}))
            } else {
                handleServerAppError<{ items: TaskType }>(dispatch, response.data)
            }
        } catch (e: any) {
            handleServerNetworkError(dispatch, e.message)
        }
    }
export const getTasks = (todolistID: string) => async (dispatch: any) => {
    const response = await taskAPI.getTasks(todolistID)
    if (response.data.error === null) {
        dispatch(setTasks({todolistID, tasks: response.data.items}))
    }
}
export const addTask = (todolistID: string, title: string) => async (dispatch: any) => {
    try {
        dispatch(setOperationStatus({operationStatus: "loading"}))
        const response = await taskAPI.addTask(todolistID, title)
        if (response.resultCode === resultCodes.success) {
            //dispatch(getTasks(todolistID))
            dispatch(addNewTask({todolistID, task: response.data.item, title}))
            dispatch(setOperationStatus({operationStatus: "succeeded"}))
        } else {
            handleServerAppError<{ item: TaskType }>(dispatch, response)
        }
    } catch (e: any) {
        handleServerNetworkError(dispatch, e.message)
    }

}
export const removeTask = (todolistID: string, taskID: string) => async (dispatch: any) => {
    dispatch(setOperationStatus({operationStatus: "loading"}))
    dispatch(changeTaskEntityStatus({todolistID, taskID, entityStatus: "loading"}))
    const response = await taskAPI.removeTask(todolistID, taskID)
    if (response.data.resultCode === resultCodes.success) {
        //dispatch(getTasks(todolistID))
        dispatch(deleteTask({todolistID, taskID}))
        dispatch(setOperationStatus({operationStatus: "succeeded"}))
    }
}

// export function _tasksReducer(tasks: TaskStateType = {}, action: any): TaskStateType {
//     switch (action.type) {
//         case 'SET-TODOLISTS': {
//             const tasksCopy = {...tasks}
//             action.todolists.forEach((tl: TodolistType) => {
//                 tasksCopy[tl.id] = []
//             })
//             return tasksCopy;
//         }
//         case "SET-TASKS":
//             return {
//                 ...tasks,
//                 [action.todolistID]: [...action.tasks]
//             }
//         case "REMOVE-TASK":
//             return {
//                 ...tasks,
//                 [action.todolistID]: tasks[action.todolistID].filter(task => task.id !== action.taskID)
//             }
//         case "ADD-TASK":
//             let newTask: TaskType = {...action.task, title: action.title, status: TaskStatuses.New}
//             return {
//                 ...tasks,
//                 [action.todolistID]: [newTask, ...tasks[action.todolistID]]
//             }
//         case "UPDATE-TASK":
//             return {
//                 ...tasks,
//                 [action.updateTask.todoListId!]: tasks[action.updateTask.todoListId!].map(
//                     task => task.id === action.updateTask.id ? action.updateTask : task
//                 )
//             }
//
//         case "ADD-TODOLIST"://заюзан ActionCreator из редьюсера тудулиста, для добавления пустого массива тасок
//             return {
//                 ...tasks,
//                 [action.payload.id]: []
//             }
//         case "REMOVE-TODOLIST"://заюзан ActionCreator из редьюсера тудулиста, для удаления массива тасок
//             let copyTasks = {...tasks}
//             delete copyTasks[action.id]
//             return copyTasks
//         case "CHANGE-TASK-ENTITY-STATUS":
//             return {
//                 ...tasks,
//                 [action.payload.todolistID]: tasks[action.payload.todolistID].map(
//                     task => task.id === action.payload.taskID ? {
//                         ...task,
//                         entityTaskStatus: action.payload.entityStatus
//                     } : task
//                 )
//             }
//         default:
//             return tasks
//     }
// }
