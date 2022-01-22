import {createStore, combineReducers} from "redux";
import {tasksReducer} from "../tasks-reducer";
import {todoListsReducer} from "../todolists-reducer";

export type GlobalStateType = ReturnType<typeof rootReducer>

const rootReducer = combineReducers({
    todoLists:todoListsReducer,
    tasks:tasksReducer
})

export const store = createStore(rootReducer)

// @ts-ignore
window.store = store