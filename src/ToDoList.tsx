import React, {useCallback} from "react";
import {AddItemInput} from "./AddItemInput/AddItemInput";
import {EditableSpan} from "./EditableSpan/EditableSpan";
import {Button, ButtonGroup,  IconButton, List,  Typography} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {FilterValuesType} from "./redux/todolists-reducer";
import {TaskType} from "./redux/tasks-reducer";
import {TaskItem} from "./TaskItem/TaskItem";

type TodolistType = {
    id:string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskID: string, todolistID: string) => void
    renameTask:(taskID: string, todolistID: string, newTitle:string) => void
    removeTodolist:(todoListID:string) => void
    renameTodolist:(todoListID:string, newTitle:string) => void
    changeFilter: (filter: FilterValuesType, todolistID: string) => void
    addTask: (title:string, todolistID: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean, todolistID:string) => void
    filter: FilterValuesType
}


const ToDoList = React.memo( function (props: TodolistType) {
    console.log("todolist")
    let tasksForRender = props.tasks
    if (props.filter === "active") {
        tasksForRender = props.tasks.filter(t => !t.isDone)
    }
    if (props.filter === "completed") {
        tasksForRender = props.tasks.filter(t => t.isDone)
    }

    //мапится массив тасок
    const tasksJSX = tasksForRender.map(t => {
        return(
        <TaskItem
            key={t.id}
            removeTask={props.removeTask}
            renameTask={props.renameTask}
            changeTaskStatus={props.changeTaskStatus}
            task={t}
            todoListID={props.id}
        />
        )}
    )

    const onAllClickHandler = useCallback(() => {props.changeFilter("all",props.id)},[props.changeFilter,props.id])
    const onActiveClickHandler = useCallback(() => {props.changeFilter("active",props.id)},[props.changeFilter,props.id])
    const onCompletedClickHandler = useCallback (() => {props.changeFilter("completed",props.id)},[props.changeFilter,props.id])

    const buttonStatusClass = (filter:FilterValuesType ) =>  props.filter === filter ? "secondary": "primary" //меняет класс кнопкам в зависимости от фильтрации в аpp.tsx

//обертка для addTask (чтобы не передевать в компоненту AddItemInput ненужынй id)
    const addTask = useCallback( (title:string) => {
        props.addTask(title,props.id)
    },[props.addTask,props.id])
//обертка для renameTodolist
    const renameTodoList = useCallback((newTitle:string) => {
        props.renameTodolist(props.id, newTitle)
    },[props.renameTodolist,props.id])

    return (
        <div  className="App">
            <div>
               <Typography align={"center"} variant={"h6"} style={{fontWeight:"bold"}}>
                   <EditableSpan title={props.title} renameItem={renameTodoList}/>
                   <IconButton size={"small"} onClick={()=>{props.removeTodolist(props.id)}}>
                       <Delete/>
                   </IconButton>
               </Typography>
                <div>
                    <AddItemInput addItem={addTask}/>
                </div>
                <List>
                    {tasksJSX}
                </List>
                <div>
                    <ButtonGroup size={"small"} variant={"contained"}  >
                        <Button onClick={onAllClickHandler} color={buttonStatusClass("all")}>All</Button>
                        <Button onClick={onActiveClickHandler} color={buttonStatusClass("active")}>Active</Button>
                        <Button onClick={onCompletedClickHandler} color={buttonStatusClass("completed")}>Completed</Button>
                    </ButtonGroup>
                </div>
            </div>
        </div>
    )
})

export default ToDoList


