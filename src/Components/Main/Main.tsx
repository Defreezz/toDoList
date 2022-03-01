import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import LinearProgress from "@mui/material/LinearProgress";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import {AddItemInput} from "../Common/AddItemInput/AddItemInput";
import {ErrorSnackbar} from "../Common/ErrorSnackbar/ErrorSnackbar";
import React, {Dispatch, useCallback, useEffect, useMemo} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AllActionsType, GlobalStateType, ThunkType} from "../../redux/store/store";
import {toggleTheme} from "../../redux/reducers/theme-reducer/theme-reducer";
import Paper from "@mui/material/Paper";
import Todolist from "../Todolist/Todolist";
import {
    CreateTodolist,
    FilterValuesType,
    getTodolists,
    removeTodolist,
    renameTodolist
} from "../../redux/reducers/todolist-reducer/todolists-reducer";
import {changeFilterTodoListAC} from "../../redux/reducers/todolist-reducer/todolist-actions";
import {ToggleTheme} from "../Common/ToggleTheme/ToggleTheme";
import {logout} from "../../redux/reducers/auth-reducer/auth-reducer";


export const Main = React.memo( () => {
    const dispatch = useDispatch<Dispatch<AllActionsType | ThunkType>>()

    const isLoggedIn = useSelector((state: GlobalStateType) => state.auth.isLoggedIn)

    const operationStatus = useSelector((state: GlobalStateType) => state.ui.operationStatus)
    const isDarkTheme = useSelector((state: GlobalStateType) => state.theme.isDarkTheme)
    const todoLists = useSelector((state: GlobalStateType) => state.todoLists)
    const tasks = useSelector((state: GlobalStateType) => state.tasks)


    const toggleThemeHandler = useCallback (() => {
        dispatch(toggleTheme(!isDarkTheme))
    },[dispatch,isDarkTheme])
    const logoutHandler = useCallback (() => {
        dispatch(logout())
    },[dispatch])


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

    useEffect(() => {
        dispatch(getTodolists())
    }, [dispatch])


    const todoListRender = useMemo( ()=> {
       return  todoLists.map((tdl) => {
                console.log(`ListName: ${tdl.title}`)
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
    },[todoLists,tasks])

    return (
        <div style={{minHeight: "100vh", backgroundColor: isDarkTheme ? "#484e50" : "rgba(96,151,225,0.37)"}}>
            <AppBar position={"static"}>
                <Toolbar sx={{justifyContent: 'space-between'}}>
                    <Box>
                        <IconButton>
                            <Menu/>
                        </IconButton>
                        <ToggleTheme onClickHandler={toggleThemeHandler} isDarkTheme={isDarkTheme}/>
                    </Box>
                    <Typography>
                        Todolists
                    </Typography>
                    {isLoggedIn && <Button onClick={logoutHandler}>Log out</Button>}
                </Toolbar>
                <div style={{height: "5px"}}>
                    {operationStatus === 'loading' && <LinearProgress/>}
                </div>
            </AppBar>
                <Container>
                    <Grid container style={{padding: "20px 0 20px 0"}}>
                        <AddItemInput placeHolder={"New todo"} addItem={addTodoListHandler}/>
                    </Grid>
                    <Grid container spacing={2}>
                        {todoListRender}
                    </Grid>
                </Container>
            <ErrorSnackbar/>
        </div>
   )
})