import React, {ChangeEvent, KeyboardEvent, useCallback, useState} from 'react';
import {IconButton, TextField} from "@mui/material";
import {RequestStatusType} from "../../../redux/reducers/ui-reducer/ui-reducer";
import {AddBoxOutlined} from "@mui/icons-material";


type AddItemInputType = {
    id?:string
    addItem: (title: string,id?:string) => void
    entityStatus?: RequestStatusType
    placeHolder:string
}

export const AddItemInput = React.memo(function ({id,addItem, entityStatus,placeHolder}: AddItemInputType) {
    console.log("form")
    const [newTaskTittle, setNewTaskTittle] = useState("")
    const [error, setError] = useState<string>("")

    const addItemHandler = useCallback(() => {
        const trimmedTitle = newTaskTittle.trim()
        if (trimmedTitle) {
            addItem(trimmedTitle,id)
        } else {
            setError("Обязательное поле")
        }
        setNewTaskTittle("")
    }, [addItem, newTaskTittle,id])

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
        <div style={{display: "flex",justifyContent: "space-between",alignItems:"center"}}>
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
                <AddBoxOutlined/>
            </IconButton>
        </div>
    )
})

