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
                    width: "300px",
                    '&:hover': {
                        cursor: "grab",
                    }
                },
                elevation1: {
                    margin: "0 0 5px 0",
                    backgroundColor: "#c2d7f3"
                }
            },

        },
        MuiList: {
            defaultProps: {
                sx: {
                    cursor: "default"
                }
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
        MuiTypography: {
            styleOverrides: {
                h6: {
                    cursor: "default"
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
                    width: "300px",
                    '&:hover': {
                        cursor: "grab",
                    }
                },
                elevation1: {
                    margin: "0 0 5px 0",
                }
            }
        },
        MuiList: {
            defaultProps: {
                sx: {
                    cursor: "default"
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
        MuiTypography: {
            styleOverrides: {
                h6: {
                    cursor: "default"
                }
            }
        },
    }
});