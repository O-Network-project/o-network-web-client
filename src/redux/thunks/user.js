import { createAsyncThunk } from '@reduxjs/toolkit'
import { api, fetchCsrfCookie } from "../../services/api"
import { enqueueSnackbar } from '../reducers/notifications'

export const login = createAsyncThunk("users/login", async (credentials, thunkApi) => {

    try {
        await fetchCsrfCookie()
        const { data } = await api.post('/session', {email: credentials.email, password: credentials.password} )

        const user = data
        return user
    }
    catch (error) {
        const errorValue = {
            status: error.response.status,
            message: "",
            options: {
                variant: 'error',
            },
        }

        if (error.response.status === 401) {
            errorValue.message = 'Identifiants invalides'
        }

        if (error.response.status === 403) {
            errorValue.message = "Votre compte est désactivé. Veuillez contacter le gérant de l'organisation."
        }

        if (error.response.status === 500) {
            errorValue.message = "Une erreur s'est produite lors de la connexion." 
        }

        thunkApi.dispatch(enqueueSnackbar(errorValue));
        return thunkApi.rejectWithValue(errorValue)
    }
})

export const logout = createAsyncThunk("users/logout", async (_, thunkApi) => {

    try {
        await fetchCsrfCookie()
        const response = await api.delete('/session')

        const user = response.data

        const successValue = {
            status: response.status,
            message: "Votre Profil a bien été déconnécté.",
            options: {
                variant: 'success',
            }
        }
        thunkApi.dispatch(enqueueSnackbar(successValue));

        return user

    }
    catch (error) {
        const errorValue = {
            status: error.response.status,
            message: "",
            options: {
                variant: 'error',
            },
        }

        if (error.response.data.errors) {
            const getError = error.response.data.errors

            Object.keys(getError).forEach(key => {
                const errorMessages = getError[key];
                if (errorMessages) {
                    errorMessages.forEach(errorMessage => {
                        errorValue.message = errorMessage
                    })
                }
            })
        }
        
        thunkApi.dispatch(enqueueSnackbar(errorValue));
        return thunkApi.rejectWithValue(errorValue)
    }
})

export const addUser = createAsyncThunk("user/addUser", async (data, thunkAPI) => {
    try {
        await fetchCsrfCookie()

        const formData = new FormData()
        for (let [key,value] of Object.entries(data)) {
            if (key === 'profilePicture' && !value) continue
            formData.append(key, value)
        }

        const response = await api.post('/users',formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })

        const successValue = {
            status: response.status,
            message: "Votre Profil a bien été créé.",
            options: {
                variant: 'success',
            },
        }

        thunkAPI.dispatch(enqueueSnackbar(successValue));
        return response.data
    }
    catch (error) {

        const errorValue = {
            status: error.response.status,
            message: "",
            options: {
                variant: 'error',
            },
        }

        if (error.response.data.errors) {
            const getError = error.response.data.errors

            Object.keys(getError).forEach(key => {
                const errorMessages = getError[key];
                if (errorMessages) {
                    errorMessages.forEach(errorMessage => {
                        errorValue.message = errorMessage
                    })
                }
            })
        }
        
        thunkAPI.dispatch(enqueueSnackbar(errorValue));
        return thunkAPI.rejectWithValue(errorValue)
    }
})

export const updateUser = createAsyncThunk("user/updateUser", async (data, thunkAPI) => {
    try {
        await fetchCsrfCookie()

        const id = thunkAPI.getState().user.id;
        const formData = new FormData()
        for (let [key,value] of Object.entries(data)) {
            if (key === 'currentPassword' && !value) continue
            if (key === 'newPassword' && !value) continue
            if (key === 'profilePicture' && value === undefined) continue
            formData.append(key, value)
        }

        const response = await api.post(`/users/${id}`,formData, {
            params: {
                _method: 'PATCH'
            },
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })
        const successValue = {
            status: response.status,
            message: "Votre Profil a bien été actualisé.",
            options: {
                variant: 'success',
            },
        }

        thunkAPI.dispatch(enqueueSnackbar(successValue));
        return response.data
    }
    catch (error) {
        // console.log(error) //TODO Remove
        const errorValue = {
            status: error.response.status,
            message: "",
            options: {
                variant: 'error',
            },
        }

        //TODO Fix 413
        if (error.response.status === 413) {
            errorValue.message = error.response.statusText
        }

        if (error.response.data.errors) {
            const getError = error.response.data.errors

            Object.keys(getError).forEach(key => {
                const errorMessages = getError[key];
                if (errorMessages) {
                    errorMessages.forEach(errorMessage => {
                        errorValue.message = errorMessage
                    })
                }
            })
        }

        // if (error.response.status === 500) {
        //     errorValue.message = "Une erreur s'est produite"
        // }

        thunkAPI.dispatch(enqueueSnackbar(errorValue));
        return thunkAPI.rejectWithValue(errorValue)
    }
})
