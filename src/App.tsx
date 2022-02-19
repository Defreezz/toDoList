import React, {Dispatch, useCallback, useEffect, useLayoutEffect} from 'react';
import './App.css';
import Todolist from "./Components/Todolist/Todolist";
import {AddItemInput} from "./Components/Common/AddItemInput/AddItemInput";
import {useDispatch, useSelector} from "react-redux";
import {AllActionsType, GlobalStateType, ThunkType} from "./redux/store/store";
import {changeFilterTodoListAC} from "./redux/reducers/todolist-reducer/todolist-actions";
import {
    CreateTodolist,
    FilterValuesType,
    getTodolists,
    removeTodolist,
    renameTodolist
} from "./redux/reducers/todolist-reducer/todolists-reducer";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid"
import IconButton from "@mui/material/IconButton"
import LinearProgress from "@mui/material/LinearProgress"
import Paper from "@mui/material/Paper"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import Menu from "@mui/icons-material/Menu";
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import {toggleTheme} from "./redux/reducers/theme-reducer/theme-reducer";
import {darkTheme, lightTheme} from "./themes/themes";
import {CircularProgressWithLabel} from "./Components/Common/CircularProgress/CircularProgress";
import {ErrorSnackbar} from "./Components/Common/ErrorSnackbar/ErrorSnackbar";


const App = React.memo(function () {
    console.log("app")

    const dispatch = useDispatch<Dispatch<AllActionsType | ThunkType>>()

    const todoLists = useSelector((state: GlobalStateType) => state.todoLists)
    const tasks = useSelector((state: GlobalStateType) => state.tasks)
    const theme = useSelector((state: GlobalStateType) => state.theme.darkTheme)
    const initializeStatus = useSelector((state: GlobalStateType) => state.ui.initializeStatus)
    const progress = useSelector((state: GlobalStateType) => state.ui.progress)
    const operationStatus = useSelector((state: GlobalStateType) => state.ui.operationStatus)


    const toggleThemeHandler = () => {
        dispatch(toggleTheme(!theme))
    }
    const setLocalStorageThemeHandler = (theme: boolean) => {
        localStorage.setItem("darkTheme", JSON.stringify(theme))
    }
    const getLocalStorageThemeHandler = () => {
        let localTheme = localStorage.getItem("darkTheme")
        localTheme === null
            ? dispatch(toggleTheme(false))
            : dispatch(toggleTheme(localTheme && JSON.parse(localTheme)))
    }
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
        dispatch(CreateTodolist(title))
    }, [dispatch])

    const removeTodoListHandler = useCallback((todolistID: string) => {
        dispatch(removeTodolist(todolistID))
    }, [dispatch])

    const renameTodolistHandler = useCallback((todolistID: string, newTitle: string) => {
        dispatch(renameTodolist(todolistID, newTitle))
    }, [dispatch])
    //
    //
    //
    useEffect(() => {
        dispatch(getTodolists())
    }, [dispatch])
    useLayoutEffect(() => {
        getLocalStorageThemeHandler()
    }, [])
    useEffect(() => {
        setLocalStorageThemeHandler(theme)
    }, [theme])
    //
    //
    //map для тудулистОВ
    const todoListRender = (todoLists || []).map((tdl) => {
            let tasksForRender = tasks[tdl.id]
            return (
                <Grid item key={tdl.id}>
                    <Paper elevation={8}>
                        <Todolist
                            entityStatus={tdl.entityStatus}
                            key={tdl.id}
                            todolistID={tdl.id}
                            title={tdl.title}
                            tasks={tasksForRender}
                            removeTodolist={removeTodoListHandler}
                            renameTodolist={renameTodolistHandler}
                            changeTaskFilter={changeTaskFilter}
                            filterTdl={tdl.filter}
                        />
                    </Paper>
                </Grid>)
        }
    )
    //
    //
    //UI
    return (
        <ThemeProvider theme={theme ? darkTheme : lightTheme}>
            <div style={{minHeight: "100vh", backgroundColor: theme ? "#484e50" : "rgba(96,151,225,0.37)"}}>
                <AppBar position={"static"}>
                    <Toolbar sx={{justifyContent: 'space-between'}}>
                        <Box>
                            <IconButton>
                                <Menu/>
                            </IconButton>
                            <IconButton
                                onClick={toggleThemeHandler}
                                color="inherit"
                            >
                                {theme ? (
                                    <Brightness7Icon/>
                                ) : (
                                    <Brightness4Icon/>
                                )}
                            </IconButton>
                        </Box>
                        <Typography>
                            TodoLists
                        </Typography>
                        <Button color={"secondary"}>Login</Button>
                    </Toolbar>
                    <div style={{height: "5px"}}>
                        {operationStatus === 'loading' && <LinearProgress/>}
                    </div>
                </AppBar>
                {initializeStatus === 'loading' && <CircularProgressWithLabel value={progress}/>}
                {initializeStatus === 'succeeded' &&
                    <Container>
                        <Grid container style={{padding: "20px 0 20px 0"}}>
                            <AddItemInput addItem={addTodoListHandler}/>
                        </Grid>
                        <Grid container spacing={2}>
                            {todoListRender}
                        </Grid>
                    </Container>
                }
                <ErrorSnackbar/>
            </div>
        </ThemeProvider>
    )
})

export default App;
