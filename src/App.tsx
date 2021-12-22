import React, {useState} from 'react';
import './App.css';
import ToDoList from "./ToDoList";
import {v1} from "uuid";
import {AddItemInput} from "./AddItemInput/AddItemInput";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValuesType = "all" | "active" | "completed"

type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TaskStateType = {
    [key: string]: TaskType[]
}

function App() {
    //BLL
    const todolistID_1 = v1()
    const todolistID_2 = v1()

    const [todoLists, setTodoLists] = useState<TodoListType[]>([
        {id: todolistID_1, title: 'What to learn', filter: "all"},
        {id: todolistID_2, title: 'What to buy', filter: "all"},
    ])

    const [tasks, setTasks] = useState<TaskStateType>({
        [todolistID_1]: [
            {id: v1(), title: "HTML", isDone: false},
            {id: v1(), title: "Css", isDone: false},
            {id: v1(), title: "Redux", isDone: true}
        ],
        [todolistID_2]: [
            {id: v1(), title: "Milk", isDone: false},
            {id: v1(), title: "Bear", isDone: false},
            {id: v1(), title: "Fish", isDone: true}
        ]
    })

    //ф-ция для изменения чекбокса (выполненная/невыполненная) таска
    const changeTaskStatus = (taskID: string, isDone: boolean, todolistID:string) => {
        const copyState = {...tasks}
        copyState[todolistID] = copyState[todolistID].map(t => t.id === taskID? {...t,isDone}:t)
        setTasks(copyState)

        // let task = tasks[todolistID].find(t => t.id === taskID)
        // if (task) {
        //     task.isDone = isDone
        //     setTasks({...tasks})
        }

    //Фильрация таски
    const changeFilter = (filter: FilterValuesType, todolistID: string) => {
        const updatedTodoLists = todoLists.map(tdl => tdl.id === todolistID ? {...tdl, filter: filter} : tdl)
        setTodoLists(updatedTodoLists)
    }
    //Добавление таски
    function addTask(title: string, todolistID: string) {
        const copyState = {...tasks}
        let inputTask = {id: v1(), title: title, isDone: false}
        copyState[todolistID] = [inputTask, ...copyState[todolistID]]
        setTasks(copyState)
    }
    //Переименование таски
    function renameTask(taskID: string, todolistID: string,newTitle:string){
        const copyState = {...tasks}
        copyState[todolistID] = copyState[todolistID].map(t => t.id === taskID? {...t,title:newTitle}:t)
        setTasks(copyState)

    }

    //Удаление таски
    const removeTask = (taskID: string, todolistID: string) => {
        const copyState = {...tasks}
        copyState[todolistID] = copyState[todolistID].filter(t => t.id !== taskID)

        setTasks(copyState)
    }

    //Добавление тудулиста
    function addTodoList (title:string){
        let copyState = [...todoLists]
        let inputTodoList:TodoListType  = {id: v1(), title: title,filter: "all"}
        copyState = [inputTodoList, ...copyState]
        setTodoLists(copyState)
        setTasks({...tasks,[inputTodoList.id]:[]})
    }

    //Удаление тудулиста
    const removeTodoList = (todolistID: string) => {
        let copyState = [...todoLists]
        copyState = copyState.filter(t => t.id !== todolistID)
        setTodoLists(copyState)
    }
    //Переименование Тудулиста
    function renameTodolist (todolistID: string, newTitle:string){
        let copyState = [...todoLists]
        copyState = copyState.map(t => t.id === todolistID? {...t,title:newTitle}:t)
        debugger
        setTodoLists(copyState)

    }
    //map для тудулистОВ
    const todoListRender = todoLists.map((tdl) => {
            let tasksForRender = tasks[tdl.id]
            if (tdl.filter === "active") {
                tasksForRender = tasks[tdl.id].filter(t => t.isDone === false)
            }
            if (tdl.filter === "completed") {
                tasksForRender = tasks[tdl.id].filter(t => t.isDone === true)
            }
                return (
                    <Grid item key={tdl.id}>
                    <Paper elevation={8} style={{padding:"16px"}}>
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
                <Toolbar style={{justifyContent:"space-between"}} >
                    <IconButton>
                        <Menu/>
                    </IconButton>
                    <Typography>
                        Todolists
                    </Typography>
                    <Button>Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding:"20px 0 20px 0" }}>
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
