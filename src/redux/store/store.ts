import {applyMiddleware, combineReducers, createStore} from "redux";
import {tasksReducer} from "../reducers/task-reducer/tasks-reducer";
import {todoListsReducer} from "../reducers/todolist-reducer/todolists-reducer";
import thunkMiddleware, {ThunkAction} from "redux-thunk";
import {TodolistReducerActionsTypes} from "../reducers/todolist-reducer/todolist-actions-types";
import {TaskReducerActionsTypes} from "../reducers/task-reducer/tasks-actions-types";
import {ThemeActionsTypes, themeReducer} from "../reducers/theme-reducer/theme-reducer";
import {uiReducer} from "../reducers/ui-reducer/ui-reducer";
import {UiReducerActionsTypes} from "../reducers/ui-reducer/ui-actions-types";
import {AuthReducerActionsTypes} from "../reducers/auth-reducer/auth-actions-types";
import {authReducer} from "../reducers/auth-reducer/auth-reducer";

export type GlobalStateType = ReturnType<typeof rootReducer>

export type AllActionsType =
    | TodolistReducerActionsTypes
    | TaskReducerActionsTypes
    | ThemeActionsTypes
    | UiReducerActionsTypes
    | AuthReducerActionsTypes

export type ThunkType = ThunkAction<void, GlobalStateType, unknown, AllActionsType>

const rootReducer = combineReducers({
    todoLists: todoListsReducer,
    tasks: tasksReducer,
    ui:uiReducer,
    theme: themeReducer,
    auth: authReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))



// @ts-ignore
window.store = store