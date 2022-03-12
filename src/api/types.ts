import {TaskPriorities, TaskStatuses} from '../api'

export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}
export type TaskType = {
    id: string
    title: string
    description?: string
    todoListId?: string
    order?: number
    status: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
    addedDate?: string
    entityTaskStatus?:RequestStatusType
}
export type UpdateTaskModelType = {

    title: string
    description: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
}
export type LoginParamsType = {
    email: string
    password: string
    rememberMe?: boolean
    captcha?: string
}
export type AuthMeResponseType = {
    id:number
    email: string
    login:string
}
export type CommonResponseType<T> = {
    data: T
    fieldsErrors: Array<string>
    messages: Array<string>
    resultCode: 0 | 1
}
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'