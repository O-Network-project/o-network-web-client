import { createAsyncThunk } from '@reduxjs/toolkit'
import { api } from "../../services/api"
import { enqueueSnackbar } from '../reducers/notifications'

export const login = createAsyncThunk("users/login", async (credentials, thunkApi) => {

    try {
        const { data } = await api.post('/users/session', {email: credentials.email, password: credentials.password} )

        const user = data
        return user
    }
    catch (error) {
        console.log(error)

        if (error.response.status === 401)
            return thunkApi.rejectWithValue({
                status: 401,
                message: 'Identifiants invalides'
            })

        if (error.response.status === 403)
            return thunkApi.rejectWithValue({
                status: 403,
                message: "Votre compte est desactivée. Veuillez contacté le gérant de l'organisation."
            })

        return thunkApi.rejectWithValue({ 
            status: 500, 
            message: "Une erreur s'est produite lors de la connexion." 
        });
    }
})

export const logout = createAsyncThunk("users/logout", async ( thunkApi) => {

    try {
        const { data } = await api.delete('/users/session', )

        const user = data
        return user

    }
    catch (error) {
        console.log(error)

        if (error.response.status === 401)
            return thunkApi.rejectWithValue({
                status: 401,
                message: 'Identifiants invalides'
            })

        if (error.response.status === 403)
            return thunkApi.rejectWithValue({
                status: 403,
                message: "Votre compte est desactivée. Veuillez contacté le gérant de l'organisation."
            })

        return thunkApi.rejectWithValue({ 
            status: 500, 
            message: "Une erreur s'est produite lors de la connexion." 
        });
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

        return response
    }
    catch (error) {
        return thunkAPI.rejectWithValue({status: 500, message: "Une erreur s'est produite"});
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
        console.log('error:', error)
        // TODO Choose Option 1 or Option 2 for the error message
        // TODO Option 1 : The message displayed come from the Api and his value is define by the Api
        // TODO Option 2 : The message displayed come from the "if" and his value can be define

        // const errorMessage = error.response.data.message //TODO Option 1-a: Basic Api message
        // const [errorMessage] = error.response.data.errors.profilePicture //TODO Option 1-b: Form field message
        // console.log('error message:', errorMessage) // TODO delete Console.log(Option 1)
        const errorValue = {
            status: error.response.status,
            // message: errorMessage, //TODO Option 1
            message: "", //TODO Option 2
            options: {
                variant: 'error',
            },
        }

        const {status, message} = errorValue 

        //TODO Option 1
        //  Option 1 Start  *******************************************
        // if (error) {
        //     errorValue.message = errorMessage
        // }
        //  Option 1 End  *******************************************

        //TODO Option 2
        //  Option 2 Start  *******************************************
        if (error.response.status === 413) {
            errorValue.message = error.response.statusText // TODO change
        }
        if (error.response.status === 422) {
            errorValue.message = "Le format de l'image est incorrect"
        }
        if (error.response.status === 500) {
            errorValue.message = "Une erreur s'est produite"
        }
        //  Option 2 End  *******************************************

        thunkAPI.dispatch(enqueueSnackbar(errorValue));
        return thunkAPI.rejectWithValue({status,message})
    }
})
