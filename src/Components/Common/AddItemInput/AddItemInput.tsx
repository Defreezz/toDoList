import React, {ChangeEvent, KeyboardEvent, useCallback, useState} from 'react';
import {IconButton, TextField} from "@mui/material";
import {AddBox} from "@mui/icons-material";


type AddItemInputType = {
    addItem: (title:string) => void
}

export const AddItemInput = React.memo( function ({addItem}: AddItemInputType) {
    console.log("form")
    const [newTaskTittle, setNewTaskTittle] = useState("")
    const [error, setError] = useState<string>("")

   // const errorClass = (error !== '' ? "errorInput" : "defaultInput")

    const addItemHandler = useCallback (() => {
        const trimmedTitle = newTaskTittle.trim()
        if (trimmedTitle) {
            addItem(trimmedTitle)
        } else {
            setError("Обязательное поле")
        }
        setNewTaskTittle("")
    },[addItem,newTaskTittle])

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTittle(e.currentTarget.value);
        setError("")
    },[])

    const onKeyPressHandler = useCallback( (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addItemHandler()
        }
    },[addItemHandler])

    return (
        <div>
            <TextField
                variant={"outlined"}
                label={"Title"}
                size={"small"}
                error={!!error}
                helperText={error}
                value={newTaskTittle}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}/>

            <IconButton size={"small"} onClick={addItemHandler}><AddBox /></IconButton>
        </div>
    )
})

