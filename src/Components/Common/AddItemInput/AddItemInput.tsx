import React, {ChangeEvent, KeyboardEvent, useCallback, useState} from 'react';
import {IconButton, TextField} from "@mui/material";
import {AddBox} from "@mui/icons-material";
import {RequestStatusType} from "../../../redux/reducers/ui-reducer/ui-reducer";


type AddItemInputType = {
    addItem: (title: string) => void
    entityStatus?: RequestStatusType
    placeHolder:string
}

export const AddItemInput = React.memo(function ({addItem, entityStatus,placeHolder}: AddItemInputType) {
    console.log("form")
    const [newTaskTittle, setNewTaskTittle] = useState("")
    const [error, setError] = useState<string>("")

    const addItemHandler = useCallback(() => {
        const trimmedTitle = newTaskTittle.trim()
        if (trimmedTitle) {
            addItem(trimmedTitle)
        } else {
            setError("Обязательное поле")
        }
        setNewTaskTittle("")
    }, [addItem, newTaskTittle])

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTittle(e.currentTarget.value);
        setError("")
    }, [])

    const onKeyPressHandler = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addItemHandler()
        }
    }, [addItemHandler])

    return (
        <div>
            <TextField
                disabled={entityStatus === "loading"}
                variant={"outlined"}
                label={placeHolder}
                size={"small"}
                error={!!error}
                helperText={error}
                value={newTaskTittle}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}/>

            <IconButton
                disabled={entityStatus === "loading"}
                size={"small"}
                onClick={addItemHandler}
            >
                <AddBox/>
            </IconButton>
        </div>
    )
})

