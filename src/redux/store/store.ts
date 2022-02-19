import {applyMiddleware, combineReducers, createStore} from "redux";
import {tasksReducer} from "../reducers/task-reducer/tasks-reducer";
import {todoListsReducer} from "../reducers/todolist-reducer/todolists-reducer";
import thunkMiddleware, {ThunkAction} from "redux-thunk";
import {TodolistReducerActionsTypes} from "../reducers/todolist-reducer/todolist-actions-types";
import {TaskReducerActionsTypes} from "../reducers/task-reducer/tasks-actions-types";
import {ThemeActionsTypes, themeReducer} from "../reducers/theme-reducer/theme-reducer";
import {uiReducer} from "../reducers/ui-reducer/ui-reducer";
import {UiReducerActionsTypes} from "../reducers/ui-reducer/ui-actions-types";

export type GlobalStateType = ReturnType<typeof rootReducer>

export type AllActionsType =
    | TodolistReducerActionsTypes
    | TaskReducerActionsTypes
    | ThemeActionsTypes
    | UiReducerActionsTypes

export type ThunkType = ThunkAction<void, GlobalStateType, unknown, AllActionsType>

const rootReducer = combineReducers({
    todoLists: todoListsReducer,
    tasks: tasksReducer,
    ui:uiReducer,
    theme: themeReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))



// @ts-ignore
window.store = store