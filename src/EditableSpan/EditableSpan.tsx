import React, {useState} from "react";
import {TextField} from "@material-ui/core";

type EditableSpanType = {
    title: string
    renameItem: (title:string) => void
    className?:string
}

export function EditableSpan({title, className, renameItem}: EditableSpanType) {
    const [editMode,setEditMode] = useState(false)
    const [input, setInput] = useState(" ") // записываем пустую, но сетаем тайтл реальный в колбэке

    return editMode
        ? <TextField
            value={input}
            onChange={(e)=> setInput(e.currentTarget.value)}
            onBlur={()=>  {
                setEditMode(!editMode);
                renameItem(input)}}
            autoFocus={true}/>
        : <span className={className} onDoubleClick={() => {setEditMode(!editMode); setInput(title)}}>
            {title}
        </span>

}