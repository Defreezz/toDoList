import {Dispatch, useCallback, useMemo} from "react";
import {changeFilterTodoListAC} from "../redux/reducers/todolist-reducer/todolist-actions";
import {useDispatch} from "react-redux";
import {AllActionsType, ThunkType} from "../redux/store/store";


export const useTasksFilter = (todolistID:string) =>{
    const dispatch = useDispatch<Dispatch<AllActionsType | ThunkType>>()
    const handleFilterAllClick = useCallback(() => {
        dispatch(changeFilterTodoListAC("all", todolistID))
    }, [dispatch, todolistID])

    const handleFilterActiveClick = useCallback(() => {
        dispatch(changeFilterTodoListAC("active", todolistID))
    }, [dispatch, todolistID])

    const handleFilterCompletedClick = useCallback(() => {
        dispatch(changeFilterTodoListAC("completed", todolistID))
    }, [dispatch, todolistID])

    return useMemo(
        ()=>({
            handleFilterAllClick,
            handleFilterActiveClick,
            handleFilterCompletedClick,
        }),
        [handleFilterAllClick,
            handleFilterActiveClick,
            handleFilterCompletedClick,
        ])
}