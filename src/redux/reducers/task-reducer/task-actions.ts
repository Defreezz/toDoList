import {TaskStatuses, TaskType} from "../../../api/api";

export const setTasks = (todolistID: string,tasks:TaskType[]) => {
    return {type: "SET-TASKS", todolistID,tasks} as const
}
export const removeTaskAC = (todolistID: string,taskID: string, ) => {
    return {type: "REMOVE-TASK", taskID, todolistID} as const
}
export const addTaskAC = ( todolistID: string,taskID:string,title: string,) => {
    return {type: "ADD-TASK", title, todolistID,taskID} as const
}
export const changeTaskStatusAC = (todolistID: string,taskID: string, status: TaskStatuses ) => {
    return {type: "CHANGE-TASK-STATUS", taskID, status, todolistID} as const
}
export const renameTaskAC = (todolistID: string,taskID: string, title: string) => {
    return {type: "CHANGE-TASK-TITLE", taskID, todolistID, title} as const
}