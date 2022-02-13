import {tasksReducer, TaskStateType} from './task-reducer/tasks-reducer';

import {addTodoListAC, removeTodoListAC, todoListsReducer, TodoListType} from "./todolist-reducer/todolists-reducer";

test('ids should be equals', () => {
    const startTasksState: TaskStateType = {};
    const startTodolistsState: Array<TodoListType> = [];

    const action = addTodoListAC("new todolist");

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todoListsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].todolistID;

    expect(idFromTasks).toBe(action.payload.todolistID);
    expect(idFromTodolists).toBe(action.payload.todolistID);
});


test('property with todolistId should be deleted', () => {
    const startState: TaskStateType = {
        "todolistId1": [
            { taskID: "1", title: "CSS", isDone: false },
            { taskID: "2", title: "JS", isDone: true },
            { taskID: "3", title: "React", isDone: false }
        ],
        "todolistId2": [
            { taskID: "1", title: "bread", isDone: false },
            { taskID: "2", title: "milk", isDone: true },
            { taskID: "3", title: "tea", isDone: false }
        ]
    };

    const action = removeTodoListAC("todolistId2");

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).toBeUndefined();
});

