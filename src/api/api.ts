import axios from "axios";
import {
    AuthMeResponseType,
    CommonResponseType,
    LoginParamsType,
    TaskType,
    TodolistType,
    UpdateTaskModelType
} from "./types";


export const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    headers: {
        "API-KEY": "5c2085d8-160d-4f26-bb1a-d16aa4a1e991"
    }
})

export const todolistAPI = {
    async getTodolists() {
        const response = await instance.get<TodolistType[]>(`/todo-lists`)
        return response.data
    },
    async createTodolist(title: string) {
        const response = await instance.post<CommonResponseType<{ item: TodolistType }>>(
            `/todo-lists`,
            {title})
        return response.data
    },
    async removeTodolist(id: string) {
        const response = await instance.delete<CommonResponseType<{}>>(`/todo-lists/${id}`)
        return response.data
    },
    async renameTodolist(todolistID: string, title: string) {
        const response = await instance.put<CommonResponseType<{}>>(
            `/todo-lists/${todolistID}`,
            {title})
        return response.data
    },
    async reorderTodoList(todolistID: string, putAfterItemId: string) {
        const response = await instance.put<CommonResponseType<{}>>(
            `/todo-lists/${todolistID}/reorder`,
            {putAfterItemId})
        return response.data
    },
}

export const taskAPI = {
    async getTasks(todolistID: string) {
        return await instance.get<{ items: TaskType[], error: string, totalCount: number }>(
            `/todo-lists/${todolistID}/tasks`)
    },
    async addTask(todolistID: string, title: string) {
        const response = await instance.post<CommonResponseType<{ item: TaskType }>>(
            `/todo-lists/${todolistID}/tasks`,
            {title})
        return response.data
    },
    async removeTask(todolistID: string, taskID: string) {
        return await instance.delete<CommonResponseType<{}>>(`/todo-lists/${todolistID}/tasks/${taskID}`)
    },
    async renameTask(todolistID: string, taskID: string, title: string) {
        return await instance.put<CommonResponseType<{ items: TaskType }>>(
            `/todo-lists/${todolistID}/tasks/${taskID}`,
            {title})
    },
    async updateTask(todolistID: string, taskID: string, model: Partial<UpdateTaskModelType>) {
        return await instance.put<CommonResponseType<{ items: TaskType }>>(
            `/todo-lists/${todolistID}/tasks/${taskID}`,
            model)
    },
    async reorderTask(todolistID: string, taskID: string, putAfterItemId: string) {
        const response = await instance.put<CommonResponseType<{}>>(
            `/todo-lists/${todolistID}/tasks/${taskID}/reorder`,
            {putAfterItemId})
        return response.data
    },
}

export const authAPI = {
    async me() {
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