import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    tasksReducer,
    TaskStateType
} from './tasks-reducer';

import {addTodoListAC} from "../todolist-reducer/todolists-reducer";

let startState: TaskStateType

beforeEach(() => {
    startState = {
        "todolistId1": [
            {taskID: "1", title: "CSS", isDone: false},
            {taskID: "2", title: "JS", isDone: true},
            {taskID: "3", title: "React", isDone: false}
        ],
        "todolistId2": [
            {taskID: "1", title: "bread", isDone: false},
            {taskID: "2", title: "milk", isDone: true},
            {taskID: "3", title: "tea", isDone: false}
        ]
    }
})


test('correct task should be deleted from correct array', () => {
    const action = removeTaskAC("2", "todolistId2");
    const endState = tasksReducer(startState, action)

    expect(endState).toEqual({
        "todolistId1": [
            {taskID: "1", title: "CSS", isDone: false},
            {taskID: "2", title: "JS", isDone: true},
            {taskID: "3", title: "React", isDone: false}
        ],
        "todolistId2": [
            {taskID: "1", title: "bread", isDone: false},
            {taskID: "3", title: "tea", isDone: false}
        ]
    });
});

test('correct task should be added to correct array', () => {
    const action = addTaskAC("juice", "todolistId2");
    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(4);
    expect(endState["todolistId2"][0].taskID).toBeDefined();
    expect(endState["todolistId2"][0].title).toBe("juice");
    expect(endState["todolistId2"][0].isDone).toBe(false);
})

test('status of specified task should be changed', () => {
    const action = changeTaskStatusAC("2", false, "todolistId2");
    const endState = tasksReducer(startState, action)

    expect(endState["todolistId2"][1].isDone).toBe(false);
    expect(endState["todolistId1"][1].isDone).toBe(true);
});

test('title of task should be changed', () => {
    const action = changeTaskTitleAC("3", "todolistId2", "tea");
    const endState = tasksReducer(startState, action)

    expect(endState["todolistId2"][2].title).toBe("tea");
    expect(endState["todolistId1"][2].title).toBe("React");
});

test('new array should be added when new todolist is added', () => {
    const action = addTodoListAC("new todolist");
    const endState = tasksReducer(startState, action)
    const keys = Object.keys(endState);
    const newKey = keys.find(k => k != "todolistId1" && k != "todolistId2");
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});


