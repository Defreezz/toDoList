import {createTheme} from "@mui/material";

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
    typography: {
        button: {
            textTransform: "none"
        }
    },
    components: {
        MuiContainer: {
            defaultProps: {
                maxWidth: false,

            },
        },
        MuiPaper: {
            styleOverrides: {
                elevation8: {
                    position: "relative",
                    minHeight: "500px",
                    padding: "18px",
                    width:"350px",
                }
            }
        },
        MuiListItem: {
            defaultProps: {
                sx: {
                    justifyContent: "space-between",
                }
            }
        },
        MuiTypography: {
            defaultProps: {
                display: "flex",
                justifyContent: "space-between",
                fontWeight: "bold",
                variant: "h6",
            }
        },
        MuiButton: {
            defaultProps: {
                sx: {
                    color: "white",
                    '&:hover': {
                        backgroundColor: "rgb(11,40,119)",
                    }
                },

            },
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
    typography: {
        button: {
            textTransform: "none"
        }
    },
    components: {

        MuiContainer: {
            defaultProps: {
                maxWidth: false,
            },
        },
        MuiPaper: {
            styleOverrides: {
                elevation8: {
                    position: "relative",
                    minHeight: "500px",
                    padding: "18px",
                    width:"350px",
                }
            }
        },
        MuiListItem: {
            defaultProps: {
                sx: {
                    justifyContent: "space-between",
                }
            }
        },
        MuiTypography: {
            defaultProps: {
                display: "flex",
                justifyContent: "space-between",
                fontWeight: "bold",
                variant: "h6",
            }
        },
        MuiButton: {
            defaultProps: {
                sx: {
                    color: "white",
                    '&:hover': {
                        backgroundColor: "rgb(62, 51, 50)",
                    }
                },

            },
        },
    }
});