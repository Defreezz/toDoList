import {addNewTask, addTask, deleteTask, modifyTask, removeTask, tasksReducer, TaskStateType} from "./tasks-reducer";
import {addTodoList} from "../todolist-reducer/todolists-reducer";
import {TaskStatuses, TaskType} from "../../../api";

let startState: TaskStateType

beforeEach(() => {
    startState = {
        'todolistId1': [
            {id: "1", title: "CSS", status: TaskStatuses.New},
            {id: "2", title: "JS", status: TaskStatuses.Completed},
            {id: "3", title: "React", status: TaskStatuses.New}
        ],
        'todolistId2': [
            {id: "1", title: "bread", status: TaskStatuses.Completed},
            {id: "2", title: "milk", status: TaskStatuses.New},
            {id: "3", title: "tea", status: TaskStatuses.New}
        ]
    }
})

test('correct task should be deleted from correct array', () => {
    const action = deleteTask({taskID:'2',todolistID:'todolistId2'});
    const endState = tasksReducer(startState, action)

    expect(endState).toEqual({
        'todolistId1': [
            {id: "1", title: "CSS", status: TaskStatuses.New},
            {id: "2", title: "JS", status: TaskStatuses.Completed},
            {id: "3", title: "React", status: TaskStatuses.New}
        ],
        'todolistId2': [
            {id: "1", title: "bread", status: TaskStatuses.Completed},
            {id: "3", title: "tea", status: TaskStatuses.New}
        ]
    });
});

test('correct task should be added to correct array', () => {
    const task = {id: "4", title: 'juice', status: TaskStatuses.New}
    const action = addNewTask({task,title:'juice',todolistID:'todolistId2'});
    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(3);
    expect(endState['todolistId2'].length).toBe(4);
    expect(endState['todolistId2'][0].id).toBeDefined();
    expect(endState['todolistId2'][0].title).toBe("juice");
    expect(endState['todolistId2'][0].status).toBe(TaskStatuses.New);
})

test('status of specified task should be changed', () => {
    const updateTask = {id: "2", title: 'juice', status: TaskStatuses.New}
    const action = modifyTask({taskID:'2',todolistID:'todolistId1',updateTask});
    const endState = tasksReducer(startState, action)

    expect(endState['todolistId2'][1].status).toBe(TaskStatuses.New);
    expect(endState['todolistId1'][1].status).toBe(TaskStatuses.New);
    expect(endState['todolistId1'][1].title).toBe('juice');
});

test('title of task should be changed', () => {
    const updateTask = {id: "2", title: 'juice', status: TaskStatuses.New}
    const action = modifyTask({taskID:'2',todolistID:'todolistId1',updateTask});
    const endState = tasksReducer(startState, action)

    expect(endState['todolistId2'][2].title).toBe("tea");
    expect(endState['todolistId1'][1].title).toBe('juice');
});

test('new array should be added when new todolist is added', () => {
    const action = addTodoList({id:'todolistId3',title:'new todo'});
    const endState = tasksReducer(startState, action)
    const keys = Object.keys(endState);
    const newKey = keys.find(k => k != 'todolistId1' && k != 'todolistId2');
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});


