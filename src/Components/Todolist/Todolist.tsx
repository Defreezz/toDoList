import React, {Dispatch, useCallback, useEffect} from "react";
import {AddItemInput} from "../Common/AddItemInput/AddItemInput";
import {EditableSpan} from "../Common/EditableSpan/EditableSpan";
import {FilterValuesType} from "../../redux/reducers/todolist-reducer/todolists-reducer";
import {TaskItem} from "../TaskItem/TaskItem";
import {TaskStatuses, TaskType} from "../../api/api";
import {addTask, getTasks, removeTask, renameTask, updateTask} from "../../redux/reducers/task-reducer/tasks-reducer";
import {useDispatch} from "react-redux";
import {ThunkType} from "../../redux/store/store";
import {Delete} from "@mui/icons-material";
import {Button, ButtonGroup, IconButton, List, Paper, Typography} from "@mui/material";

type TodolistType = {
    todolistID: string
    title: string
    tasks: Array<TaskType>
    removeTodolist: (todoListID: string) => void
    renameTodolist: (todoListID: string, newTitle: string) => void
    changeTaskFilter: (filter: FilterValuesType, todolistID: string) => void
    filterTDL: FilterValuesType
}


const Todolist = React.memo(function ({
                                          todolistID,
                                          title,
                                          tasks,
                                          removeTodolist,
                                          renameTodolist,
                                          changeTaskFilter,
                                          filterTDL,
                                      }: TodolistType) {
    console.log("todolist")
    //const dispatch = useDispatch<Dispatch<AllActionsType>>()
    const dispatchThunk = useDispatch<Dispatch<ThunkType>>()

    const removeTaskHandler = useCallback((todolistID: string, taskID: string) => {
        dispatchThunk(removeTask(todolistID, taskID))
    }, [dispatchThunk])

    const addTaskHandler = useCallback((title: string) => {
        dispatchThunk(addTask(todolistID, title))
    }, [dispatchThunk, todolistID])

    const renameTaskHandler = useCallback((taskID: string, todolistID: string, newTitle: string) => {
        dispatchThunk(renameTask(todolistID, taskID, newTitle))
    }, [dispatchThunk])

    const changeTaskStatusHandler = useCallback((todolistID: string, taskID: string, status: TaskStatuses) => {
        dispatchThunk(updateTask(todolistID, taskID, status))
    }, [dispatchThunk])


    const renameTodoList = useCallback((newTitle: string) => {
        renameTodolist(todolistID, newTitle)
    }, [renameTodolist, todolistID])

    let tasksForRender = tasks
    if (filterTDL === "active") {
        tasksForRender = tasks.filter(t => t.status === TaskStatuses.New)
    }
    if (filterTDL === "completed") {
        tasksForRender = tasks.filter(t => t.status === TaskStatuses.Completed)
    }

    useEffect(() => {
        dispatchThunk(getTasks(todolistID))
    }, [dispatchThunk, todolistID])

    //мапится массив тасок
    const tasksJSX = tasksForRender.map(t => {
            return (
                <Paper style={{margin: "5px 5px"}}>
                    <TaskItem
                        key={t.id}
                        removeTask={removeTaskHandler}
                        renameTask={renameTaskHandler}
                        changeTaskStatus={changeTaskStatusHandler}
                        task={t}
                        todoListID={todolistID}
                    />
                </Paper>
            )
        }
    )

    const onAllClickHandler = useCallback(() => {
            changeTaskFilter("all", todolistID)
        },
        [changeTaskFilter, todolistID])
    const onActiveClickHandler = useCallback(() => {
            changeTaskFilter("active", todolistID)
        },
        [changeTaskFilter, todolistID])
    const onCompletedClickHandler = useCallback(() => {
            changeTaskFilter("completed", todolistID)
        },
        [changeTaskFilter, todolistID])

    const buttonStatusClass = (filter: FilterValuesType) =>
        filterTDL === filter ? "secondary" : "primary" //меняет класс кнопкам в зависимости от фильтрации в аpp.tsx


    return (
        <div className="App">
            <div>
                <Typography align={"center"} variant={"h6"} style={{fontWeight: "bold"}}>
                    <EditableSpan title={title} renameItem={renameTodoList}/>
                    <IconButton size={"small"} onClick={() => {
                        removeTodolist(todolistID)
                    }}>
                        <Delete/>
                    </IconButton>
                </Typography>
                <div>
                    <AddItemInput addItem={addTaskHandler}/>
                </div>
                <List>
                    {tasksJSX}
                </List>
                <div>
                    <ButtonGroup size={"small"} variant={"contained"} sx={{bottom: "15px", position: "absolute"}}>
                        <Button onClick={onAllClickHandler} color={buttonStatusClass("all")}>All</Button>
                        <Button onClick={onActiveClickHandler} color={buttonStatusClass("active")}>Active</Button>
                        <Button onClick={onCompletedClickHandler}
                                color={buttonStatusClass("completed")}>Completed</Button>
                    </ButtonGroup>
                </div>
            </div>
        </div>
    )
})

export default Todolist


