import React, {Dispatch, useCallback, useEffect, useMemo} from 'react';
import './App.css';
import Todolist from "./Components/Todolist/Todolist";
import {AddItemInput} from "./Components/Common/AddItemInput/AddItemInput";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";


import {AllActionsType, GlobalStateType, ThunkType} from "./redux/store/store";
import {changeFilterTodoListAC} from "./redux/reducers/todolist-reducer/todolist-actions";
import {changeTaskStatusAC,} from "./redux/reducers/task-reducer/task-actions";
import {
    CreateTodolist,
    FilterValuesType,
    getTodolists,
    removeTodolist,
    renameTodolist
} from "./redux/reducers/todolist-reducer/todolists-reducer";
import {renameTask} from "./redux/reducers/task-reducer/tasks-reducer";


const App = React.memo(function () {
    console.log("app")

    const dispatch = useDispatch<Dispatch<AllActionsType>>()
    const dispatchThunk = useDispatch<Dispatch<ThunkType>>()

    const todoLists = useSelector((state: GlobalStateType) => state.todoLists)
    const tasks = useSelector((state: GlobalStateType) => state.tasks)
    //
    //
    //TASKS

    const changeTaskFilter = useCallback((filter: FilterValuesType, todolistID: string) => {
        dispatch(changeFilterTodoListAC(filter, todolistID))
    }, [dispatch])

    //
    //
    //TODOLIST
    const addTodoListHandler = useCallback(function (title: string) {
        dispatchThunk(CreateTodolist(title))
    }, [dispatchThunk])

    const removeTodoListHandler = useCallback((todolistID: string) => {
        dispatchThunk(removeTodolist(todolistID))
    }, [dispatchThunk])

    const renameTodolistHandler = useCallback((todolistID: string, newTitle: string) => {
        dispatchThunk(renameTodolist(todolistID, newTitle))
    }, [dispatchThunk])
    //
    //
    //
    useEffect(() => {
        dispatchThunk(getTodolists())
    }, [dispatchThunk])
    //
    //
    //map для тудулистОВ
    const todoListRender = (todoLists || []).map((tdl) => {

            let tasksForRender = tasks[tdl.id]

            return (
                <Grid item key={tdl.id}>
                    <Paper elevation={8} style={{padding: "16px"}}>
                        <Todolist
                            key={tdl.id}
                            todolistID={tdl.id}
                            title={tdl.title}
                            tasks={tasksForRender}
                            removeTodolist={removeTodoListHandler}
                            renameTodolist={renameTodolistHandler}
                            changeTaskFilter={changeTaskFilter}
                            filterTDL={tdl.filter}
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
                    <AddItemInput addItem={addTodoListHandler}/>
                </Grid>
                <Grid container spacing={3}>
                    {todoListRender}
                </Grid>
            </Container>
        </div>
    )
})

export default App;
