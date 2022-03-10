import React, {useCallback, useMemo} from "react";
import {AddItemInput} from "../common/AddItemInput/AddItemInput";
import {EditableSpan} from "../common/EditableSpan/EditableSpan";
import {FilterValuesType} from "../../redux/reducers/todolist-reducer/todolists-reducer";
import {TaskItem} from "../taskItem/TaskItem";
import {TaskType} from "../../api/api";
import {Delete} from "@mui/icons-material";
import {Box, Button, ButtonGroup, IconButton, List, Paper} from "@mui/material";
import {RequestStatusType} from "../../redux/reducers/ui-reducer/ui-reducer";
import {tasksForRender} from "../../utils";
import {useTaskCRUD} from "../../hooks/useTaskCRUD";
import {useTasksFilter} from "../../hooks/useTasksFilter";

type TodolistType = {
    todolistID: string
    entityStatus: RequestStatusType
    title: string
    tasks: Array<TaskType>
    removeTodolist: (todoListID: string) => void
    renameTodolist: (todoListID: string, newTitle: string) => void
    filterTdl: FilterValuesType
}


const Todolist = React.memo(function ({
                                          todolistID,
                                          entityStatus,
                                          title,
                                          tasks,
                                          removeTodolist,
                                          renameTodolist,
                                          filterTdl,
                                      }: TodolistType) {

    const {handleTaskRemove, handleTaskRename, handleTaskStatusChange, handleTaskAdd} = useTaskCRUD()
    const {handleFilterAllClick, handleFilterCompletedClick, handleFilterActiveClick} = useTasksFilter(todolistID)

    const renameTodoList = useCallback((newTitle: string) => {
        renameTodolist(todolistID, newTitle)
    }, [renameTodolist, todolistID])

    const tasksJSX = useMemo(() => tasksForRender(tasks, filterTdl).map(task => {
            console.log(`${task.title} + ${task.id} `)
            return (
                <Paper key={task.id}>
                    <TaskItem
                        entityTaskStatus={task.entityTaskStatus!}
                        key={task.id}
                        removeTask={handleTaskRemove}
                        renameTask={handleTaskRename}
                        changeTaskStatus={handleTaskStatusChange}
                        task={task}
                        todoListID={todolistID}
                    />
                </Paper>
            )
        }
    ), [handleTaskStatusChange, filterTdl, handleTaskRemove, handleTaskRename, todolistID, tasks])


    const buttonStatusClass = useCallback((filter: FilterValuesType) =>
        filter === filterTdl ? "secondary" : "primary", [filterTdl])

    return (
        <>
            <Box>
                <EditableSpan
                    variant={"h6"}
                    title={title}
                    renameItem={renameTodoList}
                />

            </Box>
            <AddItemInput
                id={todolistID}
                placeHolder={"New task"}
                addItem={handleTaskAdd}
                entityStatus={entityStatus}
            />
            <List>
                {tasksJSX}
            </List>
            <div style={{bottom: "15px", position: "absolute"}}>
                <ButtonGroup size={"small"} variant={"contained"}>
                    <Button onClick={handleFilterAllClick} color={buttonStatusClass("all")}>
                        All
                    </Button>
                    <Button onClick={handleFilterActiveClick} color={buttonStatusClass("active")}>
                        Active
                    </Button>
                    <Button onClick={handleFilterCompletedClick} color={buttonStatusClass("completed")}>
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


