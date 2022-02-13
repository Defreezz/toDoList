import React, {ChangeEvent, KeyboardEvent, useCallback, useState} from "react";
import {TextField} from "@material-ui/core";

type EditableSpanType = {
    title: string
    renameItem: (title: string) => void
    className?: string
}

export const EditableSpan = React.memo(
    function ({
                  title,
                  className,
                  renameItem,
              }: EditableSpanType) {
        console.log("span span")
        const [editMode, setEditMode] = useState(false)
        const [input, setInput] = useState(" ") // записываем пустую, но сетаем тайтл реальный в колбэке

        const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) =>
            setInput(e.currentTarget.value), [setInput])
        const onDoubleClickHandler = useCallback(() => {
            setEditMode(!editMode);
            setInput(title)
        }, [editMode, title])
        const onBlurHandler = useCallback(() => {
            setEditMode(!editMode)
            renameItem(input)
        }, [editMode,input,renameItem])
        const onKeyPressHandler = useCallback( (e: KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "Enter") {
                setEditMode(!editMode)
                renameItem(input)
            }
        },[editMode,input,renameItem])

        return editMode
            ? <TextField
                value={input}
                onChange={onChangeHandler}
                onBlur={onBlurHandler}
                onKeyPress={onKeyPressHandler}
                autoFocus={true}/>
            : <span className={className} onDoubleClick={onDoubleClickHandler}>
            {title}
              </span>

    })