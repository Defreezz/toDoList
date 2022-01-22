import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton, ListItem} from "@material-ui/core";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskType} from "../redux/tasks-reducer";

type TaskItemType = {
    todoListID:string
    task:TaskType
    removeTask: (taskID: string, todolistID: string) => void
    renameTask: (taskID: string, todolistID: string, newTitle: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean, todolistID: string) => void
}

export const TaskItem = React.memo (({
                             task,
                             removeTask,
                             renameTask,
                             changeTaskStatus,
                             todoListID,
                         }: TaskItemType) => {

    const renameTaskHandler = useCallback ((newTitle: string) => {
        renameTask(task.id, todoListID, newTitle)
    },[task.id, todoListID,renameTask])

    const onChangeHandler = useCallback ((e: ChangeEvent<HTMLInputElement>) => {
        changeTaskStatus(task.id, e.currentTarget.checked, todoListID)
    },[task.id, todoListID,changeTaskStatus])

    const removeTaskHandler = useCallback (() => {
        removeTask(task.id, todoListID)
    },[task.id, todoListID,removeTask])


    return (
        <ListItem key={task.id}>
            <Checkbox
                size={"small"}
                checked={task.isDone}
                onChange={onChangeHandler}
            />
            <EditableSpan
                className={task.isDone ? "completed" : " "}
                renameItem={renameTaskHandler}
                title={task.title}/>

            <IconButton size={"small"} onClick={removeTaskHandler}><Delete/></IconButton>
        </ListItem>)
}
)
