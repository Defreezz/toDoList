import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type AddItemInputType = {
    addItem: (title:string) => void
}

export function AddItemInput({addItem}: AddItemInputType) {

    const [newTaskTittle, setNewTaskTittle] = useState("")
    const [error, setError] = useState<string>("")

    const errorClass = (error !== '' ? "errorInput" : "defaultInput")

    const addTask = () => {
        const trimmedTitle = newTaskTittle.trim()
        if (trimmedTitle) {
            addItem(trimmedTitle)
        } else {
            setError("Обязательное поле")
        }
        setNewTaskTittle("");
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTittle(e.currentTarget.value);
        setError("")
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addTask()
        }
    }

    return (
        <div>
            <input
                className={errorClass}
                   value={newTaskTittle}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}/>

            <button onClick={addTask}>+</button>
            <div className={"error"}>{error}</div>
        </div>
    );
};

