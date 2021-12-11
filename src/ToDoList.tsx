import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType, TaskType} from "./App";

type TypeOfProps = {
    id:string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskID: string, todolistID: string) => void
    changeFilter: (filter: FilterValuesType, todolistID: string) => void
    addTask: (title:string, todolistID: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean, todolistID:string) => void
    filter: FilterValuesType
}


function ToDoList(props: TypeOfProps) {
    //локальный стейт для инпута
    const [newTaskTittle, setNewTaskTittle] = useState("")

    //стейт для отображения ошибки
    const [error, setError] = useState<string>("")

    //мапится массив тасок
    const tasksJSX = props.tasks.map(t => {
        return (
            <li key={t.id}  >
                <input type="checkbox"
                       checked={t.isDone}
                       onChange={(e)=> props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)}
                />

                <span className={t.isDone ? "completed": ""}>{t.title}</span>
                <button onClick={() => {props.removeTask(t.id, props.id)}}>x</button>
            </li>)
    })

    //обработка событий
    const addTask = () => {
        const trimmedTitle = newTaskTittle.trim()
            if(trimmedTitle) {
                props.addTask(trimmedTitle, props.id)
            }else{
                setError("Обязательное поле")}
        setNewTaskTittle("");
    }

    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setNewTaskTittle(e.currentTarget.value);
        setError("")
    }

    const onKeyPressHandler = (e:KeyboardEvent<HTMLInputElement>) =>{
        if(e.key === "Enter"){addTask()}
    }
    const onAllClickHandler = () => {props.changeFilter("all",props.id)}
    const onActiveClickHandler = () => {props.changeFilter("active",props.id)}
    const onCompletedClickHandler = () => {props.changeFilter("completed",props.id)}
    const buttonStatusClass = (filter:FilterValuesType ) => { return  props.filter === filter ? "activeButton": ""} //меняет класс кнопкам в зависимости от фильтрации в аpp.tsx
    const errorClass = (error !== '' ? "errorInput" : "defaultInput")


    return (
        <div  className="App">
            <div>
                <h3>{props.title}</h3>
                <div>
                    <input className={errorClass} value={newTaskTittle}
                           onChange={onChangeHandler}
                           onKeyPress={onKeyPressHandler}/>

                    <button onClick={addTask}>+</button>
                    <div className={"error"}>{error}</div>
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