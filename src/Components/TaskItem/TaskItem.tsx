import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton, ListItem} from "@material-ui/core";
import {EditableSpan} from "../Common/EditableSpan/EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskStatuses, TaskType} from "../../api/api";


type TaskItemType = {
    todoListID:string
    task:TaskType
    removeTask: (todolistID: string,taskID: string) => void
    renameTask: (taskID: string, todolistID: string, newTitle: string) => void
    changeTaskStatus: (todolistID: string,taskID: string, status: TaskStatuses,title:string) => void
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

    const onChangeStatusHandler = useCallback ((e: ChangeEvent<HTMLInputElement>) => {
        const isDoneValue = e.currentTarget.checked
        changeTaskStatus(
            todoListID,task.id, isDoneValue?TaskStatuses.Completed:TaskStatuses.New,task.title
            )

    },[task.id, todoListID,changeTaskStatus])

    const removeTaskHandler = useCallback (() => {
        removeTask(todoListID,task.id )
    },[task.id, todoListID,removeTask])


    return (
        <ListItem key={task.id}>
            <Checkbox
                size={"small"}
                checked={!!task.status}
                onChange={onChangeStatusHandler}
            />
            <EditableSpan
                //className={task.isDone ? "completed" : ""} //вызывает перерисовку в React.memo
                renameItem={renameTaskHandler}
                title={task.title}/>

            <IconButton size={"small"} onClick={removeTaskHandler}><Delete/></IconButton>
        </ListItem>)
}
)
