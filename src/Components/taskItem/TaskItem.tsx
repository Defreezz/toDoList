import React, {ChangeEvent, useCallback} from "react";
import {EditableSpan} from "../common/EditableSpan/EditableSpan";
import {TaskStatuses, TaskType} from "../../api/api";
import {Checkbox, IconButton, ListItem} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {RequestStatusType} from "../../redux/reducers/ui-reducer/ui-reducer";


type TaskItemType = {
    todoListID: string
    task: TaskType
    entityTaskStatus: RequestStatusType
    removeTask: (todolistID: string, taskID: string) => void
    renameTask: (taskID: string, todolistID: string, newTitle: string) => void
    changeTaskStatus: (todolistID: string, taskID: string, status: TaskStatuses) => void
}

export const TaskItem = React.memo(({
                                        task,
                                        removeTask,
                                        renameTask,
                                        entityTaskStatus,
                                        changeTaskStatus,
                                        todoListID,
                                    }: TaskItemType) => {

        const renameTaskHandler = useCallback((newTitle: string) => {
            renameTask(task.id, todoListID, newTitle)
        }, [task.id, todoListID, renameTask])

        const onChangeStatusHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
            const isDoneValue = e.currentTarget.checked
            changeTaskStatus(
                todoListID, task.id, isDoneValue ? TaskStatuses.Completed : TaskStatuses.New)

        }, [task.id, todoListID, changeTaskStatus])

        const removeTaskHandler = useCallback(() => {
            removeTask(todoListID, task.id)
        }, [task.id, todoListID, removeTask])

        return (
            <ListItem key={task.id} >

                    <Checkbox
                        size={"small"}
                        checked={!!task.status}
                        onChange={onChangeStatusHandler}
                    />
                    <EditableSpan
                        variant={"body2"}
                        renameItem={renameTaskHandler}
                        title={task.title}/>

                <IconButton
                    size={"small"}
                    disabled={entityTaskStatus === "loading"}
                    onClick={removeTaskHandler}
                ><Delete/></IconButton>
            </ListItem>)
    }
)
