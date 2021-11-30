import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType, TaskType} from "./App";

type TypeOfProps = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskID: string) => void
    changeFilter: (filter: FilterValuesType) => void
    addTask: (title:string) => void
    filter: FilterValuesType
}


function ToDoList(props: TypeOfProps) {

    const tasksJSX = props.tasks.map(t => {
        return (
            <li key={t.id}  >
                <input type="checkbox" checked={t.isDone} />
                <span className={t.isDone ? "completed": ""}>{t.title}</span>
                <button onClick={() => {props.removeTask(t.id)}}>x</button>
            </li>)
    })

    //обработка событий
    const addTask = () => {
        const trimmedTitle = newTaskTittle.trim()
            if(trimmedTitle) {props.addTask(trimmedTitle)}
        setNewTaskTittle(""); }

    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {setNewTaskTittle(e.currentTarget.value)}
    const onKeyPressHandler = (e:KeyboardEvent<HTMLInputElement>) =>{
        if(e.key === "Enter"){addTask()}
    }
    const onAllClickHandler = () => {props.changeFilter("all")}
    const onActiveClickHandler = () => {props.changeFilter("active")}
    const onCompletedClickHandler = () => {props.changeFilter("completed")}
    const buttonStatus = (filter:FilterValuesType ) => { return  props.filter === filter ? "activeButton": ""} //меняет класс кнопкам в зависимости от фильтрации в аpp.tsx

    //локальный стейт для инпута
    const [newTaskTittle, setNewTaskTittle] = useState("")

    return (
        <div className="App">
            <div>
                <h3>{props.title}</h3>
                <div>
                    <input value={newTaskTittle}
                           onChange={onChangeHandler}
                           onKeyPress={onKeyPressHandler}/>
                    <button onClick={addTask}>+</button>
                </div>
                <ul>
                    {tasksJSX}
                </ul>
                <div>
                    <button onClick={onAllClickHandler} className={buttonStatus("all")}>All</button>
                    <button onClick={onActiveClickHandler} className={buttonStatus("active")}>Active</button>
                    <button onClick={onCompletedClickHandler} className={buttonStatus("completed")}>Completed</button>
                </div>
            </div>
        </div>
    )
}

export default ToDoList