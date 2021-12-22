import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

type AddItemInputType = {
    addItem: (title:string) => void
}

export function AddItemInput({addItem}: AddItemInputType) {

    const [newTaskTittle, setNewTaskTittle] = useState("")
    const [error, setError] = useState<string>("")

   // const errorClass = (error !== '' ? "errorInput" : "defaultInput")

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
            <TextField
                variant={"outlined"}
                label={"Title"}
                size={"small"}
                //className={errorClass}
                error={!!error}
                helperText={error}
                value={newTaskTittle}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}/>

            <IconButton size={"small"} onClick={addTask}><AddBox /></IconButton>
            {/*<div className={"error"}>{error}</div>*/}
        </div>
    );
};

