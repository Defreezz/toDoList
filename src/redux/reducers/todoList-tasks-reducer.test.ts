import {tasksReducer} from './task-reducer/tasks-reducer';

import {addTodoList, removeTodoList, TodolistDomainType, todoListsReducer} from "./todolist-reducer/todolists-reducer";
import {TaskStatuses} from "../../api";
import {TaskStateType} from "./task-reducer/task-types";

test('ids should be equals', () => {
    const startTasksState: TaskStateType = {};
    const startTodolistsState:TodolistDomainType[] = [];

    const action = addTodoList({id:'new',title:'new todolist',addedDate:'',order:0});

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todoListsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.payload.id);
    expect(idFromTodolists).toBe(action.payload.id);
});


test('property with todolistId should be deleted', () => {
    const startState: TaskStateType = {
        "todolistId1": [
            { id: "1", title: "CSS", status: TaskStatuses.Completed },
            { id: "2", title: "JS", status: TaskStatuses.New},
            { id: "3", title: "React", status: TaskStatuses.New }
        ],
        'todolistId2': [
            { id: "1", title: "bread", status: TaskStatuses.New },
            { id: "2", title: "milk", status: TaskStatuses.Completed},
            { id: "3", title: "tea", status: TaskStatuses.New }
        ]
    };

    const action = removeTodoList({id:'todolistId2'});

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState['todolistId2']).toBeUndefined();
});

