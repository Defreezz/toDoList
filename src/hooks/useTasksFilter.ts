import {useCallback, useMemo} from "react";
import {useDispatch} from "react-redux";
import {DispatchType} from "../redux/store/store";
import {changeFilterTodoList} from "../redux/reducers/todolist-reducer/todolists-reducer";


export const useTasksFilter = (id:string) =>{
    const dispatch = useDispatch<DispatchType>()
    const handleFilterAllClick = useCallback(() => {
        dispatch(changeFilterTodoList({filter:"all", id}))
    }, [dispatch, id])

    const handleFilterActiveClick = useCallback(() => {
        dispatch(changeFilterTodoList({filter:"active", id}))
    }, [dispatch, id])

    const handleFilterCompletedClick = useCallback(() => {
        dispatch(changeFilterTodoList({filter:"completed", id}))
    }, [dispatch, id])

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