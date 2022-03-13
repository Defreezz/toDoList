import {combineReducers} from "redux";
import {tasksReducer} from "../reducers/task-reducer/tasks-reducer";
import {todoListsReducer} from "../reducers/todolist-reducer/todolists-reducer";
import thunkMiddleware from "redux-thunk";
import {themeReducer} from "../reducers/theme-reducer/theme-reducer";
import {uiReducer} from "../reducers/ui-reducer/ui-reducer";
import {authReducer} from "../reducers/auth-reducer/auth-reducer";
import {configureStore} from "@reduxjs/toolkit";

export type GlobalStateType = ReturnType<typeof rootReducer>
export type DispatchType = typeof store.dispatch


const rootReducer = combineReducers({
    todoLists: todoListsReducer,
    tasks: tasksReducer,
    ui:uiReducer,
    theme: themeReducer,
    auth: authReducer,
})

//export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))
export const store = configureStore({
    reducer: rootReducer,
    middleware:getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware)
})



// @ts-ignore
window.store = store