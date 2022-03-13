import {resultCodes} from "../../../definitions/result-codes";
import {handleServerAppError, handleServerNetworkError} from "../../../utils";
import {taskAPI, TaskStatuses, TaskType} from "../../../api";
import {setOperationStatus} from "../ui-reducer/ui-reducer";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {
    AddTaskType,
    ChangeTaskEntityStatusType,
    ParamUpdateTask,
    RemoveTaskType,
    TaskStateType,
    UpdateTaskType
} from "./task-types";
import {addTodoList, removeTodoList, setTodolists} from "../todolist-reducer/todolists-reducer";
import {DispatchType, GlobalStateType} from "../../store/store";
import {ThunkActionDispatch} from "redux-thunk";


export const getTasks = createAsyncThunk('tasks/getTasks', async (
    todolistID: string, thunk) => {
    const {dispatch} = thunk
    try {
        dispatch(setOperationStatus({operationStatus: "loading"}))
        const response = await taskAPI.getTasks(todolistID)
        return {todolistID, tasks: response.data.items}
    } catch (error) {
        return {todolistID, tasks: []}
    } finally {
        dispatch(setOperationStatus({operationStatus: "succeeded"}))
    }
})

export const updateTask = createAsyncThunk<ParamUpdateTask, ParamUpdateTask,
    {
        dispatch: ThunkActionDispatch<DispatchType>
        state: GlobalStateType
    }>
('tasks/updateTask', async (
    param, thunk) => {
    const {taskID, todolistID, changes} = param
    const {dispatch, getState} = thunk
    try {
        dispatch(setOperationStatus({operationStatus: "loading"}))
        const currentTask = getState().tasks[todolistID].find((t: TaskType) => t.id === taskID) as TaskType
        await taskAPI.updateTask(todolistID, taskID, {...currentTask, ...changes})
        dispatch(setOperationStatus({operationStatus: "succeeded"}))
        return {
            todolistID: todolistID,
            taskID: taskID,
            changes: {...currentTask, ...changes}
        }

    } catch (error) {
        return {
            todolistID: todolistID,
            taskID: taskID,
            changes: {...changes}
        }
    }
})

const slice = createSlice({
    name: 'tasks',
    initialState: {} as TaskStateType,
    reducers: {
        deleteTask(state, action: RemoveTaskType) {
            const tasks = state[action.payload.todolistID]
            const index = tasks.findIndex(t => t.id === action.payload.taskID)
            tasks.splice(index, 1)
        },
        addNewTask(state, action: AddTaskType) {
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
            tasks[index] = {...action.payload.changes}
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
        builder.addCase(getTasks.fulfilled, (state, action) => {
            state[action.payload.todolistID] = action.payload.tasks
        })
        builder.addCase(updateTask.fulfilled, (state, action) => {
            const tasks = state[action.payload.todolistID]
            const index = tasks.findIndex(t => t.id === action.payload.taskID)
            tasks[index] = {...action.payload.changes} as TaskType
        })

    }
})
export const {changeTaskEntityStatus, deleteTask, addNewTask, modifyTask} = slice.actions
export const tasksReducer = slice.reducer


//Thunk

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

// export const _updateTask = (todolistID: string, taskID: string, change: Partial<TaskType>) =>
//     async (dispatch: any, getState: any) => {
//         dispatch(setOperationStatus({operationStatus: "loading"}))
//         const currentTask = getState().tasks[todolistID].find((t: TaskType) => t.id === taskID) as TaskType
//         try {
//             const response = await taskAPI.updateTask(todolistID, taskID, {...currentTask, ...change})
//             if (response.data.resultCode === resultCodes.success) {
//                 dispatch(modifyTask({todolistID, taskID, changes: {...currentTask, ...change}}))
//                 dispatch(setOperationStatus({operationStatus: "succeeded"}))
//             } else {
//                 handleServerAppError<{ items: TaskType }>(dispatch, response.data)
//             }
//         } catch (e: any) {
//             handleServerNetworkError(dispatch, e.message)
//         }
//     }