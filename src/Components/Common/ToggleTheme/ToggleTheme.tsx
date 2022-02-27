import IconButton from "@mui/material/IconButton";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import React from "react";

type ToggleThemeType = {
    onClickHandler: () => void
    theme: boolean
}

export const ToggleTheme: React.FC<ToggleThemeType> = ({onClickHandler,theme}) => {


    return (
        <IconButton
            onClick={onClickHandler}
            color="inherit"
        >
            {theme ? (
                <Brightness7Icon/>
            ) : (
                <Brightness4Icon/>
            )}
        </IconButton>
    )
}