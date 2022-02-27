import {TaskType} from "../../../api/api";
import {RequestStatusType} from "../ui-reducer/ui-reducer";

export const setTasks = (todolistID: string,tasks:TaskType[]) => {
    return {type: "SET-TASKS", todolistID,tasks} as const
}
export const removeTaskAC = (todolistID: string,taskID: string, ) => {
    return {type: "REMOVE-TASK", taskID, todolistID} as const
}
export const addTaskAC = ( todolistID: string,task:TaskType,title: string,) => {
    return {type: "ADD-TASK", title, todolistID,task} as const
}
export const updateTaskAC = (updateTask: TaskType ) => {
    return {type: "UPDATE-TASK", updateTask} as const
}
export const changeTaskEntityStatusAC = (todolistID: string,taskID:string,entityStatus:RequestStatusType) => {
    return {type: "CHANGE-TASK-ENTITY-STATUS", payload: {todolistID,taskID,entityStatus}} as const
}
// export const renameTaskAC = (todolistID: string,taskID: string, title: string) => {
//     return {type: "CHANGE-TASK-TITLE", taskID, todolistID, title} as const
// }