import {
    addTodoListAC,
    changeFilterTodoListAC,
    FilterValuesType,
    removeTodoListAC,
    renameTodoListAC,
    todoListsReducer
} from './todolists-reducer';
import {v1} from 'uuid';

let todolistId1:string
let todolistId2:string
let startState: any

beforeEach(()=> {
    todolistId1 = v1();
    todolistId2 = v1();
    startState = [
        {todolistID: todolistId1, title: "What to learn", filter: "all"},
        {todolistID: todolistId2, title: "What to buy", filter: "all"}
    ]
})

test('todolist removed', () => {
    const endState = todoListsReducer(startState, removeTodoListAC(todolistId1))
    expect(endState.length).toBe(1);
    expect(endState[0].todolistID).toBe(todolistId2);
})

test('Added Todolist',() =>{
    let newTodolistTitle = "New Todolist";
    const endState = todoListsReducer(startState, addTodoListAC(newTodolistTitle))
    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodolistTitle);

})

test('change  name', () => {
    let newTodolistTitle = "New Todolist";
    const endState = todoListsReducer(startState, renameTodoListAC(todolistId2,newTodolistTitle));
    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});

test('filter changed', () => {
    let newFilter: FilterValuesType = "completed";
    const endState = todoListsReducer(startState, changeFilterTodoListAC(newFilter,todolistId2));
    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});


