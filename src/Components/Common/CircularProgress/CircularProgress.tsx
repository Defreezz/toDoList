import React from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress, {CircularProgressProps} from '@mui/material/CircularProgress';
import {useSelector} from "react-redux";
import {GlobalStateType} from "../../../redux/store/store";

export function CircularProgressWithLabel(props: CircularProgressProps & { value: number }) {
    const theme = useSelector((state: GlobalStateType) => state.theme.darkTheme)
    return (
        <Box style={{minHeight: "100vh", backgroundColor: theme ? "#484e50" : "rgba(96,151,225,0.37)"}}
            sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <CircularProgress variant="determinate" {...props} />
            <Box sx={{
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                position: 'absolute',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <Typography variant="caption" component="div" color="text.secondary">
                    {`${Math.round(props.value)}%`}
                </Typography>
            </Box>
        </Box>
    );
}