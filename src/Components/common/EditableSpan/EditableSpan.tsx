import React, {ChangeEvent, KeyboardEvent, useCallback, useState} from "react";
import {TextField, Typography} from "@mui/material";
import {Variant} from "@mui/material/styles/createTypography";
import {Edit} from "@mui/icons-material";


type EditableSpanType = {
    title: string
    variant: Variant
    renameItem: (title: string) => void
    className?: string
}

export const EditableSpan = React.memo(
    function ({
                  title,
                  variant,
                  className,
                  renameItem,
              }: EditableSpanType) {
        console.log("editable_span")


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
        }, [editMode, input, renameItem])

        const onKeyPressHandler = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "Enter") {
                setEditMode(!editMode)
                renameItem(input)
            }
        }, [editMode, input, renameItem])

        return editMode
            ? <TextField
                size={"small"}
                value={input}
                onChange={onChangeHandler}
                onBlur={onBlurHandler}
                onKeyPress={onKeyPressHandler}
                autoFocus={true}/>
            : <Typography
                onDoubleClick={onDoubleClickHandler}
                width={"100%"}
                align={"left"}
                noWrap
                component={"div"}
                variant={variant}
                className={className}
            >
                <div style={{
                    width:"100%",
                    display:"flex",
                    justifyContent:"space-between"
                }}>
                    <Typography noWrap>
                        {title}
                    </Typography>

                </div>
            </Typography>


    })