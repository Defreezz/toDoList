import React, {Dispatch} from 'react';
import './App.css';
import ToDoList from "./ToDoList";
import {AddItemInput} from "./AddItemInput/AddItemInput";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {
    ActionTaskReducerType,
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC
} from "./redux/tasks-reducer";
import {
    ActionsTodoListReducerType,
    addTodoListAC,
    changeFilterTodoListAC,
    FilterValuesType,
    removeTodoListAC,
    renameTodoListAC
} from "./redux/todolists-reducer";
import {GlobalStateType} from "./redux/store/store";


function App() {

    const dispatch = useDispatch<Dispatch<ActionsTodoListReducerType | ActionTaskReducerType>>()
    const todoLists = useSelector((state:GlobalStateType)=>state.todoLists)
    const tasks = useSelector((state:GlobalStateType)=>state.tasks)

    //ф-ция для изменения чекбокса (выполненная/невыполненная) таска
    const changeTaskStatus = (taskID: string, isDone: boolean, todolistID: string) => {
        dispatch(changeTaskStatusAC(taskID, isDone, todolistID))
    }
    //Фильрация таски
    const changeFilter = (filter: FilterValuesType, todolistID: string) => {
        dispatch(changeFilterTodoListAC(filter, todolistID))
    }
    //Добавление таски
    function addTask(title: string, todolistID: string) {
        dispatch(addTaskAC(title, todolistID))
    }
    //Переименование таски
    function renameTask(taskID: string, todolistID: string, newTitle: string) {
        dispatch(changeTaskTitleAC(taskID, todolistID, newTitle))
    }
    //Удаление таски
    const removeTask = (taskID: string, todolistID: string) => {
        dispatch(removeTaskAC(taskID, todolistID))
    }
    //Добавление тудулиста
    function addTodoList(title: string) {
        dispatch(addTodoListAC(title))
    }
    //Удаление тудулиста
    const removeTodoList = (todolistID: string) => {
        dispatch(removeTodoListAC(todolistID))
    }
    //Переименование Тудулиста
    function renameTodolist(todolistID: string, newTitle: string) {
        dispatch(renameTodoListAC(todolistID, newTitle))
    }
    //map для тудулистОВ
    const todoListRender = todoLists.map((tdl) => {
            let tasksForRender = tasks[tdl.id]
            if (tdl.filter === "active") {
                tasksForRender = tasks[tdl.id].filter(t => !t.isDone)
            }
            if (tdl.filter === "completed") {
                tasksForRender = tasks[tdl.id].filter(t => t.isDone)
            }
            return (
                <Grid item key={tdl.id}>
                    <Paper elevation={8} style={{padding: "16px"}}>
                        <ToDoList
                            key={tdl.id}
                            id={tdl.id}
                            title={tdl.title}
                            tasks={tasksForRender}
                            removeTask={removeTask}
                            renameTask={renameTask}
                            removeTodolist={removeTodoList}
                            renameTodolist={renameTodolist}
                            changeFilter={changeFilter}
                            addTask={addTask}
                            changeTaskStatus={changeTaskStatus}
                            filter={tdl.filter}
                        />
                    </Paper>
                </Grid>)

        }
    )

    //UI
    return (
        <div className={"App"}>
            <AppBar position={"static"}>
                <Toolbar style={{justifyContent: "space-between"}}>
                    <IconButton>
                        <Menu/>
                    </IconButton>
                    <Typography>
                        TodoLists
                    </Typography>
                    <Button>Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "20px 0 20px 0"}}>
                    <AddItemInput addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={3}>
                    {todoListRender}
                </Grid>
            </Container>
        </div>
    );
}

export default App;
