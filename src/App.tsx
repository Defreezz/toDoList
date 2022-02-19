import React, {Dispatch, useCallback, useEffect} from 'react';
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
import {
    AppBar,
    Box,
    Button,
    Container,
    Grid,
    IconButton, LinearProgress,
    Paper,
    ThemeProvider,
    Toolbar,
    Typography
} from "@mui/material";
import Menu from "@mui/icons-material/Menu";
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import {toggleTheme} from "./redux/reducers/theme-reducer/theme-reducer";
import {darkTheme, lightTheme} from "./themes/themes";
import {CircularProgressWithLabel} from "./Components/Common/CircularProgress/CircularProgress";


const App = React.memo(function () {
    console.log("app")

    const dispatch = useDispatch<Dispatch<AllActionsType>>()
    const dispatchThunk = useDispatch<Dispatch<ThunkType>>()

    const todoLists = useSelector((state: GlobalStateType) => state.todoLists)
    const tasks = useSelector((state: GlobalStateType) => state.tasks)
    const theme = useSelector((state: GlobalStateType) => state.theme.darkTheme)
    const initializeStatus = useSelector((state:GlobalStateType)=>state.ui.initializeStatus)
    const progress = useSelector((state:GlobalStateType)=>state.ui.progress)
     const operationStatus = useSelector((state:GlobalStateType)=>state.ui.operationStatus)

    const toggleThemeHandler = () => {
        dispatch(toggleTheme(!theme))
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
                    <Paper elevation={8} style={{padding: "16px"}} sx={{position: "relative", minHeight: "340px"}}>
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

        <ThemeProvider theme={theme ? darkTheme : lightTheme}>
            <div className={"App"}>
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
                    {operationStatus === 'loading' && <LinearProgress/>}
                </AppBar>
                {initializeStatus === 'loading' && <CircularProgressWithLabel value={progress}/>}
                {initializeStatus === 'succeeded' &&
                    <Container style={{height: "100%"}}>
                    <Grid container style={{padding: "20px 0 20px 0"}}>
                        <AddItemInput addItem={addTodoListHandler}/>
                    </Grid>
                    <Grid container spacing={2}>
                        {todoListRender}
                    </Grid>
                </Container>
                }
            </div>
        </ThemeProvider>
    )
})

export default App;
