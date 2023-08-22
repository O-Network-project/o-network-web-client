import { createAsyncThunk } from '@reduxjs/toolkit'
import { api } from "../../services/api"
import { enqueueSnackbar } from '../reducers/notifications'

export const login = createAsyncThunk("users/login", async (credentials, thunkApi) => {

    try {
        // const { data } = await api.post('/users/session', {email: credentials.email, password: credentials.password} )
        const response = await api.post('/users/session', {email: credentials.email, password: credentials.password} )
        console.log("login", response)
        const user = response.data
        return user
    }
    catch (error) {
        console.log(error)

        const errorValue = {
            status: error.response.status,
            message: "",
            options: {
                variant: 'error',
            },
        }

        const {status, message} = errorValue

        if (error.response.status === 401) {
            errorValue.message = "Identifiants invalides."
        }

        if (error.response.status === 500) {
            errorValue.message = "Une erreur s'est produite lors de la connexion."
        }

        if (error.response.status === 403) {
            errorValue.message = "Votre compte est desactivée. Veuillez contacté le gérant de l'organisation."
        }

        thunkApi.dispatch(enqueueSnackbar(errorValue));
        return thunkApi.rejectWithValue({status,message})
    }
})

export const logout = createAsyncThunk("users/logout", async ( thunkApi) => {

    try {
        // const { data } = await api.delete('/users/session')
        const response = await api.delete('/users/session')
        console.log('logout', response)
        const user = response.data

        if (response.status === 201) {
            const successValue = {
                status: response.status,
                message: "Votre Profil a bien été déconnécté.",
                options: {
                    variant: 'success',
                },
            }

            const {status, message} = successValue

            thunkApi.dispatch(enqueueSnackbar(successValue));
            return thunkApi.rejectWithValue({status,message}), user
        }

        return user

    }
    catch (error) {
        console.log(error)

        const errorValue = {
            status: error.response.status,
            message: "",
            options: {
                variant: 'error',
            },
        }

        const {status, message} = errorValue

        if (error.response.status === 401) {
            errorValue.message = "Identifiants invalides."
        }

        if (error.response.status === 500) {
            errorValue.message = "Une erreur s'est produite lors de la connexion."
        }

        if (error.response.status === 403) {
            errorValue.message = "Votre compte est desactivée. Veuillez contacté le gérant de l'organisation."
        }

        thunkApi.dispatch(enqueueSnackbar(errorValue));
        return thunkApi.rejectWithValue({status,message})
    }
})

export const addUser = createAsyncThunk("user/addUser", async (data, thunkAPI) => {
    try {
        const organizationId = thunkAPI.getState().organization.id;

        const formData = new FormData()
        for (let [key,value] of Object.entries(data)) {
            if (key === 'profilePicture' && !value) continue
            formData.append(key, value)
        }
        formData.append('organizationId', organizationId)

        const response = await api.post('/users',formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })

        if (response.status === 201) {
            const successValue = {
                status: response.status,
                message: "Votre Profil a bien été créé.",
                options: {
                    variant: 'success',
                },
            }

            const {status, message} = successValue

            thunkAPI.dispatch(enqueueSnackbar(successValue));
            return thunkAPI.rejectWithValue({status,message}), response
        }
        return response
    }
    catch (error) {

        const errorValue = {
            status: error.response.status,
            message: "",
            options: {
                variant: 'error',
            },
        }

        const {status, message} = errorValue 

        if (error.response.status === 500) {
            errorValue.message = "Une erreur s'est produite."
        } else {
            (error); {
                errorValue.message = "Une erreur s'est produite."
            }}
        thunkAPI.dispatch(enqueueSnackbar(errorValue));
        return thunkAPI.rejectWithValue({status,message})
    }
})

export const updateUser = createAsyncThunk("user/updateUser", async (data, thunkAPI) => {
    try {
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

        if (response.status === 200) {
            const successValue = {
                status: response.status,
                message: "Votre Profil a bien été actualisé.",
                options: {
                    variant: 'success',
                },
            }

            const {status, message} = successValue

            thunkAPI.dispatch(enqueueSnackbar(successValue));
            return thunkAPI.rejectWithValue({status,message}), response.data
        }

        return response.data
    }
    catch (error) {
        console.log(error)

        const errorMessage = error.message
        const [errorMessageField] = error.response.data.errors.profilePicture

        const errorValue = {
            status: error.response.status,
            message: "",
            options: {
                variant: 'error',
            },
        }

        const {status, message} = errorValue 

        if (error.response.status === 413) {
            errorValue.message = errorMessage
        }
        if (error.response.status === 422) {
            errorValue.message = errorMessageField
        }
        if (error.response.status === 500) {
            errorValue.message = "Une erreur s'est produite"
        }

        thunkAPI.dispatch(enqueueSnackbar(errorValue));

        return thunkAPI.rejectWithValue({status,message})
    }
})
