import {useDispatch} from "react-redux";
import {DispatchType} from "../redux/store/store";
import {useCallback, useMemo} from "react";
import {CreateTodolist, removeTodolist, renameTodolist} from "../redux/reducers/todolist-reducer/todolists-reducer";

export const useTodolistCRUD = () => {
    const dispatch = useDispatch<DispatchType>()

    const handleTodolistAdd = useCallback(function (title: string) {
        dispatch(CreateTodolist(title))
    }, [dispatch])

    const handleTodolistRemove = useCallback((todolistID: string) => {
        dispatch(removeTodolist(todolistID))
    }, [dispatch])

    const handleTodolistRename = useCallback((todolistID: string, newTitle: string) => {
        dispatch(renameTodolist(todolistID, newTitle))
    }, [dispatch])

    return useMemo(
        () => ({
            handleTodolistAdd,
            handleTodolistRemove,
            handleTodolistRename,
        }),
        [
            handleTodolistAdd,
            handleTodolistRemove,
            handleTodolistRename,
        ])
}