import { createAsyncThunk } from "@reduxjs/toolkit"
import { api } from "../../services/api"
import { enqueueSnackbar } from '../reducers/notifications'

export const validateOrganization = createAsyncThunk('organization/validateOrganization', async(organizationName, thunkApi) => {
    try { 
        const response = await api('/organizations/validation', {params: {name: organizationName}})
        console.log('valid org name', response)
        if (response.status === 200) {
            const successValue = {
                status: response.status,
                message: "Le nom de votre organization a été créé.",
                options: {
                    variant: 'success',
                },
            }

            const {status, message} = successValue

            thunkApi.dispatch(enqueueSnackbar(successValue));
            return thunkApi.rejectWithValue({status,message}), organizationName
        }

        return organizationName;
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

        if (error.response.status === 409) {
            errorValue.message = "Cette organisation existe déjà. Merci de choisir un autre nom."
        } else {
            (error); {
                errorValue.message = "Une erreur s'est produite lors de la création de l'organisation."
            }}
        thunkApi.dispatch(enqueueSnackbar(errorValue));
        return thunkApi.rejectWithValue({status,message})
    }
});

export const createOrganization = createAsyncThunk('organization/createOrganization', async( organizationName ,thunkApi)=>{

    try {
        const response = await api.post('/organizations',  {name: organizationName})
        const newOrganization = response.data

        return newOrganization
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

        if (error.response.status === 409) {
            errorValue.message = "Cette organisation existe déjà. Merci de choisir un autre nom."
        } else {
            (error); {
                errorValue.message = "Une erreur s'est produite lors de la création de l'organisation."
            }}
        thunkApi.dispatch(enqueueSnackbar(errorValue));
        return thunkApi.rejectWithValue({status,message})
    }
});

export const fetchOrganization = createAsyncThunk('organization/fetchOrganization', async( organizationId , thunkApi) =>{

    try {
        const { data } = await api(`/organizations/${organizationId}`)
        const organization = data

        return organization
    }
    catch (error) { 
        if (error.response.status === 404) {
            return thunkApi.rejectWithValue({status: 404, message : "l'organisation avec cette id n'a pas été trouvée."});
        }
        return thunkApi.rejectWithValue({ status: error.response.status, message: "Une erreur s'est produite lors de la recupération de l'organisation." });  
    }
})