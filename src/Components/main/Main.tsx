import {AddItemInput} from "../common/AddItemInput/AddItemInput";
import {ErrorSnackbar} from "../common/ErrorSnackbar/ErrorSnackbar";
import React, {memo, useCallback, useEffect, useMemo} from "react";
import {useDispatch, useSelector} from "react-redux";
import {GlobalStateType, DispatchType} from "../../redux/store/store";
import {toggleTheme} from "../../redux/reducers/theme-reducer/theme-reducer";
import Todolist from "../todolist/Todolist";
import {
    CreateTodolist,
    getTodolists,
    removeTodolist,
    renameTodolist
} from "../../redux/reducers/todolist-reducer/todolists-reducer";
import {ToggleTheme} from "../common/ToggleTheme/ToggleTheme";
import {logout} from "../../redux/reducers/auth-reducer/auth-reducer";
import {AppBar, Box, Container, Grid, IconButton, LinearProgress, Paper, Toolbar, Typography} from "@mui/material";
import {Logout} from "@mui/icons-material";


export const Main = memo( () => {
    const dispatch = useDispatch<DispatchType>()

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
                return (
                    <Grid item key={tdl.id}>
                        <Paper elevation={8}>
                            <Todolist
                                entityStatus={tdl.entityStatus}
                                key={tdl.id}
                                todolistID={tdl.id}
                                title={tdl.title}
                                tasks={tasks[tdl.id]}
                                removeTodolist={removeTodoListHandler}
                                renameTodolist={renameTodolistHandler}
                                filterTdl={tdl.filter}
                            />
                        </Paper>
                    </Grid>)
            }
        )
    },[todoLists,tasks,renameTodolistHandler,removeTodoListHandler])

    return (
        <div style={{minHeight: "100vh", backgroundColor: isDarkTheme ? "#484e50" : "rgba(96,151,225,0.37)"}}>
            <AppBar position={"static"}>
                <Toolbar sx={{justifyContent: 'space-between'}}>
                    <Box>
                        {/*<IconButton>*/}
                        {/*    <Menu />*/}
                        {/*</IconButton>*/}
                        <ToggleTheme onClickHandler={toggleThemeHandler} isDarkTheme={isDarkTheme}/>
                    </Box>
                    <Typography>
                        Todolists
                    </Typography>
                    {isLoggedIn && <IconButton onClick={logoutHandler}><Logout/></IconButton>}
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