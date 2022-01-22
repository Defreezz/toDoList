import React, {Dispatch, useCallback} from 'react';
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


const App  = React.memo(function () {
    console.log("app")
    const dispatch = useDispatch<Dispatch<ActionsTodoListReducerType | ActionTaskReducerType>>()
    const todoLists = useSelector((state:GlobalStateType)=>state.todoLists)
    const tasks = useSelector((state:GlobalStateType)=>state.tasks)

    //ф-ция для изменения чекбокса (выполненная/невыполненная) таска
    const changeTaskStatus = useCallback ((taskID: string, isDone: boolean, todolistID: string) => {
        dispatch(changeTaskStatusAC(taskID, isDone, todolistID))
    },[dispatch])
    //Фильрация таски
    const changeFilter = useCallback((filter: FilterValuesType, todolistID: string) => {
        dispatch(changeFilterTodoListAC(filter, todolistID))
    },[dispatch])
    //Добавление таски
    const addTask = useCallback((title: string, todolistID: string) => {
        dispatch(addTaskAC(title, todolistID))
    },[dispatch])
    //Переименование таски
    const renameTask = useCallback((taskID: string, todolistID: string, newTitle: string) => {
        dispatch(changeTaskTitleAC(taskID, todolistID, newTitle))
    },[dispatch])
    //Удаление таски
    const removeTask = useCallback ((taskID: string, todolistID: string) => {
        dispatch(removeTaskAC(taskID, todolistID))
    },[dispatch])
    //Добавление тудулиста
    const addTodoList = useCallback( function (title: string) {
        dispatch(addTodoListAC(title))
    },[dispatch])
    //Удаление тудулиста
    const removeTodoList = useCallback((todolistID: string) => {
        dispatch(removeTodoListAC(todolistID))
    },[dispatch])
    //Переименование Тудулиста
    const renameTodolist = useCallback((todolistID: string, newTitle: string) =>{
        dispatch(renameTodoListAC(todolistID, newTitle))
    },[dispatch])

    //map для тудулистОВ
    const todoListRender = todoLists.map((tdl) => {
            let tasksForRender = tasks[tdl.id]

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
    )
})

export default App;
