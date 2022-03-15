import {AddItemInput} from "../common/AddItemInput/AddItemInput";
import {ErrorSnackbar} from "../common/ErrorSnackbar/ErrorSnackbar";
import React, {memo, useCallback, useEffect, useMemo} from "react";
import {useDispatch, useSelector} from "react-redux";
import {DispatchType, GlobalStateType} from "../../redux/store/store";
import {toggleTheme} from "../../redux/reducers/theme-reducer/theme-reducer";
import Todolist from "../todolist/Todolist";
import {getTodolists} from "../../redux/reducers/todolist-reducer/todolists-reducer";
import {ToggleTheme} from "../common/ToggleTheme/ToggleTheme";
import {logout} from "../../redux/reducers/auth-reducer/auth-reducer";
import {AppBar, Box, Container, Grid, IconButton, LinearProgress, Paper, Toolbar, Typography} from "@mui/material";
import {Logout} from "@mui/icons-material";
import {useTodolistCRUD} from "../../hooks/useTodolistCRUD";
import {todolistAPI} from "../../api";


export const Main = memo(() => {
    const dispatch = useDispatch<DispatchType>()

    const isLoggedIn = useSelector((state: GlobalStateType) => state.auth.isLoggedIn)
    const operationStatus = useSelector((state: GlobalStateType) => state.ui.operationStatus)
    const isDarkTheme = useSelector((state: GlobalStateType) => state.theme.isDarkTheme)
    const todoLists = useSelector((state: GlobalStateType) => state.todoLists)
    const tasks = useSelector((state: GlobalStateType) => state.tasks)

    const {handleTodolistAdd, handleTodolistRename, handleTodolistRemove} = useTodolistCRUD()

    const toggleThemeHandler = useCallback(() => {
        dispatch(toggleTheme(!isDarkTheme))
    }, [dispatch, isDarkTheme])
    const logoutHandler = useCallback(() => {
        dispatch(logout())
    }, [dispatch])

    useEffect(() => {
        dispatch(getTodolists())
    }, [dispatch])

    let currentID:string = ''
    const handleDragStart =  (e:React.DragEvent<HTMLDivElement>,id:string) => {
      currentID = id
    }
    const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
        e.currentTarget.style.opacity = '1'
    }

    const handleDragOVer = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.currentTarget.style.opacity = '0.1'
    }

    const handleOnDrop =   (e: React.DragEvent<HTMLDivElement>,id:string) => {
        e.preventDefault()
        console.log(currentID)
        todolistAPI.reorderTodoList(currentID,id)

    }

    const todoListRender = useMemo(() => {
        return todoLists.map((tdl) => {
                return (
                    <Grid
                        item key={tdl.id}
                        draggable
                        onDragStart={(e)=>handleDragStart(e,tdl.id)}
                        onDragLeave={handleDragEnd}
                        onDragEnd={handleDragEnd}
                        onDragOver={handleDragOVer}
                        onDrop={(e)=>handleOnDrop(e,tdl.id)}
                    >
                        <Paper elevation={8}>
                            <Todolist
                                entityStatus={tdl.entityStatus}
                                key={tdl.id}
                                todolistID={tdl.id}
                                title={tdl.title}
                                tasks={tasks[tdl.id]}
                                removeTodolist={handleTodolistRemove}
                                renameTodolist={handleTodolistRename}
                                filterTdl={tdl.filter}
                            />
                        </Paper>
                    </Grid>)
            }
        )
    }, [todoLists, tasks, handleTodolistRename, handleTodolistRemove])
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
                    <AddItemInput placeHolder={"New todo"} addItem={handleTodolistAdd}/>
                </Grid>
                <Grid container spacing={2}>
                    {todoListRender}
                </Grid>
            </Container>
            <ErrorSnackbar/>
        </div>
    )
})