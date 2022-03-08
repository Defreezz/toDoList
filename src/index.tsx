import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {Provider} from "react-redux";
import {store} from "./redux/store/store";
import {HashRouter, Navigate, Route, Routes} from 'react-router-dom';
import {Login} from "./Components/Login/Login";
import {PageNotFound} from "./Components/Utils/PageNotFound/PageNotFound";
import App from "./App";

ReactDOM.render(
    <Provider store={store}>
        <HashRouter>
            <Routes>
                <Route path={"/todolist"} element={<App/>}/>
                <Route path={"/"} element={<App/>}/>
                <Route path={"/login"} element={<Login/>}/>
                <Route path={"/404"} element={<PageNotFound/>} />
                <Route path={"/*"} element={<Navigate to={"/404"}/>}/>
            </Routes>
        </HashRouter>
    </Provider>, document.getElementById('root'));


serviceWorker.unregister();
