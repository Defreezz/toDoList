import React from "react";
import {FilterValuesType, TaskType} from "./App";
import {AddItemInput} from "./AddItemInput/AddItemInput";
import {EditableSpan} from "./EditableSpan/EditableSpan";

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
            <li key={t.id}  >
                <input type="checkbox"
                       checked={t.isDone}
                       onChange={(e)=> props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)}
                />
                <EditableSpan
                    className={t.isDone ? "completed": " "}
                    renameItem={renameTask}
                    title={t.title}/>

                <button onClick={() => {props.removeTask(t.id, props.id)}}>x</button>
            </li>)
    })

    const onAllClickHandler = () => {props.changeFilter("all",props.id)}
    const onActiveClickHandler = () => {props.changeFilter("active",props.id)}
    const onCompletedClickHandler = () => {props.changeFilter("completed",props.id)}

    const buttonStatusClass = (filter:FilterValuesType ) => { return  props.filter === filter ? "activeButton": ""} //меняет класс кнопкам в зависимости от фильтрации в аpp.tsx

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
               <h3><EditableSpan title={props.title} renameItem={renameTodoList}/>
                    <button onClick={()=>{props.removeTodolist(props.id)}}>x</button></h3>
                <div>
                    <AddItemInput addItem={addTask}/>
                </div>
                <ul>
                    {tasksJSX}
                </ul>
                <div>
                    <button onClick={onAllClickHandler} className={buttonStatusClass("all")}>All</button>
                    <button onClick={onActiveClickHandler} className={buttonStatusClass("active")}>Active</button>
                    <button onClick={onCompletedClickHandler} className={buttonStatusClass("completed")}>Completed</button>
                </div>
            </div>
        </div>
    )
}

export default ToDoList


