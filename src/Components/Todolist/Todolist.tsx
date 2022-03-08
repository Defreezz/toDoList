import React, {Dispatch, useCallback, useMemo} from "react";
import {AddItemInput} from "../Common/AddItemInput/AddItemInput";
import {EditableSpan} from "../Common/EditableSpan/EditableSpan";
import {FilterValuesType} from "../../redux/reducers/todolist-reducer/todolists-reducer";
import {TaskItem} from "../TaskItem/TaskItem";
import {TaskStatuses, TaskType} from "../../api/api";
import {addTask, removeTask, updateTask} from "../../redux/reducers/task-reducer/tasks-reducer";
import {useDispatch} from "react-redux";
import {ThunkType} from "../../redux/store/store";
import {Delete} from "@mui/icons-material";
import {Button, ButtonGroup, IconButton, List, Paper} from "@mui/material";
import {RequestStatusType} from "../../redux/reducers/ui-reducer/ui-reducer";

type TodolistType = {
    todolistID: string
    entityStatus: RequestStatusType
    title: string
    tasks: Array<TaskType>
    removeTodolist: (todoListID: string) => void
    renameTodolist: (todoListID: string, newTitle: string) => void
    changeTaskFilter: (filter: FilterValuesType, todolistID: string) => void
    filterTdl: FilterValuesType
}


const Todolist = React.memo(function ({
                                          todolistID,
                                          entityStatus,
                                          title,
                                          tasks,
                                          removeTodolist,
                                          renameTodolist,
                                          changeTaskFilter,
                                          filterTdl,
                                      }: TodolistType) {

    const dispatchThunk = useDispatch<Dispatch<ThunkType>>()

    const removeTaskHandler = useCallback((todolistID: string, taskID: string) => {
        dispatchThunk(removeTask(todolistID, taskID))
    }, [dispatchThunk])

    const addTaskHandler = useCallback((title: string) => {
        dispatchThunk(addTask(todolistID, title))
    }, [dispatchThunk, todolistID])

    const renameTaskHandler = useCallback((taskID: string, todolistID: string, title: string) => {
        dispatchThunk(updateTask(todolistID, taskID, {title}))
    }, [dispatchThunk])

    const changeTaskStatusHandler = useCallback((todolistID: string, taskID: string, status: TaskStatuses) => {
        dispatchThunk(updateTask(todolistID, taskID, {status}))
    }, [dispatchThunk])


    const renameTodoList = useCallback((newTitle: string) => {
        renameTodolist(todolistID, newTitle)
    }, [renameTodolist, todolistID])

    let tasksForRender = tasks
    if (filterTdl === "active") {
        tasksForRender = tasks.filter(t => t.status === TaskStatuses.New)
    }
    if (filterTdl === "completed") {
        tasksForRender = tasks.filter(t => t.status === TaskStatuses.Completed)
    }

    const tasksJSX = useMemo(() => tasksForRender.map(t => {
            console.log(`${t.title} + ${t.id} `)
            return (
                <Paper key={t.id} >
                    <TaskItem
                        entityTaskStatus={t.entityTaskStatus!}
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
    ), [changeTaskStatusHandler, removeTaskHandler, renameTaskHandler, tasksForRender, todolistID])

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

    const buttonStatusClass = useCallback((filter: FilterValuesType) =>
            filter === filterTdl ? "secondary" : "primary" //меняет класс кнопкам в зависимости от фильтрации в аpp.tsx
        , [filterTdl])


    return (
        <>
            <EditableSpan
                variant={"h6"}
                title={title}
                renameItem={renameTodoList}/>
            <div>
                <AddItemInput
                    placeHolder={"New task"}
                    addItem={addTaskHandler}
                    entityStatus={entityStatus}
                />
            </div>
            <List>
                {tasksJSX}
            </List>
            <div style={{bottom: "15px", position: "absolute"}}>
                <ButtonGroup size={"small"} variant={"contained"}>
                    <Button onClick={onAllClickHandler} color={buttonStatusClass("all")}>
                        All
                    </Button>
                    <Button onClick={onActiveClickHandler} color={buttonStatusClass("active")}>
                        Active
                    </Button>
                    <Button onClick={onCompletedClickHandler} color={buttonStatusClass("completed")}>
                        Completed
                    </Button>

                </ButtonGroup>
                <IconButton
                    style={{marginLeft: "86px"}}
                    disabled={entityStatus === "loading"}
                    size={"small"}
                    onClick={() => {
                        removeTodolist(todolistID)
                    }}>
                    <Delete/>
                </IconButton>
            </div>
        </>
    )
})

export default Todolist


