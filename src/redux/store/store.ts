import {applyMiddleware, combineReducers, createStore} from "redux";
import {tasksReducer} from "../reducers/task-reducer/tasks-reducer";
import {todoListsReducer} from "../reducers/todolist-reducer/todolists-reducer";
import thunkMiddleware, {ThunkAction} from "redux-thunk";
import {TodolistReducerActionType} from "../reducers/todolist-reducer/todolist-actions-types";
import {TaskReducerActionType} from "../reducers/task-reducer/tasks-actions-types";

export type GlobalStateType = ReturnType<typeof rootReducer>

export type AllActionsType =
    | TodolistReducerActionType
    | TaskReducerActionType

export type ThunkType = ThunkAction<void, GlobalStateType, unknown, AllActionsType>

const rootReducer = combineReducers({
    todoLists: todoListsReducer,
    tasks: tasksReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))



// @ts-ignore
window.store = store