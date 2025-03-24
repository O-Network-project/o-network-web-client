import { createTheme } from '@mui/material/styles'

export const muiONetworkTheme = createTheme({
    components: {
        MuiButton: {
            styleOverrides: {
                contained: {
                    backgroundColor: '#00b894',
                    '&:hover': {
                        backgroundColor: '#00ebbd'
                    }
                },
                outlined: {
                    borderColor: '#3b3f45',
                    color: '#3b3f45',
                    '&:hover': {
                        backgroundColor: '#3b3f45',
                        borderColor: '#3b3f45',
                        color: '#f6f8fc'
                    }
                }
            }
        },
        MuiLink: {
            styleOverrides: {
                root: {
                    color: '#3b3f45',
                    textDecoration: 'none',
                    '&:hover': {
                        color: '#00b894',
                        textDecoration: 'none'
                    }
                }
            }
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    '&.Mui-focused': {
                        color: '#00b894'
                    }
                }
            }
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#00b894'
                    }
                }
            }
        },
        MuiListItemIcon: {
            styleOverrides: {
                root: {
                    color: '#00b894'
                }
            }
        },
        MuiCircularProgress: {
            styleOverrides: {
                root: {
                    color: '#00b894'
                }
            }
        }
    }
})
