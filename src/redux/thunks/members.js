import { createAsyncThunk } from '@reduxjs/toolkit'
import { api, fetchCsrfCookie } from "../../services/api"
import { enqueueSnackbar } from '../reducers/notifications'

export const fetchMembers = createAsyncThunk("members/fetchMembers", async (organizationId, thunkApi) => {
    try {
        
        // const { data : members} = await api(`/organizations/${organizationId}/users`)

        const response = await api(`/organizations/${organizationId}/users`)
        const { data : members} = response

        // TODO Remove Noticication test
        console.log("fetchMembers response", response)
        // ##############################################
        const successValue = {
            status: response.status,
            message: "Noticication test fetch Members",
            // message: response.statusText,
            options: {
                variant: 'warning',
            }
        }
        thunkApi.dispatch(enqueueSnackbar(successValue));
        // ##############################################
        return members
    }
    catch (error) {
        // if (error.response.status === 404) {
        //     return thunkApi.rejectWithValue({status: 404, message : "Il n'y a aucun membre dans cette organisation"});
        // }
        // return thunkApi.rejectWithValue({status: 500, message: "Une erreur s'est produite"});

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

        // if (error.response.status === 500) {
        //     errorValue.message = "Une erreur s'est produite"
        // }

        thunkApi.dispatch(enqueueSnackbar(errorValue));
        return thunkApi.rejectWithValue(errorValue)
    }
})

export const updateMemberStatus = createAsyncThunk("user/updateMemberStatus", async ({ id, disabled }, thunkAPI) => {
    try {
        await fetchCsrfCookie()

        const response = await api.patch(`/users/${id}`,{disabled: disabled}, )
        const updatedMember = response.data

        // TODO Remove Noticication test
        console.log("updateMemberStatus response", response)
        // ##############################################
        const successValue = {
            status: response.status,
            message: "Noticication test update Member Status",
            // message: response.statusText,
            options: {
                variant: 'warning',
            }
        }
        thunkAPI.dispatch(enqueueSnackbar(successValue));
        // ##############################################
        return updatedMember;
    }
    catch(error) {
        // if (error.response.status === 404){
        //     return thunkAPI.rejectWithValue({status: 404, message: "Ce membre n'existe pas"})
        // }
        // return thunkAPI.rejectWithValue({status: 500, message: "Une erreur s'est produite"});

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

        // if (error.response.status === 500) {
        //     errorValue.message = "Une erreur s'est produite"
        // }

        thunkAPI.dispatch(enqueueSnackbar(errorValue));
        return thunkAPI.rejectWithValue(errorValue)
    }
})
