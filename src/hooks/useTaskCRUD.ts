import {useDispatch} from "react-redux";
import {useCallback, useMemo} from "react";
import {DispatchType} from "../redux/store/store";
import {addTask, removeTask, updateTask} from "../redux/reducers/task-reducer/tasks-reducer";
import {TaskStatuses} from "../api";


export const useTaskCRUD = () =>{
    const dispatch = useDispatch<DispatchType>()

    const handleTaskRemove = useCallback((todolistID: string, taskID: string) => {
        dispatch(removeTask(todolistID, taskID))
    }, [dispatch])

    const handleTaskAdd = useCallback((title: string,todolistID?:string) => {
        dispatch(addTask(todolistID!, title))
    }, [dispatch])

    const handleTaskRename = useCallback((taskID: string, todolistID: string, title: string) => {
        dispatch(updateTask(
            {todolistID, taskID,changes:{title}}
        ))
    }, [dispatch])

    const handleTaskStatusChange = useCallback((todolistID: string, taskID: string, status: TaskStatuses) => {
        dispatch(updateTask({todolistID,taskID,changes: {status}}))
    }, [dispatch])

return useMemo(
    ()=>({
        handleTaskRemove,
        handleTaskAdd,
        handleTaskRename,
        handleTaskStatusChange,
    }),
    [
        handleTaskRemove,
        handleTaskAdd,
        handleTaskRename,
        handleTaskStatusChange,
    ])
}


