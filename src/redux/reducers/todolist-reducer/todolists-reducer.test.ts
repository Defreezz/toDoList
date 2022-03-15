import {v1} from 'uuid';
import {
    addTodoList,
    changeFilterTodoList,
    FilterValuesType,
    removeTodoList,
    renameTodoList,
    todoListsReducer
} from "./todolists-reducer";


let todolistId1:string
let todolistId2:string
let startState: any

beforeEach(()=> {
    todolistId1 = v1();
    todolistId2 = v1();
    startState = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]
})

test('todolist removed', () => {
    const endState = todoListsReducer(startState, removeTodoList({id:todolistId1}))
    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
})

test('Added todolist',() =>{
    let newTodolistTitle = "New todolist";
    const endState = todoListsReducer(startState, addTodoList({
        title:newTodolistTitle,id:'id3',addedDate:'',order:0}))
    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(newTodolistTitle);

})

test('change  name', () => {
    let newTodolistTitle = "New todolist";
    const endState = todoListsReducer(startState, renameTodoList({id:todolistId2,title:newTodolistTitle}));
    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});

test('filter changed', () => {
    let newFilter: FilterValuesType = "completed";
    const endState = todoListsReducer(startState, changeFilterTodoList({filter:newFilter,id:todolistId2}));
    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});


