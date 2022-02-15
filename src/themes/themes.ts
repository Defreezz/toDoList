import { createTheme } from "@mui/material";

export const lightTheme = createTheme({
    palette: {
        mode: "light",
        primary: {
            main: "#1a72e7",
        },
        secondary: {
            main: "#0b2877",
        },
    },
    components:{
        MuiContainer:{
            defaultProps:{
               maxWidth:false,

            },
        },
        MuiListItem:{
            defaultProps:{
                sx:{
                    justifyContent:"space-between",
                }
            }
        },
    },
});

export const darkTheme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: "#594948",
        },
        secondary: {
            main: "#333335",
        },
    },
    components:{
        MuiContainer:{
            defaultProps:{
                maxWidth:false,
            },
        },
        MuiListItem:{
            defaultProps:{
                sx:{
                    justifyContent:"space-between",
                }
            }
        },
    },
});