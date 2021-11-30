import React, {useState} from 'react';
import './App.css';
import ToDoList from "./ToDoList";
import {v1} from "uuid";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValuesType = "all" | "active" | "completed"

function App() {

    //BLL
    const tdlTitle = "What to learn"

    //инициализация state
    //useState возвращает массив и функцию (которая сравнивает измененный массив с исходным массивом)
    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: "HTML", isDone: false},
        {id: v1(), title: "Css", isDone: false},
        {id: v1(), title: "Redux", isDone: true}
    ])
    //Удаление таски
    const removeTask = (taskID: string) => setTasks(tasks.filter(t => t.id !== taskID))
    // const tasks = result[0] // возврат массива из useState
    // const setTasks = result[1] // передаем в функцию массив, который сравнивается с исходным массивом в useState

    //Фильрация такски
    const [filter, setFilter] = useState<FilterValuesType>("all")
    const changeFilter = (filter: FilterValuesType) => {
        setFilter(filter)
    }

    let tasksForRender = tasks
    if (filter === "active") {
        tasksForRender = tasks.filter(t => t.isDone === false)
    }
    if (filter === "completed") {
        tasksForRender = tasks.filter(t => t.isDone === true)
    }

    //Добавление таски
    function addTask(title:string) {
        let inputTask = {id: v1(), title: title, isDone: false}
        let newTask = [inputTask, ...tasks]
        setTasks(newTask)
    }

    //UI
    return (
        <div className={"App"}>
            <ToDoList
                title={tdlTitle}
                tasks={tasksForRender}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                filter={filter}
            />

        </div>
    );
}

export default App;
