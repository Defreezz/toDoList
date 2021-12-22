import React from "react";
import {FilterValuesType, TaskType} from "./App";
import {AddItemInput} from "./AddItemInput/AddItemInput";
import {EditableSpan} from "./EditableSpan/EditableSpan";
import {Button, ButtonGroup, Checkbox, IconButton, List, ListItem, Typography} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

type TypeOfProps = {
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


function ToDoList(props: TypeOfProps) {

    //мапится массив тасок
    const tasksJSX = props.tasks.map(t => {

        //обертка для renameTask
        const renameTask = (newTitle:string) => {
            props.renameTask(t.id,props.id,newTitle)
        }

        return (
            <ListItem key={t.id}  >
                <Checkbox
                    size={"small"}
                    checked={t.isDone}
                    onChange={(e)=> props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)}
                />
                <EditableSpan
                    className={t.isDone ? "completed": " "}
                    renameItem={renameTask}
                    title={t.title}/>

                <IconButton size={"small"} onClick={() => {props.removeTask(t.id, props.id)}}><Delete/></IconButton>
            </ListItem>)
    })

    const onAllClickHandler = () => {props.changeFilter("all",props.id)}
    const onActiveClickHandler = () => {props.changeFilter("active",props.id)}
    const onCompletedClickHandler = () => {props.changeFilter("completed",props.id)}

    const buttonStatusClass = (filter:FilterValuesType ) =>  props.filter === filter ? "secondary": "primary" //меняет класс кнопкам в зависимости от фильтрации в аpp.tsx

//обертка для addTask (чтобы не передевать в компоненту AddItemInput ненужынй id)
    const addTask = (title:string) => {
        props.addTask(title,props.id)
    }
//обертка для renameTodolist
    const renameTodoList = (newTitle:string) => {
        props.renameTodolist(props.id, newTitle)
    }

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
}

export default ToDoList


