//import * as actions from './task-actions'

// type ActionsType = typeof actions
// type ActionCreatorsNamesType = keyof ActionsType
// type ActionCreatorType = ActionsType[ActionCreatorsNamesType]
// export type TaskReducerActionsTypes = ReturnType<ActionCreatorType>

import {RequestStatusType, TaskType} from "../../../api";

export type TaskStateType = {
    [key: string]: TaskType[]
}
export type ParamUpdateTask = {
    todolistID: string
    taskID: string
    changes: Partial<TaskType>
}

export type SetTasksType = {
    payload: {
        todolistID: string
        tasks: TaskType[]
    }
}
export type RemoveTaskType = {
    payload: {
        todolistID: string
        taskID: string
    }
}
export type AddTaskType = {
    payload: {
        todolistID: string
        title: string
        task: TaskType
    }
}
export type UpdateTaskType = {
    payload: {
        todolistID: string
        taskID: string
        changes:TaskType
    }
}
export type ChangeTaskEntityStatusType = {
    payload: {
        todolistID: string
        taskID: string
        entityStatus: RequestStatusType
    }
}