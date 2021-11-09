import React from 'react';
import './App.css';
import ToDoList, {tasks_1, tasks_2} from "./ToDoList";


function App() {
    return (
        <div className={"App"}>
            <ToDoList title={"What"} tasks={tasks_1}/>
            <ToDoList title={"Why"} tasks={tasks_2}/>
        </div>
    );
}

export default App;
