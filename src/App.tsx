import React, {Dispatch, useCallback, useEffect, useLayoutEffect} from 'react';
import './App.css';
import {useDispatch, useSelector} from "react-redux";
import {AllActionsType, GlobalStateType, ThunkType} from "./redux/store/store";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import {darkTheme, lightTheme} from "./themes/themes";
import {Main} from "./Components/main/Main";
import {Login} from "./Components/login/Login";
import {toggleTheme} from "./redux/reducers/theme-reducer/theme-reducer";
import {initializeApp} from "./redux/reducers/auth-reducer/auth-reducer";
import {CircularProgressWithLabel} from "./Components/common/CircularProgress/CircularProgress";


const App = React.memo(function () {

    const dispatch = useDispatch<Dispatch<AllActionsType | ThunkType>>()

    const isDarkTheme = useSelector((state: GlobalStateType) => state.theme.isDarkTheme)
    const isLoggedIn = useSelector((state: GlobalStateType) => state.auth.isLoggedIn)
    const initializeStatus = useSelector((state: GlobalStateType) => state.ui.initializeStatus)
    const progress = useSelector((state: GlobalStateType) => state.ui.progress)

    const setLocalStorageThemeHandler = useCallback((isDarkTheme: boolean) => {
        localStorage.setItem("isDarkTheme", JSON.stringify(isDarkTheme))
    }, [])

    const getLocalStorageThemeHandler = useCallback(() => {
        let localTheme = localStorage.getItem("isDarkTheme")
        localTheme === null
            ? dispatch(toggleTheme(true))
            : dispatch(toggleTheme(localTheme && JSON.parse(localTheme)))
    }, [dispatch])


    useLayoutEffect(() => {
        getLocalStorageThemeHandler()
    }, [getLocalStorageThemeHandler])
    useEffect(() => {
        setLocalStorageThemeHandler(isDarkTheme)
    }, [setLocalStorageThemeHandler, isDarkTheme])
    useLayoutEffect(() => {
        dispatch(initializeApp())
    }, [dispatch])

    if (!initializeStatus) {
        return (
            <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
                <CircularProgressWithLabel value={progress}/> )
            </ThemeProvider>)
    } else {
        return (
            <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
                    {isLoggedIn
                        ? <Main/>
                        : <Login/>}
            </ThemeProvider>
        )
    }
})

export default App;
