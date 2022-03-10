import axios from "axios";
import {RequestStatusType} from "../redux/reducers/ui-reducer/ui-reducer";


export const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    headers: {
        //"API-KEY": "b701020f-78a1-4daa-8002-6ee349adc8a0"
    }
})

export enum TaskStatuses {
    New,
    InProgress,
    Completed,
    Draft,
}

export enum TaskPriorities {
    Low,
    Middle,
    High,
    Urgently,
    Later,
}

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


export const todolistAPI = {
    async getTodolists() {
        const response = await instance.get<TodolistType[]>(`/todo-lists`)
        return response.data
    },
    async createTodolist(title: string) {
        const response = await instance.post<CommonResponseType<{ item: TodolistType }>>(`/todo-lists`, {title})
        return response.data
    },
    async removeTodolist(todolistID: string) {
        const response = await instance.delete<CommonResponseType<{}>>(`/todo-lists/${todolistID}`)
        return response.data
    },
    async renameTodolist(todolistID: string, title: string) {
        const response = await instance.put<CommonResponseType<{}>>(`/todo-lists/${todolistID}`, {title})
        return response.data
    }
}

export const taskAPI = {
    async getTasks(todolistID: string) {
        return await instance.get<{ items: TaskType[], error: string, totalCount: number }>(`/todo-lists/${todolistID}/tasks`)

    },
    async addTask(todolistID: string, title: string) {
        const response = await instance.post<CommonResponseType<{ item: TaskType }>>(`/todo-lists/${todolistID}/tasks`, {title})
        return response.data
    },
    async removeTask(todolistID: string, taskID: string) {
        return await instance.delete<CommonResponseType<{}>>(`/todo-lists/${todolistID}/tasks/${taskID}`)
    },
    async renameTask(todolistID: string, taskID: string, title: string) {
        return await instance.put<CommonResponseType<{ items: TaskType }>>(`/todo-lists/${todolistID}/tasks/${taskID}`, {title})
    },
    async updateTask(todolistID: string, taskID: string, model: Partial<UpdateTaskModelType>) {
        return await instance.put<CommonResponseType<{ items: TaskType }>>(`/todo-lists/${todolistID}/tasks/${taskID}`, model)
    },
}

export const authAPI = {
    async me () {
        const response = await instance.get<CommonResponseType<AuthMeResponseType>>(`/auth/me`)
        return response.data
    },
    async login(data: LoginParamsType) {
        const response = await instance.post<CommonResponseType<{ userId: number }>>(`/auth/login`, data)
        return response.data
    },
    async logout() {
        const response = await instance.delete<CommonResponseType<{}>>(`/auth/login`)
        return response.data
    },
}