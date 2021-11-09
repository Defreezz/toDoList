import React from "react";

type TypeOfProps = {
    title: string
    tasks: Array<TypeOfTask>
}
type TypeOfTask = {
    id: number
    title: string
    isDone: boolean
}

export const tasks_1: Array<TypeOfTask> = [
    {id: 1, title: "HTML", isDone: false},
    {id: 2, title: "Css", isDone: false},
    {id: 3, title: "Redux", isDone: true}
]
export const tasks_2: Array<TypeOfTask> = [
    {id: 4, title: "bmw", isDone: false},
    {id: 5, title: "vag", isDone: false},
    {id: 6, title: "opel", isDone: true}
]

function ToDoList(props: TypeOfProps) {
    return (
        <div className="App">
            <div>
                <h3>{props.title}</h3>
                <div>
                    <input/>
                    <button>+</button>
                </div>
                <ul>
                    <li><input type="checkbox" checked={props.tasks[0].isDone}/> <span>{props.tasks[0].title}</span>
                    </li>
                    <li><input type="checkbox" checked={props.tasks[1].isDone}/> <span>{props.tasks[1].title}</span>
                    </li>
                    <li><input type="checkbox" checked={props.tasks[2].isDone}/> <span>{props.tasks[2].title}</span>
                    </li>
                </ul>
                <div>
                    <button>All</button>
                    <button>Active</button>
                    <button>Completed</button>
                </div>
            </div>
        </div>
    )
}

export default ToDoList