import React, {Dispatch, useCallback, useEffect, useLayoutEffect} from 'react';
import './App.css';
import {useDispatch, useSelector} from "react-redux";
import {AllActionsType, GlobalStateType, ThunkType} from "./redux/store/store";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import {darkTheme, lightTheme} from "./themes/themes";
import {Main} from "./Components/Main/Main";
import {Login} from "./Components/Login/Login";
import {toggleTheme} from "./redux/reducers/theme-reducer/theme-reducer";
import {initializeApp} from "./redux/reducers/auth-reducer/auth-reducer";
import {CircularProgressWithLabel} from "./Components/Common/CircularProgress/CircularProgress";


const App = React.memo(function () {
    console.log("app")

    const dispatch = useDispatch<Dispatch<AllActionsType | ThunkType>>()
    const theme = useSelector((state: GlobalStateType) => state.theme.darkTheme)

    const isLoggedIn = useSelector((state: GlobalStateType) => state.auth.isLoggedIn)
    const initializeStatus = useSelector((state: GlobalStateType) => state.ui.initializeStatus)
    const progress = useSelector((state: GlobalStateType) => state.ui.progress)

    const setLocalStorageThemeHandler = useCallback((theme: boolean) => {
        localStorage.setItem("darkTheme", JSON.stringify(theme))
    }, [])
    const getLocalStorageThemeHandler = useCallback(() => {
        let localTheme = localStorage.getItem("darkTheme")
        localTheme === null
            ? dispatch(toggleTheme(false))
            : dispatch(toggleTheme(localTheme && JSON.parse(localTheme)))
    }, [dispatch])


    useLayoutEffect(() => {
        getLocalStorageThemeHandler()
    }, [getLocalStorageThemeHandler])
    useEffect(() => {
        setLocalStorageThemeHandler(theme)
    }, [setLocalStorageThemeHandler, theme])
    useLayoutEffect(() => {
        dispatch(initializeApp())
    }, [dispatch])

    if (!initializeStatus) {
        return (
            <ThemeProvider theme={theme ? darkTheme : lightTheme}>
                <CircularProgressWithLabel value={progress}/> )
            </ThemeProvider> )
    }

    return (
        <ThemeProvider theme={theme ? darkTheme : lightTheme}>
            <>
                {initializeStatus && isLoggedIn
                    ? <Main/>
                    : <Login/>}
            </>
        </ThemeProvider>
    )
})

export default App;
